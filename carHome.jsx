import React,{Component} from "react";
import http from "./httpserver";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash} from "@fortawesome/free-solid-svg-icons";
import Link from "react-router-dom/Link";
import CarLeft from "./carLeft";
import queryString from "query-string";
class CarHome extends Component{
    state={
        cars:[],
        minPrice:'',
        maxPrice:''
    }
    async fetchData(){
        let queryParams=queryString.parse(this.props.location.search)
        let searStr=this.makeStr(queryParams)
    let response= await http.get(`/cars?${searStr}`)
    console.log(response)
    let {data}=response
    console.log(data)
    this.setState({cars:data})
    }
    async componentDidMount(){
        this.fetchData()
    }
    async componentDidUpdate(prevProps,prevState){
        if(prevProps!=this.props)
        this.fetchData()
    }
    callURL=(url,options)=>{
        console.log(url,options)
        let searchStr=this.makeStr(options);
        this.props.history.push({
            pathname: url,
            search:searchStr
        })
    }
    handleOptionChange=(options)=>{
       this.callURL("/",options)
       
    }
    makeStr=(options)=>{
        let {type,fuel,sort,minPrice,maxPrice}=options;
        let searchStr='';
        searchStr=this.addToQueryStr(searchStr,'type',type)
        searchStr=this.addToQueryStr(searchStr,'fuel',fuel)
        searchStr=this.addToQueryStr(searchStr,'sort',sort)
        searchStr=this.addToQueryStr(searchStr,'minPrice',minPrice)
        searchStr=this.addToQueryStr(searchStr,'maxPrice',maxPrice)
       console.log(searchStr)
        return searchStr;
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let queryParams=queryString.parse(this.props.location.search)
       queryParams[input.name]=input.value
        this.handleOptionChange(queryParams);
    }
    addToQueryStr=(str,paramName,value)=> (value)? str?`${str}&${paramName}=${value}`:
        `${paramName}=${value}`:str;
    render(){
        const {cars}=this.state
        let queryParams=queryString.parse(this.props.location.search)
        let {minPrice='',maxPrice=''}=queryParams
        return(<div className="container text-center">
            <div className="row">
                <div className="col-2"><CarLeft options={queryParams} onOptionChange={this.handleOptionChange}/></div>
                <div className="col-10">
            <h3>All Cars</h3>
            <div className="row">
                <div className="col-4">Price range</div>
                <div className="col-4"><input type="text" value={minPrice} id="minPrice" name="minPrice" placeholder="min price"
                onChange={this.handleChange}/></div>
                <div className="col-4"><input type="text" value={maxPrice} id="maxPrice" name="maxPrice"placeholder="max price"
                onChange={this.handleChange}/></div>
            </div>
            <br/>
            <div className="row">
            {cars.map((pr)=>{
            return(
                <div className="col-3 bg-warning text-dark border">
                    <h4>{pr.model}</h4>
                    Price:{pr.price}<br/>
                    Color:{pr.color}<br/>
                    Mileage:{pr.kms} kms<br/>
                    Manufectured in {pr.year}<br/>
                    <div className="row">
                        <div className="col-4"><Link to={`/carNew/${pr.id}`}><FontAwesomeIcon icon={faEdit}/></Link></div>
                        <div className="col-4"></div>
                        <div className="col-4"><Link to={`/carDlt/${pr.id}`}><FontAwesomeIcon icon={faTrash}/></Link></div>
                       
                    </div>
                </div>
            )
            })}</div></div>
            </div>
        </div>)
    }
}
export default CarHome;