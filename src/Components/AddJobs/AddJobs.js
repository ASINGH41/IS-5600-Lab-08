import { useState } from 'react';
import './AddJobs.css';

// This is the form that helps you add jobs for others to view and work on
const AddJobs = ({token}) =>{

    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobCategory, setJobCategory] = useState("");


    const onJobTitleInput = (event) =>{
        setJobTitle(event.target.value);
    }
    const onJobDescriptionInput = (event) =>{
        setJobDescription(event.target.value);
    }
    const onJobCategoryInput = (event) =>{
        setJobCategory(event.target.value);
    }

    const onAddJob = () =>{
        fetch("http://127.0.0.1:5000/add-jobs", {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Bearer ${token}`},
            body: JSON.stringify({
                title : jobTitle, 
                category : jobCategory,
                description : jobDescription
            })
        })
        .then(reponse => reponse.json())
        .then(data =>{
            console.log(data);
            alert(data.msg);
        })
    }

    return(
        <div className='addJobs'>
            <div>
                <p>Job Title</p>
                <input onChange={onJobTitleInput} type="text"/>
                <p>Job Description</p>
                <textarea onChange={onJobDescriptionInput} name="" id="" cols="30" rows="2"></textarea>
                <p>Job Category</p>
                <select name="jobCategory" onChange={onJobCategoryInput}>
                    <option value="Design & Creative">Design & Creative</option>
                    <option value="Development & IT">Development & IT</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Writing & Translation">Writing & Translation</option>
                </select>
                <br />
                <button onClick={onAddJob}>Add Job</button>
            </div>
        </div>
    )
}

export default AddJobs;