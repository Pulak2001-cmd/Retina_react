import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({setCount}) {
  const navigation = useNavigate();
  const logout = ()=> {
    setCount(false);
    navigation('/');
  }
  return (
    <nav class="d-flex flex-row">
        <div class=" m-auto ps-2">
            <div class="m-2 d-flex">
            <div class="d-flex flex-column align-items-center justify-content-center m-2">
                <h4>RCEENetworks LLC.</h4>
            </div>
            </div>
        </div>
        <div class="d-flex flex-row m-auto" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row align-items-center justify-content-center">
                <li class="nav-item m-3">
                    <Link class="nav-link active" aria-current="page" to="/">Single Image Analysis</Link>
                </li>
                <li class="nav-item m-3">
                    <Link class="nav-link" aria-current="page" to="/patient">Patient Analysis</Link>
                </li>
                <li class="nav-item m-3">
                    <a class="nav-link" href="https://infomaticae.com/about/">About Us</a>
                </li>
                <li class="nav-item m-3">
                    <a class="nav-link" href="https://infomaticae.com/services-cat/services/">Other Services</a>
                </li>
                <li class="nav-item m-3">
                    <a class="nav-link" href="https://infomaticae.com/contact-1/">Contact Us</a>
                </li>
                <li class="nav-item m-3" onClick={logout}>
                    <a class="nav-link" href="">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
  )
}
