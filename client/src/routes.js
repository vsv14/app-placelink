import React from "react"
import {Switch, Route , Redirect} from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { AuthPage } from "./pages/AuthPage"
import { Auth2Page } from "./pages/Auth20Success"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPage"
import { RegistrationPage } from "./pages/RegistrationPage"



export const useRoutes = (isAuthenticated = false)=>{
    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>

                <Route path="/detail/:id" >
                    <DetailPage/>
                </Route>

                <Redirect to="/links" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/home">
                <HomePage />
            </Route>
            <Route path="/signin">
                <AuthPage />
            </Route>
            <Route path="/signup">
                <RegistrationPage />
            </Route>
            <Route path="/auth2">
                <Auth2Page />
            </Route>

            <Redirect to="/home" />
        </Switch>
    )

}