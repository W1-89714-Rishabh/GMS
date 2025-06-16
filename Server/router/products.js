const {apiSuccess, apiError, apiResult} = require("../utils/apiresult")
const express = require("express")
//const bcrypt = require("bcrypt")
const router = express.Router()
const db = require("../utils/dbpool")

router.get("/products/:id",(req,resp)=>{
    db.query(`SELECT p.Product_Name, p.Category, p.Price 
                FROM Category c
                JOIN Products p ON p.Type = c.Type
                WHERE c.Trainee_Id = ?;
`,[req.params.id],(err,result)=>{
    if(err){
        return resp.send(apiError(err))
    }else{
        return resp.send(apiResult(result))
    }
})
})

module.exports=router;
