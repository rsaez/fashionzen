import React, { Component } from "react";
import API from "../utils/API";

class HelloReact extends Component {

    state = {
        clothes: []
    };

    componentDidMount() {
        this.loadClothes();
    };

    // Loads all documents from db and and sets them to this.state.clothes
    loadClothes = () => {
       API.getCloset()
       .then(res => this.setState({clothes: res.data}, () => console.log("GET request worked:", this.state.clothes)))
       .catch(err => console.log(err));
    };

    render() {
        
        return(
            <div>
                <h1>Hello World!</h1>
                {/* TODO: turn this form (article display) into a component then run the map function on it*/}
                <ul>
                {this.state.clothes.map(clothes => 
                    <li key={clothes._id}>
                        {clothes.user}
                        {clothes.articleName}
                        {clothes.clothingType}
                        {clothes.color}
                    </li>
                )}
                </ul>
                {/*article display end*/}
            </div>
        )
    }
}

export default HelloReact;
