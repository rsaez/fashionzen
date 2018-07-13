import React from "react";
import { Link } from "react-router-dom";

const LogInBtn = (props) => (
    <Link to="/Dashboard">
    <button  onClick={props.handleFormSubmit} type="button" className="btn btn-secondary">Log in</button>
</Link>
);

export default LogInBtn;