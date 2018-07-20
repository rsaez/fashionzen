import React from "react";

const ClosetPanel = ({user, articleName, clothingType, color, _id, deleteClothes}) => (
    <div className="closetpanel">

        <ul>
            <li>{user}</li>
            <li>{articleName}</li>
            <li>{clothingType}</li>
            <li>{color}</li>
        </ul>

        <span onClick={() => deleteClothes(_id)}>DELETE</span>

    </div>
);


export default ClosetPanel;