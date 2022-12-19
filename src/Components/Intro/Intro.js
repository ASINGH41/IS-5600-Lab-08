import introPic from './intro.jpg';
import './Intro.css';

// This contains the motto and the main image of the website found in the home page
const Intro = ({routeChange}) =>{

    return(
        <div className='intro'>
            <div className='introText'>
                <h1>Find your right job</h1>
                <h1>Get Hired, Get to</h1>
                <h1>Work</h1>
                <h5>Work with top gurus in your field, Work with your dream company</h5>

                <button className='introBtn' onClick={() => routeChange("login")}>Get Started</button>
            </div>
            <div className='introPicCont'>
                <img className='introPic' src={introPic} alt="a person writing" />
            </div>
        </div>
    )
}

export default Intro