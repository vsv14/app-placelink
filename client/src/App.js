import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import 'materialize-css';
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/navbar";
import { HNavbar } from "./components/navbarhome";
import { Loader } from "./components/loader";




function App() {
  const {login, logout, userName, token_a, ready} = useAuth()
  let wasAuth = !!token_a
  const routes = useRoutes(wasAuth)

  
  if(!ready){
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{login, logout , userName, token_a, wasAuth}}>
      <Router>
        <div>
          {wasAuth?<Navbar/>: <HNavbar/>}
          {routes}          
        </div>
      </Router>
    </AuthContext.Provider>    
  );
}

export default App;
