import React,{ Component } from "react";
import {Link} from "react-router-dom";
class CarNav extends Component{
    render(){
        
        return (
            <React.Fragment>
               
      <nav className="navbar navbar-expand-sm navbar-danger bg-danger text-white d-flex">
        <Link className="navbar-brand pl-0" to="/">
          Home
        </Link>
        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            
            <li className="nav-item pr-0 mr-3">
              <Link className="nav-link" to="/carNew">
                New car
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    
            </React.Fragment>
        )
    }
}
export default CarNav;
    