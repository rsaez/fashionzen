import React from "react";
import { Link } from "react-router-dom";


const SignUpBtn = () => (
    <Link to="/Dashboard">
    <button type="button" className="btn btn-secondary" href="/">Sign Up</button>
    </Link>
);

export default SignUpBtn;