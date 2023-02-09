require("dotenv").config()
const express = require("express")
const app = express();
const path = require('path');
const ytdl = require("ytdl-core")

const PORT = process.env.PORT

// ---------------------- Middlewares -----------------//

app.use(express.static(path.join(__dirname,"public")))
app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'));

// ---------------------- Routes ---------------------//

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/download",async (req,res)=>{
    const {url} = req.query
    if(url.startsWith("https://www.youtube.com/watch?v=")){
        const info = await ytdl.getInfo(url);
        const v_id = url.split('v=')[1];
        return res.render("download",{
            url:`https://www.youtube.com/embed/${v_id}`,
            info: info.formats.filter(url=>{
                if(url.hasAudio) return url;
            })
        })
    }

    res.redirect("/")
})

app.get("/playback",(req,res)=>{
    const {url} = req.query;
    res.redirect(url)
})

//------------------ SERVER -------------------------//

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
})