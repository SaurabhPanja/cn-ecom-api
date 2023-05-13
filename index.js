const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get()