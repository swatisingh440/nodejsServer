let express=require('express');
let app=express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next();
});
var port=process.env.PORT||2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));
  

let {carMaster,cars}=require("./carData.js")
app.get("/carMaster",function(req,res){
    res.send(carMaster)
})
app.get("/cars",function(req,res){
    let type=req.query.type
    let fuel=req.query.fuel
    let sort=req.query.sort
    let minPrice=req.query.minPrice
     let maxPrice=req.query.maxPrice
     let arr1=cars
     if(type){
        arr1=arr1.filter((pr)=>{
            let ind=carMaster.find((pt)=>pt.model===pr.model&&pt.type===type)
            if(ind) {return true}
            else{
                return false
            }
        })
        console.log(arr1)
     }
     if(fuel){
        arr1=arr1.filter((pr)=>{let ind=carMaster.find((pt)=>pt.model===pr.model&&pt.fuel===fuel)
        if(ind) {return true}
        else{
            return false
     }})
     }
     if(minPrice){
        arr1=arr1.filter((pr)=>pr.price>=minPrice)
     }
     if(maxPrice){
        arr1=arr1.filter((pr)=>pr.price<=maxPrice)
     }
     if(sort==='year'){
        arr1.sort((n1,n2)=>n1.year-n2.year)
     }
     if(sort==='kms'){
        arr1.sort((n1,n2)=>n1.kms-n2.kms)
     }
     if(sort==='price'){
        arr1.sort((n1,n2)=>n1.price-n2.price)
     }

    res.send(arr1)
})
app.get("/cars/:id",function(req,res){
    let id=req.params.id;
    const arr1=cars.filter((pr)=>pr.id===id)
    res.send(arr1)
})
app.post("/cars",function(req,res){
    let body=req.body;
    
    let maxid=cars.reduce((acc,curr)=>curr.id>=acc?curr.id:acc,0);
    let newid=maxid+1
    let newCar={id:newid ,...body};
    cars.push(newCar);
    res.send(cars)

})
app.put("/cars/:id",function(req,res){
    let id=req.params.id;
    let body=req.body;
    let index=cars.findIndex((st)=>st.id===id);
    if(index>=0){
    let updatedStudent={id:id,...body}
    cars[index]=updatedStudent
    res.send(updatedStudent)}
    else
    res.status(404).send("No student found")
})
app.delete("/cars/:id",function(req,res){
    let id=req.params.id;
    let index=cars.findIndex((st)=>st.id===id);
    console.log(index)
    if(index>=0){
    let deletedStudent=cars.splice(index,1);
    console.log(deletedStudent)
    res.send(deletedStudent)}
    else
    res.status(404).send("No student found")
})