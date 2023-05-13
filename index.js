const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Product = require("./products")

require("dotenv").config();

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/products", async function(req, res){
  const products = await Product.find({})

  return res.json({products})
})

app.post("/products/create", async function(req, res){

  const product = await Product.create({
    name: req.body.name,
    quantity: req.body.quantity
  })

  return res.json({product})
})

app.delete("/products/:id", async function(req, res){
  await Product.findByIdAndDelete(req.params.id)

  return res.json({
    "message": "product deleted."
  })
})

app.post("/products/:id/update_quantity", async function(req, res){
  await Product.findByIdAndUpdate(req.params.id,
    {
      quantity: req.query.quantity
    })

    return res.json({ message: "Updated Successfully!"})
})

app.listen(3000, ()=>{
  console.log("App is running on port 3000")
})
