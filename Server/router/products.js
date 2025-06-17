const {apiSuccess, apiError, apiResult} = require("../utils/apiresult")
const express = require("express")
//const bcrypt = require("bcrypt")
const router = express.Router()
const db = require("../utils/dbpool")

router.get("/prod/:id",(req,resp)=>{
    db.query(`select p.name, p.type, p.price
                from category c
                join products p on p.type = c.type
                where c.trainee_id = ?;

`,[req.params.id],(err,result)=>{
    if(err){
        return resp.send(apiError(err))
    }else{
        return resp.send(apiResult(result))
    }
})
})

module.exports=router;
