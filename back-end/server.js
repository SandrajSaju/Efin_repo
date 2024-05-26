const express = require("express")
const app = express()
const cors = require("cors");
require("dotenv").config()
const PORT = process.env.PORT
const connectDB = require('./config/connect')

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const bookRoutes = require("./routes/bookRoutes")


app.use("/book",bookRoutes)
app.use("/pen",bookRoutes)

app.get("/", (req, res) => {
    res.send("Sever is Running");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((e) => {
    console.log('cannot connect to the network', e.message);
  })