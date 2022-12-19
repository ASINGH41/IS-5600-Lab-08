import './DreamJob.css';
import cv from "./cv.png";
import practice from "./practice.png";
import target from "./target.png";

// This introduces the purposes of the website and all the things that can be achieved by using it
const DreamJob = () =>{
    return(
        <div className='dreamJob'>

            <div className='dreamJobContent'>
                <h1>Find Your Dream Job</h1>

                <p>
                    Have ever dreamed of getting a job at dream company? Do you ever <br />
                    dream of taking your career to the next step in terms of how <br />
                    finances. Then Hireme gives you the following steps which you can <br />
                    follow so as to land a job in your dream comapany.
                </p>
                <div className='dreamCards'>
                    <div className='dreamCard'>
                        <img src={target} alt="target" />
                        <p>Know your skill</p>
                    </div>
                    <div className='dreamCard'>
                        <img src={practice} alt="target" />
                        <p>Practice your skill</p>
                    </div>
                    <div className='dreamCard'>
                        <img src={cv} alt="target" />
                        <p>Generate a good resume</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DreamJob;