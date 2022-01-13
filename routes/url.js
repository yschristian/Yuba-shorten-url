const express = require('express');
const router=express.Router();
const validUrl =   require('valid-url');
const shortid=  require('shortid');
const config =  require('config');

const Urls =require('../models/Urls');

//@route  POST  /api/url/shorten
//@desc   create short  url

router.post('shorten',  async(req,res)=>{
    const{longUrl} = req.body;
    const baseUrl=config.get('baseUrl');
  
    //check base  url
    if(!validUrl.isUri(baseUrl)){
      
        return res.status(401).json('Invalid base url');
     
    }

    //create url code
    const urlCode=shortid.generate();
     //check long url
     if(validUrl.isUri(longUrl)){
         try {
            let url = await Urls.findOne({longUrl});
              if(url){
                res.json(url)
              }else{
                const shortUrl= baseUrl + '/' + urlCode;

                  url=new Urls({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date:new Date(),

                });
                await url.save();
                res.json(url)
              }
         } catch (error) {
             console.log('error');
             res.status(500).json('Server error');
         }

     }else{
              res.status(401).json('invalid long url');
     }
})
module.exports=router;