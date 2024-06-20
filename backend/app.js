const express = require('express')
const cors = require('cors')
const multer = require('multer')

const port = 4000
const app = express()

var corsOptions = {
    origin: 'http://localhost:4200/',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))


app.get("/", (req, res) => {
    res.send("welcome to laksdja")
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + " " + file.originalname)
    }
})


const upload = multer({storage});


app.post("/file", upload.single("file"), (req,res) =>{
    const file = req.file;
    if(file){
        res.json(file)
    }else{
        throw new Error("File Upload Unsuccessful")
    }
})

app.post("/multifiles", upload.array("files"), (req,res) =>{
    const files = req.files;
    if(Array.isArray(files) && files.length > 0){
        res.json(files)
    }else{
        throw new Error("Files Upload Unsuccessful")
    }
})


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})