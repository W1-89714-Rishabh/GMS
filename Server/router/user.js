const {apiSuccess, apiError} = require("../utils/apiresult")
const express = require("express")
//const bcrypt = require("bcrypt")
const router = express.Router()
const db = require("../utils/dbpool");

//test

router.post("/signup", (req, resp) => {
    const { name, email, password, height, weight, allergies, disability } = req.body;

    db.query(
        "INSERT INTO Trainee (Name, Email, Password, Height, Weight, Allergies, Disability) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, email, password, height, weight, allergies, disability],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return resp.status(500).send(apiError(err));
            }
            if (result.affectedRows === 1) {
                db.query("SELECT * FROM Trainee WHERE name = ?", [name], (err, Result) => {
                    if (err) {
                        console.error("Database error:", err);
                        return resp.status(500).send(apiError(err));
                    }
                    return resp.send(apiSuccess(Result));
                });
                //user
            } else {
                resp.status(400).send(apiError("Signup failed"));
            }
        }
    );
});
router.post("/signin", (req, resp) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM Trainee WHERE email = ?", [email], (err, result) => {
        if (err) {
            return resp.send(apiError(err));
        }
        if (result.length !== 1) {
            return resp.send(apiError("Invalid email or password"));
        }
        const user = result[0];
        if (password == user.password) {
            return resp.send(apiError("Invalid email or password"));
        } else {    
            return resp.send(apiSuccess("You have logged in"));
        }
    });
});
router.get("/:id", (req, resp) => {
    db.query("SELECT * FROM Trainee WHERE Trainee_Id =?", [req.params.id],
        (err, results) => {
            if(err)
                return resp.send(apiError(err))
            if(results.length !== 1)
                return resp.send(apiError("User not found"))
            return resp.send(apiSuccess(results[0]))
        }
    )
});
router.patch("/:id",(req,resp)=>{
    const {weight}=req.body
    db.query("update Trainee set Weight=? where Trainee_Id=?",[weight,req.params.id],(err,result)=>{
        if(err){
            resp.send(apiError(err))
        }
        if(result.affectedRows!==1){
            resp.send(apiError("Trannie not found"))
        }
        resp.send(apiSuccess("Weight updated"))
    })
})
router.post("/bmi/:id",(req,resp)=>{
 db.query("INSERT INTO bmi (Trainee_Id, Bmi) SELECT Trainee_Id, (Weight / (Height * Height)) AS Bmi FROM trainee WHERE Trainee_Id = ?",[req.params.id],(err,result)=>{
    if(err){
        resp.send(apiError(err))
    }
    if(result.affectedRows!==1){
        resp.send(apiError("malfunction"))
    }
    else{
        resp.send(apiSuccess(result))
    }
 })

})

module.exports=router;