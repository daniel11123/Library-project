import React from "react";
import * as ReactDOM from 'react-dom/client';
import Header from "./Component/Header";
import './App.css';
import { Login } from "./Component/Login";
import { Register } from "./Component/Register";
import { LoginAdmin } from "./Component/LoginAdmin";
import Homepage from "./Component/Homepage";
import Booklist from "./Component/Booklist";
import Booklistfunc from "./Function/Booklistfunc";
import Bookdetailfunc from "./Function/Bookdetailfunc";
export class Main extends React.Component {
  render() {
    var tokenlogin = localStorage.getItem("keylogin");
    var tokenloginadmin = localStorage.getItem("keyloginadmin")
    var tokenidbook = localStorage.getItem("idbook")
    console.log("tokenlogin", tokenlogin)
    var pathname = window.location.pathname;
    var pathnameidbook = window.location.pathname
    var splitUrl = pathnameidbook.split('/');
    console.log(splitUrl[2])
    if ((tokenlogin || tokenloginadmin) && pathname === "/Booklist") {
      return (
        <div>
          <Booklistfunc />
        </div >
      )
    }
    else if ((tokenlogin || tokenloginadmin) && (pathname === "/loginadmin" || pathname === "/login")) {
      return (
        <div><Header /></div>
      )
    }
    else if (pathname === "/register") {
      return (
        <div><Register /></div>
      )
    }
    else if (pathname === "/login") {
      return (
        <div><Login /></div>
      )
    }


    else if (pathname === "/loginadmin") {
      return (
        <div><LoginAdmin /></div>
      )
    }
    // (pathname === "/Booklist/63b3fd318d0de151f0db491c")
    else if (pathname === "/Booklist/63b3fd318d0de151f0db491c") {
      return (
        <div>
          <Bookdetailfunc />
        </div>
      )
    }
    else if (pathname === "/") {
      return (
        <div>
          <Homepage />
        </div>
      )
    }


  }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
