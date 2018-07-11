import React from "react";

const Card = props => (
    <div className="card text-center">
        <div className="card-body">{props.children}</div>
    </div>
);


export default Card;