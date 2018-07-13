import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () =>(
    <Router>
        <div>
            <Switch>
                <Route exact path ="/" component={Home} />
                <Route exact path ="/Home" component={Home} />
                <Route exact path ="/Dashboard" component={Dashboard} />
            </Switch>
            <Footer />
        </div>
    </Router>
);
export default App;
