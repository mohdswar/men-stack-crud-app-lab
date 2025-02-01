const dotenv = require("dotenv");
dotenv.config();

require('./config/database');

const express = require("express");
const app = express();

const Cars = require("./models/cars.js");
const methodOverride = require("method-override");
const morgan = require("morgan");


//middleware
app.use(express.urlencoded({ extended: false }));


app.use(methodOverride("_method"));
app.use(morgan("dev"));





//routes


app.get("/", async (req, res) => {
    res.render("index.ejs");
});


app.get("/cars/new", (req, res) => {
    res.render("cars/new.ejs");
});



app.get("/cars", async (req, res) => {
    const allCars = await Cars.find();
    console.log(allCars)
    res.render("cars/index.ejs", { cars: allCars });
});

app.get("/cars/:carsId", async (req, res) => {
    const foundCar = await Cars.findById(req.params.carsId);
    res.render("cars/show.ejs", { cars: foundCar });
});

app.get("/cars/:carsId/edit", async (req, res) => {
    const foundCars = await Cars.findById(req.params.carsId);
    res.render("cars/edit.ejs", {
        cars: foundCars,
    });
});

//CRUD


app.post("/cars", async (req, res) => {
    await Cars.create(req.body);
    res.redirect("/cars");
});


app.delete("/cars/:carsId", async (req, res) => {
    await Cars.findByIdAndDelete(req.params.carsId);
    res.redirect("/cars");
});

app.put("/cars/:carsId", async (req, res) => {
    await Cars.findByIdAndUpdate(req.params.carsId, req.body);

    res.redirect(`/cars/${req.params.carsId}`);
});




app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});