import React, { Component } from "react";
import axios from "axios";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import LogOutBtn from "../../components/LogOutBtn";
import Card from "../../components/Card/index";

class HelloReact extends Component {

    state = {
        clothes: [],
        user: "",
        articleName: "", 
        clothingType: "",
        color: "",
        material: "",
        image: []
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
        if (this.state.user && this.state.articleName && this.state.clothingType && this.state.color && this.state.material && this.state.image) {
          API.saveCloset({
            user: this.state.user,
            articleName: this.state.articleName,
            clothingType: this.state.clothingType,
            color: this.state.color,
            material: this.state.material,
            // image: this.state.file
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



    handlePush = (event) => {
        event.preventDefault();
        console.log('handle uploading', this.state.file);
        API.getImage();
        //todo axios
    };

    handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file)
    };

    // uploadHandler = () => {
    //     const formData = new FormData();
    //     formData.append('myFile', this.state.image, this.state.image.name);
    //     axios.post("picture", formData);
    // };


    readURL = (input) => {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
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

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl){
            $imagePreview = (<img src = {imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className = "previewtext" />)
        }
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
                        {clothes.user} {clothes.articleName} {clothes.clothingType} {clothes.color} 
                        <span onClick={() => this.deleteClothes(clothes._id)}>DELETE</span>
                    </li>
                )}
                </ul>

                
                {/*Form to add clothing item*/}
                <form onSubmit={this.handleSubmit}>
                    <label>Input Clothes</label>
                    <input type="text" name="user" value={this.state.user} onChange={this.handleChange} placeholder="user"/>
                    <input type="text" name="articleName" value={this.state.articleName} onChange={this.handleChange} placeholder="articleName"/>
                    <input type="text" name="clothingType" value={this.state.clothingType} onChange={this.handleChange} placeholder="clothingType"/>
                    <input type="text" name="color" value={this.state.color} onChange={this.handleChange} placeholder="color"/>
                    <input type="text" name="material" value={this.state.material} onChange={this.handleChange} placeholder="material"/>
                    <input type='file' onChange={this.handleImageChange} placeholder="image" />

                    <input type="submit" value="Submit" />
                    <input type="submit" onClick={this.handlePush} value="Push Image" />
                </form>
                    <div className="previewComponent" />
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>

                </Card>


            </div>
        )
    }
}

export default HelloReact;
