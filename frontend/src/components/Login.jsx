import { useState } from "react";
import AuthService from "../services/AuthService.jsx";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Login()
{
    const [user,setUser] = useState({username:"",password:""})
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e)=>{
        e.preventDefault();

        AuthService.login(user).then(res=>{
            if(res.data == true)
            {
                localStorage.setItem("logged", true);
                navigate("/");
            }
            else
            {
                setError("Invalid Username and Password");
            }
        })

    }

    return(
        <div className="container mt-5 p-5">
            <div className="card mt-4 p-5 w-50 offset-3">

                <h3 className="text-center"> Login </h3>

                <label className="my-2"> UserName:</label>
                <input type="text" name="username" className="form-control" autoComplete="off"
                value={user.username}
                onChange={(e)=> setUser({...user, username: e.target.value})}/>

                <label className="my-2"> Password:</label>
                <input type="password" name="password" className="form-control" autoComplete="off"
                value={user.password}
                onChange={(e)=> setUser({...user, password: e.target.value})}/>

                {error  && <small className="text-center text-danger">{error}</small>}

                <button className="login-btn" onClick={handleLogin}> login </button>    
            </div>
        </div>
    )
}
export default Login;