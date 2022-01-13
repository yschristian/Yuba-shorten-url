const express =require('express');
const router=express.Router();
const Urls  =require('../models/Urls');

router.get('/:code',async(res,req)=>{
 try {
        let  url =  await Urls.findOne({urlCode:req.params.code});
     
        if(url){
            return res.redirect(url.longUrl);
        }else{
            return res.status(404).json('no url found');
        }
 } catch (error) {
     console.log(error);
     res.status(500).json('server error');
 }

})
module.exports = router;