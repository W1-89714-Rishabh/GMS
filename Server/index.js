const express=require("express")
const app=express()
const userRouter=require("./router/user")
const productRouter=require("./router/products")
const excerciseRouter=require("./router/excercise")
const dietRouter=require("./router/diet")
app.use(express.json())
app.use("/diet",dietRouter);
app.use("/products",productRouter);
app.use("/excercise",excerciseRouter);
app.use("/user",userRouter);
app.listen(3000,()=>{
    console.log("Server is started at port 3000")
})