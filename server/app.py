from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
# from flask_bootstrap import Bootstrap5
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import declarative_base
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import datetime
# JWT
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt
from flask_jwt_extended import unset_jwt_cookies

from flask_cors import CORS



load_dotenv()
app = Flask(__name__)

# CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_TOKEN_HEX", os.urandom(10))
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI", "sqlite:///web.sqlite")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(minutes=1)


Base = declarative_base()

db = SQLAlchemy(app)

jwt = JWTManager(app)


class Users(db.Model, UserMixin, Base):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.Text, nullable=False)
    f_name = db.Column(db.String(20), nullable=False)
    l_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    jobs = db.relationship("Jobs", backref="hiring_manager")
    applied_jobs = db.relationship("AppliedJobs", backref="employee")
class Jobs(db.Model, Base):
    __tablename__ = "jobs"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.Text, nullable=False)
    category = db.Column(db.Text, nullable=False)
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id"))
    applied = db.relationship("AppliedJobs", backref="applied")

class AppliedJobs(db.Model, Base):
    __tablename__ = "applied_jobs"
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey("jobs.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))


with app.app_context():
    db.create_all()

@app.after_request
def refresh_expiring_jwts(response):
    # This route is meant to refreash the acess token
    # after they expire after the specified amount of time
    try: 
        exp_time = get_jwt()["exp"]
        now = datetime.datetime.now(datetime.timezone.utc)
        target_timstamp = datetime.datetime.timestamp(now + datetime.timedelta(minutes=30))
        if target_timstamp > exp_time:
            access_token = create_access_token(identity=get_jwt_identity())
        return response
    except (RuntimeError, KeyError):
        return response

@app.route("/register", methods=["POST", "GET"])
def register():    
    #This route handles registration of user accounts
    data = request.get_json()    
    print("passed")
    user = Users.query.filter_by(email=data["email"]).first()    
    if user:
        # If a user is already registered the endpoint sends a json message
        # back to the user indicating that he or she is already regsitered
        return jsonify({"msg": "user already exists login rather", "type": "error"}), 409
    hashed_pass = generate_password_hash(password=data["password"], method="pbkdf2:sha256", salt_length=16)
    public_id = str(uuid.uuid4())
    new_user = Users(f_name=data["firstName"].title(), l_name=data["lastName"].title(), email=data["email"].lower(), password=hashed_pass, public_id=public_id)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=public_id)
    # if a user pro
    return jsonify({"msg":f"Hello {data['firstName']} {data['lastName']}, your account has been created successfully",
    "accessToken": f"{access_token}", "type": "success"}), 201    
@app.route("/login", methods=["POST", "GET"])
def login():
    # Handles user login
    data = request.get_json()        
    user = Users.query.filter_by(email=data["email"].lower()).first()
    if not user:
        return jsonify({"msg": "user does not exist, register rather", "type" : "error"}), 401
    if check_password_hash(password=data["password"], pwhash=user.password):
        # bearer authorization token generated
        access_token = create_access_token(identity=user.public_id)
        return jsonify({"msg": "login successful", "accessToken": f"{access_token}","type" : "success"}), 200
    return jsonify({"msg": "Incorrect Password", "type": "error"}), 403   

@app.route("/logged-in-user")   
@jwt_required()
def logged_in():
    #returns the details of the current logged in user
    user = Users.query.filter_by(public_id=get_jwt_identity()).first()
    details = {
        "firstName" : user.f_name,
        "lastName" : user.l_name,
        "email" : user.email,    
    }
    return jsonify({"details" : details})

@app.route("/jobs", methods=["POST", "GET"])
@jwt_required()
def jobs():
    # retuens all jobs that a user has not applied
    all_jobs = db.session.query(Jobs).all()  
    all_jobs_list = customFunction(all_jobs)
    appl_list = []
    appl_dict = {}
    for job in all_jobs_list:
        appl_dict = {
            "title" : job.title,
            "category" : job.category,
            "jobID" : job.public_id, 
            "description" : job.description,
            "postedBy" : f"{job.hiring_manager.f_name} {job.hiring_manager.l_name}"
        }
        appl_list.append(appl_dict)
    return jsonify({"msg": "current jobs", "data" : appl_list}), 200    


@app.route("/add-jobs", methods=["POST", "GET"])
@jwt_required()
def add_jobs():
    #Hanles posting of jobs in the web application
    data = request.get_json()
    public_id = str(uuid.uuid4())
    current_user = Users.query.filter_by(public_id=get_jwt_identity()).first()
    new_job = Jobs(title=data["title"].title(), category=data["category"].title(), public_id=public_id, 
    description=data["description"], hiring_manager=current_user)
    db.session.add(new_job)
    db.session.commit()
    return jsonify({"msg": "Job added successfully!", "type" : "success",}), 201
    
@app.route("/apply", methods=["POST", "GET"])
@jwt_required()
def apply_job():
    # Handles users when applying for jobs
    data = request.get_json()    
    public_id = data["publicID"]
    current_user = Users.query.filter_by(public_id=get_jwt_identity()).first()
    job = Jobs.query.filter_by(public_id=public_id).all()
    apply = AppliedJobs(applied=job[0], employee=current_user)    
    db.session.add(apply)
    db.session.commit()
    return jsonify({"msg":"Job applied successfully", "type" : "success"}), 200    
@app.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    # handles the user profile
    # returns the jobs a user has applied and the ones he or she has posted 
    current_user = Users.query.filter_by(public_id=get_jwt_identity()).first()
    print(current_user)
    applied = Users.query.get(current_user.id).applied_jobs 
    posted = current_user.jobs    
    appl_list = []
    appl_dict = {}
    for job in applied:
        appl_dict = {
            "title" : job.applied.title,
            "category" : job.applied.category,
            "description" : job.applied.description,
            "postedBy" : f"{job.applied.hiring_manager.f_name} {job.applied.hiring_manager.l_name}"
        }
        appl_list.append(appl_dict)
    post_list = []
    post_dict = {}
    for job in posted:
        post_dict = {
            "title" : job.title,
            "category" : job.category,
            "description" : job.description,            
        }
        post_list.append(post_dict)
          
    return jsonify({"appliedJobs" : appl_list, "jobsPosted" : post_list}), 200    
@app.route("/logout")
@jwt_required()
def logout():   
    #handles user logout 
    return jsonify({"msg":"Logged out successfully", "type": "success"}), 200    
@app.route("/jobs-category")
@jwt_required()
def job_category():
    # handles searching for jobs by category and returns json data
    data = request.get_json()
    category = data["category"]    
    jobs = Jobs.query.filter_by(category=category).all()    
    jobs = customFunction(jobs)
    jobs_list = []
    post_dict = {}
    for job in jobs:
        post_dict = {
            "title" : job.title,
            "category" : job.category,
            "description" : job.description,            
        }
        jobs_list.append(post_dict)
    return jsonify({"jobs": jobs_list}), 200

def customFunction(all_jobs):
    # used to filer jobs that a user has applied so 
    # that he or she does not apply again
    all_jobs_list = []      
    public_id = get_jwt_identity()
    current_user = Users.query.filter_by(public_id=public_id).first()
    already_applied = current_user.applied_jobs
    ids_applied = []
    hires = []
    hiring = current_user.jobs
    for hire in hiring:
        hires.append(hire.id)
    for applied in already_applied:
        ids_applied.append(applied.job_id)
    for job in all_jobs:
        if not job.id in ids_applied and not job.id in hires:
            all_jobs_list.append(job)
    return all_jobs_list
if __name__ == "__main__":
    app.run(debug=True)