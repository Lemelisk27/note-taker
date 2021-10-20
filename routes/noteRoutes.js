const express = require("express");
const router = express.Router();
const path = require("path")
const fs = require("fs");

const notes = require("../db/db.json")

router.get("/",(req,res)=>{
    res.json(notes)
})

router.get("/:id",(req,res)=>{
    for (let i = 0; i < notes.length; i++) {
        if(notes[i].id==req.params.id){
            return res.json(notes[i])
        }
    }
    res.status(404).send("No Note Found")
})

router.post("/",(req,res)=>{
    notes.push(req.body);
    fs.writeFileSync("./db/db.json",JSON.stringify(notes,null,4))
    console.log("Note Written")
    res.json({message:"Data Received"})
})

router.delete("/:id",(req,res)=>{
    const noteIndex = getNoteIndex(req.params.id)
    if (noteIndex === undefined || noteIndex < 0){
        return res.status(404).json({message:"No Note Found"})
    }
    if (noteIndex >= 0) {
        notes.splice(noteIndex, 1)
        fs.writeFileSync("./db/db.json",JSON.stringify(notes,null,4))
        console.log("Note Deleted")
        res.json({message:"Data Deleted"})
    }
})

function getNoteIndex(id) {
    for (let i = 0; i < notes.length; i++) {
        if(notes[i].id==id){
            return i
        }
    }
}

module.exports = router;