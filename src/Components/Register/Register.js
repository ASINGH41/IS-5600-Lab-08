import { useState } from 'react';
import './Register.css';


// This is the registration form
const Register = ({setAccessToken, routeChange, setUserName}) =>{

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [accessToken, setAccessToken] = useState("");

    const onFirstNameInput = (event) =>{
        setFirstName(event.target.value);
    }

    const onLastNameInput = (event) =>{
        setLastName(event.target.value);
    }

    const onEmailInput = (event) =>{
        let inputValue = event.target.value.toLowerCase();
        setRegisterEmail(inputValue);
    }

    const onPasswordInput = (event) =>{
        setRegisterPassword(event.target.value);
    }

    const onConfirmPasswordInput = (event) =>{
        setConfirmPassword(event.target.value);
    }


    const onRegister = () =>{
        if(registerPassword === confirmPassword){
            fetch("http://127.0.0.1:5000/register", {
                method: 'post',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify({
                    firstName: firstName,
                    lastName : lastName,
                    email : registerEmail,
                    password: registerPassword
                })
            })
            .then(reponse => reponse.json())
            .then(data =>{
                if(data.type === "success"){
                    routeChange("profile");
                    fetch("http://127.0.0.1:5000/logged-in-user", {
                    method: 'get',
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Bearer ${data.accessToken}`}
                    })
                    .then(reponse => reponse.json())
                    .then(data =>{
                        console.log(data);
                        setUserName(`${data.details.firstName} ${data.details.lastName}`)
                    })
                routeChange("profile")
                setAccessToken(data.accessToken);
                }
            alert(data.msg);
            })
        }else{
            alert("Passwords do not match");
        }

    }

    return(
        <div className='register'>
            <div>
                <p>First Name</p>
                <input onChange={onFirstNameInput} type="text" placeholder='Enter first name'/>
                <p>Last Name</p>
                <input onChange={onLastNameInput} type="text" placeholder='Enter last name'/>
                <p>Email</p>
                <input onChange={onEmailInput} type="text" placeholder='Enter email address'/>
                <p>Password</p>
                <input onChange={onPasswordInput} type="text" placeholder='Enter password'/>
                <p>Confirm Password</p>
                <input onChange={onConfirmPasswordInput} type="text" placeholder='Re-enter password'/>
                <br />
                <button onClick={onRegister}>Register</button>
            </div>
        </div>
    )
}

export default Register;