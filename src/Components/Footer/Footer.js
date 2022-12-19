import './Footer.css';
import facebook from './facebook.png';
import instagram from './instagram.png';
import twitter from './twitter.png';


// This is the Exploration footer in the home page
const Footer = () =>{

    return(
        <div className="footer">
            <div className='footerTitle'>
                <h1>Explore Hireme</h1>
            </div>
            <hr />
            <div className='footerLinks'>
                <div>
                    <h3>For Job seekers</h3>
                    <p>Apply</p>
                </div>
                <div>
                    <h3>For Company</h3>
                    <p>About us</p>
                    <p>Contact us</p>

                </div>
            </div>
            <hr />
            <div className='footerFollow'>
                <h2>Follow us</h2>
                <img src={facebook} alt="fb" />
                <img src={instagram} alt="insta" />
                <img src={twitter} alt="twitter" />
            </div>

        </div>
    );
}

export default Footer;