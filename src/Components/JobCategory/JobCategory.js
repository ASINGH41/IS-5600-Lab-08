
import "./JobsCategory.css";


const JobCategory = () =>{

    return(
        <div className="jobsCategory">
            <h1>Look for jobs by category</h1>
            <div className="categoryButtons">
                <button>Accounting</button>
                <button>Programming</button>
                <button>Engineering</button>
                <button>Design</button>
            </div>
        </div>
    )
}

export default JobCategory;