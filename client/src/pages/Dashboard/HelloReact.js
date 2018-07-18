import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import LogOutBtn from "../../components/LogOutBtn";
import Card from "../../components/Card/index";
import { getFromStorage } from "../../utils/storage";

class HelloReact extends Component {

    state = {
        clothes: [],
        user: "",
        articleName: "", 
        clothingType: "",
        color: "",
        material: "",
        image: "",
        userData: ""
    };

    componentDidMount() {
        this.loadClothes();
        // grab the local storage object the the API methods store local storage too
        const userDataT = getFromStorage('the_main_app') || "";
        // set local storage into state
        this.setState({userData: userDataT.userToken});
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
        if (this.state.userData && this.state.articleName && this.state.clothingType && this.state.color && this.state.material) {

          API.saveCloset({
            user: this.state.userData,
            articleName: this.state.articleName,
            clothingType: this.state.clothingType,
            color: this.state.color,
            material: this.state.material
          })
            .then(res => this.loadClothes())
            .catch(err => console.log(err));
        } else {
            alert("submit failed");
        }
    };
    
    // Delete clothing from the database and reload page
    deleteClothes = (id) => {
        API.deleteCloset(id)
            .then(res => this.loadClothes())
            .catch(err => console.log(err));
    };

    readURL = (input) => {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                ('')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };


    render() {
        return(
            <div>
                 <Nav>
                </Nav>
                <LogOutBtn></LogOutBtn>
                <Card>
                <h1>Hello World!</h1>
                {/* TODO: turn this form (article display) into a component then run the map function on it*/}
                <ul>
                {this.state.clothes.map(clothes => 
                    <li key={clothes._id}>
                        {clothes.articleName} {clothes.clothingType} {clothes.color} {clothes.material}
                        <span onClick={() => this.deleteClothes(clothes._id)}>DELETE</span>
                    </li>
                )}
                </ul>
                {/*article display end*/}

                
                {/*Form to add clothing item*/}
                <form onSubmit={this.handleSubmit}>
                    <label>Input Clothes</label>
                    <input type="text" name="articleName" value={this.state.articleName} onChange={this.handleChange} placeholder="articleName"/>
                    <input type="text" name="clothingType" value={this.state.clothingType} onChange={this.handleChange} placeholder="clothingType"/>
                    <input type="text" name="color" value={this.state.color} onChange={this.handleChange} placeholder="color"/>
                    <input type="text" name="material" value={this.state.material} onChange={this.handleChange} placeholder="material"/>
                    <input type='file' onChange={this.readURL} placeholder="img.jpeg"/>
                    <img name="image"  src={this.state.image} alt="your image" /><br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
                {/*input form end*/}
                </Card>


            </div>
        )
    }
}

export default HelloReact;
