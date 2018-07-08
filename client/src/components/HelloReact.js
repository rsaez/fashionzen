import React, { Component } from "react";
import API from "../utils/API";

class HelloReact extends Component {

    state = {
        clothes: [],
        tester: ""
    };

    componentDidMount() {
        this.loadClothes();
    };

    // Loads all clothes and sets them to this.state.clothes
    loadClothes = () => {
        API.getCloset()
        .then(res => {
            // log the response so that you know it is working, delete befor production
            console.log(res.data);
            this.setState({ 
                clothes: res.data, 
                tester: res.data[0].color 
            });
        })
        .catch(err => console.log(err));
    };

    render() {
        return(
            <div>
                <h1>Hello World!</h1>
                {/* TODO: turn this form (article display) into a component then run the map function on it*/}
                <p>{this.state.tester}</p>
                {/*article display end*/}
            </div>
        )
    }
}

export default HelloReact;
