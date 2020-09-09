const express = require("express");

// db is the connection to the database
const db = require("../data/connection.js");

const router = express.Router();

router.get("/", (req, res) => {
    // select * from fruits
    // db.select('*').from('fruits') <-- returns a promise
    db.select("*")
        .from("cars")
        .then(car => {
            res.status(200).json({ data: car });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

router.get("/:id", (req, res) => {
    db("cars")
        // .where({ id: req.params.id })
        .where("id", "=", req.params.id)
        .then(car => {
            res.status(200).json({ data: car });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

router.post("/", (req, res) => {
    const carData = req.body; // validate the data before calling the database code

    // insert into fruits (name, avgWeightOz, delicious)
    // values ('mango', 7.5, true)
    // there will be a warning about unsupported returning when using sqlite, \
    // ignore it!
    db("cars")
        .insert(carData)
        .returning("id") // to make it work with postgres as well as sqlite
        .then(ids => {
            res.status(200).json({ data: ids });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

router.delete("/:id", (req, res) => {
    db("cars")
        // .where({ id: req.params.id })
        .where("id", "=", req.params.id) // DON'T FORGET THE WHERE!!!!!!!!!!!!!!!
        .del()
        .then(count => {
            res.status(200).json({ data: count });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

router.put("/:id", (req, res) => {
    const changes = req.body;

    db("cars")
        // .where({ id: req.params.id })
        .where("id", "=", req.params.id) // DON'T FORGET THE WHERE!!!!!!!!!!!!!!!
        .update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: "record not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

module.exports = router;
