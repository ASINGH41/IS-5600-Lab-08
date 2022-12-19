import './Card1.css';

const Card1 = ({title, category, description, postedBy}) =>{

    return(
        <div className="card1">
            <p style={{borderBottom:"1px solid black"}}>{category}</p>
            <div className='card1Content'>
                <h5>{title}</h5>
                {description}
            </div>
            <p style={{borderTop: "1px solid black"}}>Posted By {postedBy}</p>
        </div>
    )
}

export default Card1;