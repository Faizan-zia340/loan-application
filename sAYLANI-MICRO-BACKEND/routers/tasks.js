import express from 'express'

const routers=express.Router();
import Task from './models/task.js'; // Make sure the path is correct

import sendRespond from './helpers/sendRespond.js';

 
routers.post("/", async (req,res)=>{
    const {task}=(req.body);
  let newTask =new Task({task});
newTask=await newTask.save();  
sendRespond(res,201,newTask,true,"Task added successfully");
});

routers.get("/", async (req,res)=>{
    let  task=await Task.find() ;
 


sendRespond(res,201,true,"Task created successfully",);
});


routers.get("/:id", async (req,res)=>{
  const task = await Task.findById(req.params.id) ;
  if(!task)
   { sendRespond(res, 404, false, "Task not found")};
  
sendRespond(res,201,true,"Task fetched successfully");
});


routers.put("/:id", async (req, res)=>{
    const {completed,task}=req.body;
   const taskFromDB = await Task.findById(req.params.id) ;
   if (!taskFromDB) return sendRespond(res, 404, false, "Task not found");
 
   if (task) taskFromDB.task = task;
   if (completed) taskFromDB.completed = completed;
   await taskFromDB.save();
 sendRespond(res, 200, false, "Task updated successfully");
}); 

routers.delete("/:id", async (req, res)=>{
  const {completed,task}=req.body;
 const taskFromDB = await Task.findById(req.params.id) ;
 if (!taskFromDB) return sendRespond(res, 404, false, "Task not found");

await taskFromDB.deleteOne({_id: req.params.id});
sendRespond(res, 200,null, false, "Task deleted successfully");
});


export default routers;