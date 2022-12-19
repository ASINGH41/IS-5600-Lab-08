import './Card3.css';

const Card3 = ({title, category, description, token, jobID, setJobs}) =>{

    const onApply = () =>{
        fetch("http://127.0.0.1:5000/apply", {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Bearer ${token}`},
            body: JSON.stringify({
                publicID : jobID
            })
        })
        .then(reponse => reponse.json())
        .then(data =>{
            setJobs();
            console.log(data);
        })
    }

    return(
        <div className="card3">
            <p style={{borderBottom:"1px solid black"}}>{category}</p>
            <div className='card1Content'>
                <h5>{title}</h5>
                {description}
            </div>
            <p style={{borderTop: "1px solid black"}}>
                <button onClick={onApply}>Apply</button>
            </p>
        </div>
    )
}

export default Card3;