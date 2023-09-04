import React,{Component} from 'react';
import { Switch,Route } from 'react-router-dom';
import CarHome from './carHome';
import CarNav from './carNav';
import CarNew from './carNew';
import CarDlt from './carDlt';
class CarMain extends Component{
    render(){
        return(
            <React.Fragment>
                <CarNav/>
                <Switch>
                <Route path="/carDlt/:id" render={(props)=><CarDlt {...props}/>}/>
                <Route path="/carNew/:id" render={(props)=><CarNew {...props}/>}/>
                <Route path="/carNew" render={(props)=><CarNew {...props}/>}/>
                    <Route path="/" render={(props)=><CarHome {...props}/>}/>
                   
                </Switch>
            </React.Fragment>
        )
    }}
export default CarMain;