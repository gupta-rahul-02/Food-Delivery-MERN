import foodModel from "../models/foodModel.js";
import fs from 'fs';


//add food item
const addFood = async(req,res)=>{
    const {name,description,price,category} = req.body;
    let image_filename = `${req.file.filename}`;
    const food  = new foodModel({
        name,
        description,
        price,
        category,
        image:image_filename
    })
    try {
        await food.save();
        res.status(200).json({success:true,message:'Food added'});
    } catch (error) {
        console.log("Error in add food controller",error);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

//all food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});

        if(!foods){
            return res.status(404).json({message:"No food items added"})
        }
        res.status(200).json({success:true,data:foods})
    } catch (error) {
        console.log("Error in listFood controller",error);
        res.status(500).json({message:'Internal server error'})
    }
}

//remove food item
const removeFood = async(req,res) =>{
    try {
        const {id} = req.body;
        const food = await foodModel.findById(id);

        if(!food){
            return res.status(404).json({success:false,message:'Food item not found'})
        }
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Food item removed"})
    } catch (error) {
        console.log("Error in removeFood controller",error)
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

export{addFood,listFood, removeFood}
