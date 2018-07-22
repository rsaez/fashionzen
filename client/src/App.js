import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUpInForm from "./components/SignUpInForm";
import Footer from "./components/Footer";
import React, { Component } from 'react';
import 'whatwg-fetch';

const App = () =>(
    <Router>
        <div>
            <Switch>
                <Route exact path ="/" component={SignUpInForm} />
            </Switch>
            <Footer />
        </div>
    </Router>
);
export default App;
