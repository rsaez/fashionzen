import React, { Component } from "react";
import API from "../utils/API";

class HelloReact extends Component {

    state = {
        clothes: [],
        user: "",
        articleName: "", 
        clothingType: "",
        color: "",
        material: ""
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

    // Set this.state equal to what is typed in the textboxes
    // need to look more into this (why does event need to be passed? what is the const technique called?)
    handleChange = (event) => {
        const { target: { name, value } } = event;
        this.setState({
          [name]: value
        });
    }; 
    
    // handle submition of user data then reloads data
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.user && this.state.articleName && this.state.clothingType && this.state.color && this.state.material) {
          API.saveCloset({
            user: this.state.user,
            articleName: this.state.articleName,
            clothingType: this.state.clothingType,
            color: this.state.color,
            material: this.state.material
          })
            .then(res => this.loadClothes())
            .catch(err => console.log(err));
        }
    };
    
    // Delete clothing from the database and reload page
    deleteClothes = (id) => {
        API.deleteCloset(id)
            .then(res => this.loadClothes())
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
                        {clothes.user} {clothes.articleName} {clothes.clothingType} {clothes.color} 
                        <span onClick={() => this.deleteClothes(clothes._id)}>DELETE</span>
                    </li>
                )}
                </ul>
                {/*article display end*/}

                
                {/*Form to add clothing item*/}
                <form onSubmit={this.handleSubmit}>
                    <label>Input Clothes</label>
                    <input type="text" name="user" value={this.state.user} onChange={this.handleChange} placeholder="user"/>
                    <input type="text" name="articleName" value={this.state.articleName} onChange={this.handleChange} placeholder="articleName"/>
                    <input type="text" name="clothingType" value={this.state.clothingType} onChange={this.handleChange} placeholder="clothingType"/>
                    <input type="text" name="color" value={this.state.color} onChange={this.handleChange} placeholder="color"/>
                    <input type="text" name="material" value={this.state.material} onChange={this.handleChange} placeholder="material"/>
                    <input type="submit" value="Submit"/>
                </form>
                {/*input form end*/}

            </div>
        )
    }
}

export default HelloReact;
