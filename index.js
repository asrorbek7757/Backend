const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express()
app.use(express.json())

app.use(cors())

async function connectToDB() {
    await connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB is connect"))
        .catch(() => console.log("MongoDB is not connect"))
}
connectToDB()

app.get('/', (req, res) => {
    res.json("Hi NODE JS!")
})

//-----------Router-------------
const {cars} = require('./router/cars')

app.use('/cars', cars)
console.log(cars);


//---------PORT----------
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server http://localhost:${PORT} portda ishga tushdi`);
})