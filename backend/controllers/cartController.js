import userModel from '../models/userModel.js';

//add items in cart
const addToCart = async(req,res) =>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(200).json({success:true,message:"Added to cart"})
    } catch (error) {
        console.log("Error in addToCart controller",error);
        res.status(500).json({success:false,message:'Internal server error'})
    }
}

//remove items from cart
const removeFromCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(200).json({success:true,message:'Removed from cart'})
    } catch (error) {
        console.log("Error in removeCart",error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

//fetch user cart data
const getCart = async(req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.status(200).json({success:true,cartData});
    } catch (error) {
        console.log("Error in getcart controller",error);
        res.status(500).json({success:false,message:'Internal server error'})
    }
}

export{addToCart,removeFromCart,getCart};