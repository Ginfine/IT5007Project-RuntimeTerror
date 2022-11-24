import {useState} from "react";
import {Form ,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../css/SignUp.css"
export default function SignUp({setAlert,setUser}){
    const [firstName,setFirstName] = useState("");
    const[lastName,setlastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();
 
    function createAccount(e){
        const requestOptions = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({firstName:firstName,lastName:lastName,username:username,password:password})
        };


        
        console.log(requestOptions);
        fetch("/createUser",requestOptions).then(_res => {
            return _res.json()
        }).then((data) => {setAlert({
            variant: "success",
            message: "Your account has been created.",
          });
          setUser(data.username);
          navigate("/");})
        .catch((err)=>console.error(err));
}

    function undateUsername(e){
        setUsername(e.target.value);
        console.log(username);

    }
    function undateFirstName(e){
        setFirstName(e.target.value);
        console.log(firstName);
    }
    function undateLastName(e){
        setlastName(e.target.value);
        console.log(lastName);

    }

    function undatePassword(e){
        setPassword(e.target.value);
        console.log(password);

    }




    return <Form className="sign-up-form">
        <Form.Group className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" onInput={undateUsername} />
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" onInput={undateFirstName} />
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" onInput={undateLastName} />
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" placeholder="password" onInput={undatePassword} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={createAccount}>Create Account</Button>
    </Form>;
}