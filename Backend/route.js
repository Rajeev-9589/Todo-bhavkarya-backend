const express = require("express");
const route = express.Router();
const todoSchema = require("./TodoSchema");

route.use(express.json());

route.post("/done", async (req, res) => {
  const { title, note } = req.body;
  if (!title || !note) {
    return res.status(401).json("Fill the all Required Fields");
  }
  const newtodo = new todoSchema({
    Title: title,
    Note: note,
  });
  try {
    const save = await newtodo.save();
    if (save) {
      res.status(200).json('message:"Your Todo Saved Successfully"');
    } else {
      res
        .status(417)
        .json(
          'message:"There is an Problem To saving the todo please try again later'
        );
    }
  } catch (error) {
    res.status(500).json("There is an unexpected Error " + error);
    console.log(error);
  }
});

route.get('/todos',async (req,res)=>{
    const records = await todoSchema.find();
    if(!records){
        res.status(400).json({message:"Nothings is here "})
    }
    else{
        res.status(200).json({records})
    }
})
route.post('/todos/delete',async (req,res)=>{
  const {title} = req.body;
  const records = await todoSchema.findOneAndDelete({Title:title});
  if(!records){
      res.status(400).json({message:"Selected Note does'nt exist"})
  }
  else{
      res.status(200).json({records})
  }
})

route.post('/todos/update',async (req,res)=>{
  const {updatedTitle,updatedNotes,title,note} = req.body;

  const records = await todoSchema.findOneAndUpdate(
    { Title: title, Note: note }, // Query criteria
    { Title: updatedTitle, Note: updatedNotes }, // Update data
  );
  if(!records){
      res.status(400).json({message:"Selected Note does'nt exist"})
  }
  else{
      res.status(200).json({message:"Note has been Updated Successfully"})
  }
})

module.exports = route;
