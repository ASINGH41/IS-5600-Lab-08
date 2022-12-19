import {useState} from 'react';
import './Login.css';

//This is the login form
const Login = ({routeChange, setUserName, setAccessToken}) =>{

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const onEmailChange = (event) =>{
        let inputValue = event.target.value.toLowerCase();
        setLoginEmail(inputValue);
    }

    const onPasswordChange = (event) =>{
        setLoginPassword(event.target.value);
    }

    const onLogin = () =>{
        fetch("http://127.0.0.1:5000/login", {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        })
        .then(reponse => reponse.json())
        .then(data =>{
            if(data.msg === "login successful"){
                fetch("http://127.0.0.1:5000/logged-in-user", {
                    method: 'get',
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Bearer ${data.accessToken}`}
                })
                .then(reponse => reponse.json())
                .then(data =>{
                    setUserName(`${data.details.firstName} ${data.details.lastName}`)
                })
                routeChange("profile");
                setAccessToken(data.accessToken);
            }
            alert(data.msg);
            // console.log(data);
        })
        
    }

    return(
        <div className='login'>
            <div>
                <p>Email</p>
                <input onChange={onEmailChange} type="text" placeholder='Enter email address'/>
                <p>Password</p>
                <input onChange={onPasswordChange} type="text" placeholder='Enter password'/>
                <br />
                <button onClick={onLogin}>login</button>
            </div>
        </div>
    );
}

export default Login