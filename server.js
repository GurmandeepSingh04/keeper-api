import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

var notes = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(`/` , (req,res) => {
    res.send("Hello fucker");
})

app.get(`/api/notes` , (req,res) => {
    console.log(notes);
    res.json(notes);
    
})

app.post(`/api/notes`, (req, res) => {
    const { title, content } = req.body;
    const note = { title, content };
    notes.push(note);
    res.status(201).json({ message: "Note added successfully", note }); // Send a JSON response indicating success
  });

app.delete(`/api/notes/:index` , (req,res) => {
    const index = parseInt(req.params.index,10);
    if(index >= 0 && index <notes.length){
        notes.splice(index,1);
    }else{
        res.status(404);
    }
})

app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})