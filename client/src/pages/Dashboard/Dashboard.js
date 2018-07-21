import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import LogOutBtn from "../../components/LogOutBtn";
import Card from "../../components/Card/index";
import { getFromStorage } from "../../utils/storage";

class Dashboard extends Component {

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
        // grab the local storage object the the API methods store local storage too
        const userDataT = getFromStorage('the_main_app');
        // set local storage into state
        this.setState({userData: userDataT.userToken},()=> {
            // use a call back function after state has been set to pass the data to the load function
            this.loadClothes(this.state.userData);
        });
    };

    // Loads all documents from db and and sets them to this.state.clothes
    loadClothes = (id) => {
       API.getCloset(id)
       .then(res => this.setState({clothes: res.data}))
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

    // handle change in the map list which requires a key
    handleListChange = (docID, field, event) => {
        // Make a copy of clothes first. Use slice with no params to create a shadow copy of the array
        let clothesChange = this.state.clothes.slice();
        // find position of object in an array
        let elementPos = clothesChange.map(function(x) {return x._id; }).indexOf(docID);
        
        // Update it with the modified value. Only update the one the user it typing in
        switch (field) {
            case "articleName":
                clothesChange[elementPos].articleName = event.target.value;
                break;
            case "clothingType":
                clothesChange[elementPos].clothingType = event.target.value;
                break;
            case "color":
                clothesChange[elementPos].color = event.target.value;
                break;
            case "material":
                clothesChange[elementPos].material = event.target.value; 
                break;
        };
        // Update the state.
        this.setState({clothes: clothesChange}); 
    };


    updateClothes = (id, body) => {
        API.updateCloset(id, body)
            .then(res => this.loadClothes(this.state.userData), console.log("updated"))
            .catch(err => console.log(err));
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
            .then(res => this.loadClothes(this.state.userData))
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
                <Card>
                <h1>Welcome! Check out your wardrobe.</h1>
                {/* Turn this form (article display) into a component then run the map function on it
                    {clothes.articleName} {clothes.clothingType} {clothes.color} {clothes.material}
                */}
                <ul>
                    {console.log(this.state.clothes)}
                {this.state.clothes.map(clothes =>
                    <li key={clothes._id}>

                    <input type="text" name={clothes.articleName} value={clothes.articleName}  
                        onChange={(e) => this.handleListChange(clothes._id, "articleName", e)} placeholder="articleName"/>

                    <input type="text" name={clothes.clothingType} value={clothes.clothingType} 
                    onChange={(e) => this.handleListChange(clothes._id, "clothingType", e)} placeholder="clothingType"/>

                    <input type="text" name={clothes.color} value={clothes.color} 
                    onChange={(e) => this.handleListChange(clothes._id, "color", e)} placeholder="color"/>

                    <input type="text" name={clothes.material} value={clothes.material} 
                    onChange={(e) => this.handleListChange(clothes._id, "material", e)} placeholder="material"/>

                        <span onClick={() => this.deleteClothes(clothes._id)}>DELETE</span>
                        <span onClick={() => this.updateClothes(clothes._id, clothes)}>UPDATE</span>
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

export default Dashboard;
