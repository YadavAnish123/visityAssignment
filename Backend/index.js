const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())

let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 5000
const mongoose = require('mongoose'); 
mongoose.set("strictQuery", false);
const url="mongodb://localhost:27017/visity"
const mongooseConnected=mongoose.connect(url);
 
const userSchema=mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Mobile:{
        type:Number,
        require:true
    }
})
let User=mongoose.model('User',userSchema)
app.post('/insertUser', async (req, res) => {
    try{
        const Data=await User.create({
            Name:req.body.Name,
            Email:req.body.Email,
            Mobile:req.body.Mobile
        })
       await Data.save();
        res.status(200).json({
            status:true,
            data:Data
        })
    }catch(e){
        res.status(404).json({
            status:false,
            message:e.message,
            data:{}
        })
    }
    
    
})
app.put('/edit',async(req,res)=>{
    const{_id,Name,Email,Mobile}=req.body
    try{
        if(Name)
        {
            await User.findByIdAndUpdate(_id,{Name:Name})
        }
        if(Email)
        {
            await User.findByIdAndUpdate(_id,{Email:Email})
        }
        if(Mobile)
        {
            await User.findByIdAndUpdate(_id,{Mobile:Mobile})
        }
        let user=await User.findById(_id)
        res.status(200).json({
            status:true,
            message:"updated",
            data:user
        })
    }catch(e)
    {
        res.status(402).json({
            status:false,
            message:e.message,
            data:[]
        })
    }
})
app.delete("/delete/:_id",async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params._id)
        res.status(200).json({
            status:true,
            message:"deleted",
            
        })
    }catch(e){
        res.status(402).json({
            status:false,
            message:e.message,
            data:[]
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})