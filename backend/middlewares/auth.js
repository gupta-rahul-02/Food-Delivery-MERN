import jwt from 'jsonwebtoken';

const authMiddleware = async(req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return  res.status(401).json({success:false, message:"Not authorized login again"})
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log("Error in auth middleware",error);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export default authMiddleware;
