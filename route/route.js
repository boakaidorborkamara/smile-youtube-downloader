const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const FileDownload = require('../model/fileModel')
const ytdl = require("ytdl-core");


//const youtubedl = require('youtube-dl-exec');

router.get('/download', async (req, res) => {
    //const fileModel = new FileDownload(url,)
    try {
        const v_id = req.query.url.split('/')[3];
        //const url = req.query.url;
        const _id = await ytdl.getInfo(v_id);
        //const format = ytdl.chooseFormat(v_id.format, {quality: '134'})
        //const info = ytdl(url)


        function convertTi() {
            let rawTime = _id.videoDetails.lengthSeconds;
            let toNum = parseInt(rawTime);
            let toMin = toNum / 60;

            let intMin = parseInt(toMin.toString().split('.')[0]);
            let intSec = Math.round(parseFloat(0 + '.' + toMin.toString().split('.')[1]) * 60);

            return `${intMin}:${intSec}`
        }

                
        return res.send({
            'title': _id.videoDetails.title,
            'playback time': convertTi(),
            'preview_url': "https://www.youtube.com/embed/" + v_id,
            'download': `http://localhost:3000/api/download/file/`+v_id,
        })


    } catch (err) {
        console.log(err)
    }


})

router.get('/download/file/:urlLinkId', (req,res)=>{
    let urlLinkId = req.params.urlLinkId;
    let selectedFormat = req.query.format
    let selectedFormatQuality = req.query.quality
    const randomDate = Date.now()
       
      //console.log(typeof randomDate.toString())
         try{  
           let dw = ytdl('https://youtu.be/'+urlLinkId, Option).pipe( fs.createWriteStream(`${randomDate}.${selectedFormat}`));       
             return  res.send(dw);//res.send(urlLink);   
         }catch(error){
             return res.status(500).send(error)
         }
 
     
    // return  console.log(urlLinkId)
 })


module.exports = router;