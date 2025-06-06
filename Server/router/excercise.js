const {apiSuccess, apiError} = require("../utils/apiresult")
const express = require("express")
//const bcrypt = require("bcrypt")
const router = express.Router()
const db = require("../utils/dbpool")

router.get("",(req,resp)=>{
    // Type   | Exercise_Name   | Body_Type 
    db.query("select Type,Exercise_Name,Body_Type from  exercise",(err ,result)=>{
        if(err){
                return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(result))
    })
})
router .get("/:type",(req,resp)=>{
    
    db.query("select  Type,Exercise_Name,Body_Type from  exercise where type=?",[req.params.type],(err,result)=>{
        if(err){
            return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(result))
    })
})
router.get("/bodytype/:bodyType",(req,resp)=>{
    //example Underweight
    db.query("select  Type,Exercise_Name,Body_Type from  exercise where Body_Type =?",[req.params.bodyType],(err,res)=>{
        if(err){
            return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(res))
    })
})


module.exports=router;
