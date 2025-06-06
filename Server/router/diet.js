const {apiSuccess, apiError} = require("../utils/apiresult")
const express = require("express")
const router = express.Router()
const db = require("../utils/dbpool")
router.get("",(req,resp)=>{
    // Type ,Diet_Name ,Calories             Diet
    db.query("select Type ,Diet_Name ,Calories from  diet",(err ,result)=>{
        if(err){
                return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(result))
    })
})
router .get("/:type",(req,resp)=>{
    db.query("select   Type ,Diet_Name ,Calories  from  diet where type=?",[req.params.type],(err,result)=>{
        if(err){
            return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(result))
    })
})
router.get("/vegan",(req,resp)=>{
    db.query("select  Type,Exercise_Name,Body_Type from  exercise where Body_Type =?",(err,res)=>{
        if(err){
            return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(res))
    })
})

module.exports=router;
