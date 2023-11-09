const express = require("express");
const router = express.Router();
const userData = require("../Model/user");
const jwt = require("jsonwebtoken")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
  // console.log(req.body)
 let username = req.body.username;
 let password = req.body.password;
 const user =  await userData.findOne({username: username});
  // console.log(user)
  if(!user){
    res.json({message:"user not found"})
  }
  try{
    if(user.password==password){
      jwt.sign({email:username,id:user._id},"ictak",{expiresIn:"1d"},
      (error,token)=>{
        if (error) {
          res.json({message:"Token not generated"})
          
        } else {
          res.json({message:"login successful",token:token,data:user})
          console.log("token:",token)

        }
      }
      )
    }
    else{
      res.json({message:"login failed"})

    }
  }
  catch(err){
console.log(err)
  }



});

router.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    let item = req.body;
    const newUser = userData(item);
    const saveData = await newUser.save();
    res.json({message:"Registered successful"})
  } catch (error) {
    res.json("Unable to register");
  }
});
  router.get("/viewmyprofile/:id", async (req, res) => {
    console.log("jhdj")
    let id = req.params.id
    try{
    console.log(req.params)
    const item= await userData.find({_id:id})
    res.json(item)
    console.log(item)}
    catch(err){
console.log(err)
    }

  })

module.exports = router;
