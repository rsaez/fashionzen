import React, { Component } from "react";
import Nav from "../../components/Nav";
import LogInBtn from "../../components/LogInBtn";
import Card from "../../components/Card/index";
import SignUpBtn from "../../components/SignUpBtn";

class Home extends Component {

    render() {
        return (
            <div>
                <Nav>
                </Nav>
                <LogInBtn />
                <SignUpBtn/>
                <Card>
                    <h1>Home Page</h1>
                </Card>
            </div>
        )
    }
}

export default Home;