import { useState, useEffect } from 'react';
import profile from './profile.png';
import Card1 from '../Card1/Card1';
import Card2 from '../Card2/Card2';
import './Profile.css';

// This is the landing page when a user logs in
const Profile = ({userName, token}) =>{
    const [profileData, setProfileData] = useState({});

    useEffect(() =>{
        fetch("http://127.0.0.1:5000/profile", {
          method: 'get',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Bearer ${token}`},
          })
          .then(reponse => reponse.json())
          .then(data =>{
              setProfileData(data);
            //   console.log("PROFILE:" ,data);
          }) 
        }, [token])
    
            // console.log( "2", profileData.appliedJobs);
        let appliedCards = 0;
        let postedCards = 0;

        if(profileData.appliedJobs !==undefined){
            appliedCards = profileData.appliedJobs.map(job =>{
                return (<Card1 title={job.title} category={job.category} description={job.description} postedBy={job.postedBy} />)
            })
        }

        if(profileData.jobsPosted !== undefined){
            postedCards = profileData.jobsPosted.map(job =>{
                return(
                    <Card2 title={job.title} category={job.category} description={job.description}/>
                )
            })
        }


    

    return(
        <div className='profile'>
            <div className="profileIntro">
                <img src={profile} alt="profile" />
                <h1>{userName}</h1>
            </div>

            <div className='profileApplied'>
                <h1>JOBS YOU HAVE APPLIED</h1>
                <div>
                    {appliedCards}
                </div>
            </div>
            <div className='profilePosted'>
                <h1>JOBS YOU HAVE POSTED!</h1>
                <div>
                    {postedCards}
                </div>
            </div>

        </div>
    )
}

export default Profile;