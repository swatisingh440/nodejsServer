import React,{Component} from "react";
import http from "./httpserver"
class CarNew extends Component{
    state={
        car:{},
        edit:false,
        carMaster:[],
        models:["Swift Dzire VXi","Etios SMi","City AXi","Swift DXi","Etios VXi", "City ZXi"],
    }
    async fetchData(){
        const {id}=this.props.match.params;
        console.log(id)
        let response=await http.get("/carMaster")
        let {data}=response
        this.setState({carMaster:data})
        if(id){
            let response1=await http.get(`/cars/${id}`);
            let {data}=response1;
            console.log(data)
            this.setState({car:data[0],edit:true})
            
        }
        else{
           let  car={id:'',price:'',year:'',kms:'',model:'',color:''} ;
           this.setState({car:car,edit:false})
        }
    }
    async componentDidMount(){
        this.fetchData()
    }
    async componentDidUpdate(prevProps,prevState){
        if(prevProps!=this.props)
        this.fetchData()
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let s1={...this.state};
        s1.car[input.name]=input.value;
        this.setState(s1);
    }
    async postData(url,obj){
        let response=await http.post(url,obj)
        console.log(response)
        this.props.history.push("/");
    }
    async putData(url,obj){
        let response=await http.put(url,obj)
        console.log(response)
        this.props.history.push("/");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let {car,edit}=this.state;
        edit?this.putData(`/cars/${car.id}`,car):
        this.postData("/cars",car)
    }

    makeDropDown=(arr=[],value,name,label)=>{
        return(
            <div className='form-group'>
                <label>{label}</label>
                <select className='form-control'
                name={name}
                value={value} onChange={this.handleChange}>
                    <option value="">{label}</option>
                    {arr.map((opt)=><option>{opt}</option>)}
                </select>
            </div>
        )
    }
    render(){
        let {car}=this.state;
        const {id='',price='',year='',kms='',model='',color=''}=this.state.car
        const {carMaster,models}=this.state
        console.log(carMaster,car,id)
        let arr=carMaster.find((t1)=>t1.model===model)
        let colors=[]
        if(arr){
        colors=arr.colors}
     
        return(
            <div className="container">
                <h3 className="text-center">Car Details</h3>
                <div className='form-group'>
                    <label>Car ID</label>
                    <input type="text" className='form-control'
                    id="id" name="id" placeholder='Enter Id'
                    value={id} onChange={this.handleChange}/>
                </div>
                <div className='form-group'>
                    <label>Price</label>
                    <input type="text" className='form-control'
                    id="price" name="price" placeholder='Enter Price'
                    value={price} onChange={this.handleChange}/>
                </div>
                <div className='form-group'>
                    <label>Mileage in Kms</label>
                    <input type="text" className='form-control'
                    id="kms" name="kms" placeholder='Enter Mileage'
                    value={kms} onChange={this.handleChange}/>
                </div>
                <div className='form-group'>
                    <label>Year of Manufactured</label>
                    <input type="text" className='form-control'
                    id="year" name="year" placeholder='Enter year'
                    value={year} onChange={this.handleChange}/>
                </div>
                <div className="row">
                    
                <div className="col-6">{this.makeDropDown(models,model,'model','Model')}</div>
                <div className="col-6">{this.makeDropDown(colors,color,'color','Color')}</div>
                </div>
                <button className="btn btn-primary m-2" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}
export default CarNew;