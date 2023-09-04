import React,{Component} from 'react';
import http from "./httpserver"
class CarDlt extends Component{
    async componentDidMount(){
        const {id}=this.props.match.params;
        console.log(id)
        let response=await http.deleteApi(`/cars/${id}`);
        console.log(response)
        this.props.history.push("/")
       
    }
    render(){
        return ""
    }
}
export default CarDlt;
