import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";
//import Models
import "./models/Video";
import "./models/Comment";
import "./models/User";
import "./models/ReplyComment";

dotenv.config();

const PORT = process.env.PORT || 4000;
const handleListening = () =>{
    console.log(`http://localhost:${PORT}`);
}
app.listen(PORT, handleListening);
