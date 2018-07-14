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
                <Nav>
                </Nav>
                <LogInBtn/>
                <SignUpBtn/>
                <SignUpInForm/>


                <Card>
                    <h1>Home Page</h1>
                </Card>
            </div>
        )
    }
}

export default Home;