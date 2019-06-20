const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Staff = require("./models/staff");
const Appointment = require("./models/appointment");

const app = express();

mongoose
  .connect(
    "mongodb+srv://sunimali:jayabima@1@cluster0-iredr.mongodb.net/service-centre?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/api/staff", (req, res, next) => {
  const staff = new Staff({
    name: req.body.name,
    mobile: req.body.mobile,
    salary: req.body.salary,
    rate: req.body.rate,
    free:req.body.free
  });
  staff.save().then(createdStaff => {
    res.status(201).json({
      message: "Staff added successfully",
      staffId: createdStaff._id
    });
  });
  console.log(staff.name);
});

app.post("/api/payment", (req, res, next) => {
  const payment = new Payment({

    appid:req.body.name ,
    packageid: req.body.name,
    oil: req.body.name,
    airfiltering: req.body.name,
    additional: req.body.name,
    total: req.body.name
  
  });
  payment.save().then(createdPayment => {
    res.status(201).json({
      message: "payment added successfully",
      payid: createdPayment._id
    });
  });
  console.log(payment.name);
});

app.put("/api/appointment/:id", (req, res, next) => {
  const app = new Appointment({
    _id: req.body.id,
    owner: req.body.owner,
    date: req.body.date,
    time: req.body.time,
    package: req.body.package,
    staffid: req.body.staffId,
    accepted: req.body.accepted
  });
  Appointment.updateOne({ _id: req.params.id }, app).then(result => {
    res.status(200).json({ message: "assign staff member successful!" });
  });
});

app.put("/api/staff/:id", (req, res, next) => {
  const staff = new Staff({
    _id: req.body.id,
    name: req.body.name,
    mobile: req.body.mobile,
    salary: req.body.salary,
    rate: req.body.rate,
    free: req.body.free
  });
  Staff.updateOne({ _id: req.params.id }, staff).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

app.get("/api/staff", (req, res, next) => {
  Staff.find().then(documents => {
    res.status(200).json({
      message: "Staff fetched successfully!",
      staff: documents
    });
  });
});

app.delete("/api/staff/:id", (req, res, next) => {
  console.log(req.params.id);
  Staff.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "staff member deleted!" });
  });
});

app.delete("/api/appointment/:id", (req, res, next) => {
  console.log(req.params.id);
  Appointment.deleteOne({ _id: req.params.id }).then(result => {
    console.log(req.params.id);
    res.status(200).json({ message: "appointment is declined!" });
  });
});

app.get("/api/appointment", (req, res, next) => {
  console.log("appointment");
  Appointment.find().then(documents => {
    res.status(200).json({
      message: "appointments fetched successfully!",
      appointments: documents
    });
    console.log(documents);
  });
 
});


module.exports = app;
