const {apiSuccess, apiError, apiResult} = require("../utils/apiresult")
const express = require("express")
const router = express.Router()
const db = require("../utils/dbpool")
router.get("",(req,resp)=>{
    // Type ,Diet_Name ,Calories Diet
    db.query("select Type ,Diet_Name ,Calories from  diet",(err ,result)=>{
        if(err){
                return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(result))
    })
})
router .get("/:type",(req,resp)=>{
    db.query("select Type ,Diet_Name ,Calories  from  diet where type=?",[req.params.type],(err,result)=>{
        if(err){
            return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(result))
    })
})
router.get("/vegan/:ans",(req,resp)=>{
    db.query(`SELECT Type, Diet_Name, Calories 
                FROM diet 
                WHERE vegan = ?;`,[req.params.ans],(err,res)=>{
        // Diet_Id | Type  | Diet_Name  | Calories | vegan 
        if(err){
            return resp.send(apiError(err))
        }
        return resp.send(apiSuccess(res))
    })
})
router.get("/particular/:id",(req,resp)=>{
    db.query(`select d.diet_name, d.type, d.calories, d.vegan
                from bmi b
                join category c on b.trainee_id = c.trainee_id
                join diet d on d.type = c.type
                where b.trainee_id = ?;
                `,[req.params.id],(err,result)=>{
                        if(err){
                            resp.send(apiError(err))
                        }else{
                            resp.send(apiSuccess(result))
                        }
                })
})
router.get("/category", (req, resp) => {
    db.query(`INSERT INTO category (Type, Trainee_Id)
    SELECT 
        CASE 
            WHEN bmi.Bmi < 18.5 THEN 'Underweight'
            WHEN bmi.Bmi BETWEEN 18.5 AND 24.9 THEN 'Normal'
            WHEN bmi.Bmi BETWEEN 25.0 AND 29.9 THEN 'Overweight'
            ELSE 'Obese'
        END AS Type,
        bmi.Trainee_Id
    FROM bmi;`, (err, result) => {
        if (err) {
            return resp.send(apiError(err));
        } else {
            return resp.send(apiResult("Data manipulated successfully"));
        }
    });
});

module.exports=router;
