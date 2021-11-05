import react from "react";
import LoginForm from "./login";
import Error404 from "./404";
import RegisterForm from "./register";

import { Route, Switch  } from "react-router-dom";
import Dashboard from "./dashboard";
import Welcome from "./welcome";
import Header from "./template/header";
import OpenAccount from "./openAccount";
import OpenDeposit from "./openDeposit";

export default function Routes(){
    return(
        <Switch>
            {/*Login Form Path*/ }
            <Route exact path = "/">
              <LoginForm />
            </Route>

            <Route path = "/register">
                <RegisterForm />
            </Route>

            <Route path = "/dashboard">
                <Dashboard />
            </Route>

            <Route path = "/welcome">
                <Welcome />
            </Route>

            <Route path = "/open">
                <OpenAccount />
            </Route>

            <Route path = "/openDeposit">
                <OpenDeposit />
            </Route>

            <Route path = "*">
              <Error404 />
            </Route>
            
        </Switch>
    )
}