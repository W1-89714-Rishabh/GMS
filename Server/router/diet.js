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
router.get("/diet/:id",(req,resp)=>{
    db.query(`SELECT d.Diet_Name, d.Type, d.Calories, d.Vegan 
                FROM BMI b
                JOIN Category c ON b.Trainee_Id = c.Trainee_Id
                JOIN Diet d ON d.Type = c.Type
                WHERE b.Trainee_Id = ?;
                `,[req.params.id],(err,result)=>{
                        if(err){
                            resp.send(apiError(err))
                        }else{
                            resp.send(apiSuccess(result))
                        }
                })
})

module.exports=router;
