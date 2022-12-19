import unittest
import requests

try:
    from app import app
except Exception as e:
    raise e

class TestCases(unittest.TestCase):
    
    url = "http://127.0.0.1:5000" 
    data = {
        "firstName": "John",
        "lastName" : "Doe",
        "email" : "test@gmail.com",
        "password": "1234"
    } 
    user2 = {
        "firstName": "James",
        "lastName" : "Duck",
        "email" : "jamesduck@gmail.com",
        "password": "1234"
    } 
    user3 = {
        "firstName": "Bill",
        "lastName" : "Duck",
        "email" : "billduck@gmail.com",
        "password": "1234"
    }
    user4 = {
        "firstName": "Lionel",
        "lastName" : "Messi",
        "email" : "lionelm@gmail.com",
        "password": "1234"
    }
    new_job_data = {
        "title" : "Python Developer", 
        "category" : "programming",
        "description" : "This is a java program job"
    }
    apply_job_data = {
        "publicID" : "be5d4408-276d-4925-83dc-9be89eca3296"
    }
    category = {
        "category" : "programming"
    }
    def access_token_gen(self):
        # generates access token
        res = requests.post(url=f"{self.url}/login", json=TestCases.data )                       
        TestCases.token = res.json()["accessToken"] 
        headers = {
        "Authorization" : f"Bearer {res.json()['accessToken']}"
        }
        return headers
    def test_register(self):
        #test register endpoint
        res = requests.post(url=f"{self.url}/register", json=TestCases.user4)
        self.assertEqual(res.status_code, 200)
    def test_register_exists(self):
        #test if a user already exists
        res = requests.post(url=f"{self.url}/register", json=TestCases.user2)
        self.assertEqual(res.status_code, 409)
    def test_login(self):  
        #login endpoint test      
        res = requests.post(url=f"{self.url}/login", json=TestCases.data )                                       
        self.assertEqual(res.status_code, 200) 
    def test_login_does_not_exist(self):
        #test user does not have an account
        res = requests.post(url=f"{self.url}/login", json=TestCases.user3)                                       
        self.assertEqual(res.status_code, 401) 
    def test_all_jobs(self): 
        #test for the /jobs endpoint       
        res = requests.post(url=f"{TestCases.url}/jobs", headers=self.access_token_gen())
        self.assertEqual(res.status_code, 200)
    def test_add_jobs(self):
        #test for the /add-jobs
        res = requests.post(url=f"{self.url}/add-jobs",json=TestCases.new_job_data, headers=self.access_token_gen())
        self.assertEqual(res.status_code, 201)
    def test_apply_jobs(self):
        #test for apply jobs route
        res = requests.post(url=f"{self.url}/apply",json=TestCases.apply_job_data, headers=self.access_token_gen(), )
        self.assertEqual(res.status_code, 200)
    def test_profile(self):
        #test for the profile job route
        res = requests.get(url=f"{self.url}/profile", headers=self.access_token_gen())
        self.assertEqual(res.status_code, 200)
    def test_search_by_category(self):
        #test /jobs-category
        res = requests.get(url=f"{self.url}/jobs-category",json=TestCases.category, headers=self.access_token_gen())
        self.assertEqual(res.status_code, 200)

if __name__ == "__main__":
    unittest.main()
    app.run()