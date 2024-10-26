// import { rm, copyFile , writeFile , mkdir , rename , chmod , readFile, appendFile  } from 'node:fs';

// writeFile("h1.txt","#hi my name is vishal\n",(err)=>{
//     if(err) console.log(err.message);
//     else console.log("written");
// })

// appendFile("h1.txt","//appended text",(err)=>{
    //     if(err) console.log(err.message);
//     else console.log("appended");
// })

// rm("h1.txt",(err)=>{
//     if(err) console.log("hello");
//     else console.log("removed");
// })

// chmod("h1.txt","777",(err)=>{
//     if(err) throw err;
//     else console.log("changed mode");
// })

// mkdir("./new/files/new3/extra",{recursive : true},(err)=>{
    //     if(err) throw err;
//     else console.log("made a dir");
// })

// rm("new",{recursive:true},(err)=>{
//     if (err) throw err;
//     else console.log("sucessfully : removed a dir \n");
// })

// readFile("h1.txt",'utf8',(err,data)=>{
    //     if(err) throw err;
//     else console.log("read\n",data);
// })

import fs from 'fs';
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

// Set up __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');


app.get("/",(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        if(err)console.log(err.message);
        else console.log(files);
        res.render("index",{files : files});
    })
})

app.post("/",(req,res,next)=>{
    console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.description,(err)=>{
        if(err) console.log(err);
    })
    res.redirect("/");
})

app.get("/edit/:filenames",(req,res)=>{
    res.render("edit",{filename : req.params.filenames});
});

app.post("/edit",(req,res)=>{
    if(fs.existsSync(`./files/${req.body.newname}`)) return res.status(400).send("<script>alert('filename already exists'); window.history.back(); </script>");
    fs.rename(`./files/${req.body.previousname}`,`./files/${req.body.newname}`,(err)=>{
        if(err){
            console.log(err.message);
            return res.status(500).send("Error renaming the file");
        }
    })
    res.redirect("/");
});

app.listen(3000, ()=>{
    console.log("ITS running");
});

// app.use((req,res,next)=>{
//     console.log("functioned");
//     next();
// })

// app.use((req,res,next)=>{
//     console.log("functioned");
//     next();
// })

// app.get('/', function (req, res , next) {
//   return next(new Error("Not implemented"));
// })

// app.get('/home',(req,res)=>{
//     res.send("Home page");
// })

// app.use((err,req,res,next)=>{
//     console.log(new Error("send something"));
//     next();
// })
// app.use((err,req,res,next)=>{
//     console.error(err.stack);
//     next();
//     res.status(500).send("Broken");
// })

// app.listen(3000)