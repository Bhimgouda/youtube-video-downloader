const express = require("express")
const app = express();
const path = require('path');
const ytdl = require("ytdl-core")
const puppeteer = require("puppeteer")

app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("index");
})

// Using puppeteer headless browser

// app.get("/download",async(req,res)=>{
//     const {url} = req.query;
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.setRequestInterception(true);
//     page.on('request', interceptedRequest => {
//         if(interceptedRequest.url().startsWith("https://rr2")){
//             const ur = interceptedRequest.url().split("&alr=yes&cpn")[0];
//             console.log(ur);
//         }
//         else interceptedRequest.continue();
//     //   if (
//     //     interceptedRequest.url().includes("altitags")
//     //   ){
//     //     console.log("hey");
//     //     return
//     //   }
//     });
  
//     await page.goto(url);
//     browser.close();
// })

app.get("/download",async (req,res)=>{
    const {url} = req.query
    const info = await ytdl.getInfo(url);
    const v_id = url.split('v=')[1];
    return res.render("download",{
        url:`https://www.youtube.com/embed/${v_id}`,
        info: info.formats.sort((a,b)=>{
            return a.mimeType < b.mimeType;
        }).filter(url=>{
            if(url.hasAudio && url.hasVideo) return url;
        })
    })
})

app.get("/playback",(req,res)=>{
    const {url} = req.query;
    res.redirect(url)
})


app.listen(5000,()=>{
    console.log("App listening on port 5000");
})