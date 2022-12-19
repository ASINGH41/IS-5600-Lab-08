import './Card2.css';

const Card2 = ({title, category, description}) =>{

    return(
        <div className="card2">
            <p style={{borderBottom:"1px solid black"}}>{category}</p>
            <div className='card2Content'>
                <h5>{title}</h5>
                {description}
            </div>
        </div>
    )
}

export default Card2;