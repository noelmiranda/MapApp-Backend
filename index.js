const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());

mongoose
.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
 })
.then(()=> {
    console.log("MongoDB Connected");
})
.catch((err)=> console.log(err))

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/build")))
}

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Backend is running on port ${PORT}`)
})

