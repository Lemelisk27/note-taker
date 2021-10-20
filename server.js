const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const htmlRoutes = require("./routes/htmlRoutes.js")
const noteRoutes = require("./routes/noteRoutes.js")

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(htmlRoutes)
app.use("/api/notes", noteRoutes)

app.listen(PORT,()=>{
    console.log(`listening to http://localhost:${PORT}`)
})