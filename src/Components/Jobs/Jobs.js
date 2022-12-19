import Card3 from "../Card3/Card3";

// This is the jobs viewing page
const Jobs = ({jobs, token, setJobs, setProfileJobs}) =>{
    // const [jobsData, setJobsData] = useState([]);
    // console.log(jobs);

    const Cards = jobs.map((cardDetail) =>{
        let category = "";
        let title = "";
        let description = "";

        if(cardDetail.category !== undefined){
            category = cardDetail.category
        }
        if(cardDetail.title !== undefined){
            title = cardDetail.title
        }
        if(cardDetail.description !== undefined){
            description = cardDetail.description;
        }
        return(
            <Card3 setJobs={setJobs} title={title} description={description} setProfileJobs={setProfileJobs} category={category} key={cardDetail.jobID} jobID={cardDetail.jobID}  token={token} />
        )
    })

    return(
        <div>
            {Cards}
        </div>
    )
}

export default Jobs;