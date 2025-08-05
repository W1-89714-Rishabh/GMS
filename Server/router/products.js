const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();

router.get("/prod/:id", (req, resp) => {
    db.query(
        `SELECT p.name, p.type, p.price
         FROM category c
         JOIN products p ON p.type = c.type
         WHERE c.trainee_id = ?;`,
        [req.params.id],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.length === 0) return resp.send(apiError("No products found"));
            return resp.send(apiSuccess(result));
        }
    );
});

router.get("/find/:id", (req, resp) => {
    db.query(
        "SELECT * FROM products WHERE id = ?",
        [req.params.id],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.length !== 1) return resp.send(apiError("Product not found"));
            return resp.send(apiSuccess(result[0]));
        }
    );
});

router.patch("/edit/:id", (req, resp) => {
    const { name, type, price } = req.body;
    db.query(
        "UPDATE products SET name = ?, type = ?, price = ? WHERE id = ?",
        [name, type, price, req.params.id],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.affectedRows !== 1) return resp.send(apiError("Update failed"));
            return resp.send(apiSuccess("Product updated successfully"));
        }
    );
});

router.get("/bmi/:id", (req, resp) => {
    db.query(
        `SELECT p.name, p.type, p.price
         FROM bmi b
         JOIN category c ON b.trainee_id = c.trainee_id
         JOIN products p ON p.type = c.type
         WHERE b.trainee_id = ?`,
        [req.params.id],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            return resp.send(apiSuccess(result));
        }
    );
});

router.get("/search/:name", (req, resp) => {
    db.query(
        "SELECT * FROM products WHERE name LIKE ?",
        [`%${req.params.name}%`],
        (err, result) => {
            if (err) return resp.send(apiError(err));
            if (result.length === 0) return resp.send(apiError("No matching products found"));
            return resp.send(apiSuccess(result));
        }
    );
});

module.exports = router;