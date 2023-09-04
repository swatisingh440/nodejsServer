import React,{Component} from 'react';
class CarLeft extends Component{
    state={
        fluels:['Diesel','Petrol'],
        types:['Hatchback','Sedan'],
        sorts:['kms','price','year']
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let options={...this.props.options}
       options[input.name]=input.value
        this.props.onOptionChange(options);
    }
    makeRadio=(arr,label,value,name)=>{
        return(<div className='container border'><label className="form-check-label text-dark ">{label}</label>
         {arr.map((pr)=>{
             return( <div className="form-check form-check ">
             <input className="form-check-input"
             type="radio" name={name} value={pr}
             checked={value===pr}
             onChange={this.handleChange}/>
             <label className="form-check-label">{pr}</label><br/>
         </div>)
         })}</div>)
     }
    render(){
        const {fluels,types,sorts}=this.state
        let {fuel='',type='',sort=''}=this.props.options
        return(
            <div className='container'>
                {this.makeRadio(fluels,'Fuel',fuel,'fuel')}
                {this.makeRadio(types,'Type',type,'type')}
                {this.makeRadio(sorts,'Sort',sort,'sort')}
            </div>
        )
    }
}
export default CarLeft