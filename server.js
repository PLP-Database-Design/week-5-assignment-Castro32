const express = require('express')
const app = express()
require('dotenv').config();
const mysql = require('mysql2');

const PORT =process.env.PORT || 3000;

const db = mysql.createConnection({
    user:process.env.DB_USERNAME,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// get patients endpoint Question 1
app.get('/patients',(req,res)=>{
    db.query('Select patient_id,first_name,last_name,date_of_birth from patients',(err, results)=>{
        if (err) throw err;
        res.json(results);
    });
});

//retieve all providers Question 2
app.get('/providers',(req,res)=>{
    db.query('Select first_name,last_name,provider_speciality from providers',(err,results)=>{
        if (err) throw err;
        res.json(results);
    });
});

//Filter patients by first name QUestion 3
app.get('/patients/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(sql, [firstName], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
//Question 4
app.get('/providers/:provider_speciality',(req,res)=>{
    const providerSpeciality=req.params.provider_speciality;
    const sql='SELECT first_name,last_name,provider_speciality from providers WHERE provider_speciality =? ';
    db.query(sql, [providerSpeciality],(err,results)=>{
        if (err) throw err;
        res.json(results);
    });
});

   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })