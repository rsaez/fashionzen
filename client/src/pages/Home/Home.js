import React, { Component } from "react";
import Nav from "../../components/Nav";
import LogInBtn from "../../components/LogInBtn";
import Card from "../../components/Card/index";
import SignUpBtn from "../../components/SignUpBtn";
import SignUpInForm from "../../components/SignUpInForm";

class Home extends Component {

    render() {
        return (
            <div>
                <Card>
                <h1>Welcome to Fashionzen</h1>
                <h2>This app will let you organize your closet and find your favorite outfits.</h2>
                </Card>
            </div>
        )
    }
}

export default Home;
