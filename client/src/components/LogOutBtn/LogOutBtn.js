import React from "react";
import { Link } from "react-router-dom";


const LogOutBtn = () => (
    <Link to="/">
    <button type="button" className="btn btn-secondary" href="/Home">Log Out</button>
    </Link>
);

export default LogOutBtn;