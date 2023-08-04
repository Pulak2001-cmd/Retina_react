import React, { useState } from 'react'
import './css/Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login({setCount}) {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = ()=> {
    if(email === 'admin@infomaticae.com' && password === 'admin'){
        setCount(true);
        navigation('/');
    } else {
        alert("Wrong credentials !")
    }
  }
  return (
    <div className="body">
    <div class="d-flex flex-column align-items-center justify-content-center box-1">
        <div class="d-flex flex-column">
            <h2 class="text-warning">Retinal Image Analysis</h2>
            <div class="d-flex flex-column align-items-center justify-content-center m-2">
                <h3>RCEENetworks LLC.</h3>
                
            </div>
        </div>
        <form enctype="multipart/form-data">
            <div class="form-floating mb-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control input" id="floatingInput" placeholder="name@example.com" name="email" />
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} class="form-control" id="floatingPassword" name="password" placeholder="Password" />
                <label for="floatingPassword">Password</label>
            </div>
            <button type="submit" class="btn btn-primary m-5" onClick={login}>Login</button>
        </form>
    </div>
    
  </div>
  )
}
