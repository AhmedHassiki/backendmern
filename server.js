const express = require("express");
const Products = require('./routes/product')
const User = require('./routes/userRoute')
const Cart = require('./routes/cartRoute')
const Order = require("./routes/orderRoute");
// const cors = require("cors");


const app = express();
require('dotenv').config();
const connectDB = require('./config/connectDB');
connectDB();
// middleware
// const corsOptions = {
//     origin: "https://authentikey.onrender.com/", // frontend URI (ReactJS)
// }
app.use(express.json());
// app.use(cors(corsOptions));
app.use('/api/product', Products);
app.use('/api/auth', User );
app.use('/api/cart', Cart );
app.use('/api/order', Order );
app.use((req,res)=>{
    res.send("API is Running")
})

const PORT = process.env.PORT || 4040;

app.listen(PORT,(err)=>{
    err? console.log(err) : console.log(`server is listening on ${PORT}`)
})


