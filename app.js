const express = require('express');
const path =require('path');
const app = express();
require('dotenv').config();
const port = 3000;


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-06-24&sortBy=publishedAt&apiKey=${process.env.KEY}`;
console.log(process.env.KEY);
app.get("/", (req, res) => {
    fetch(url)
        .then((result) => result.json())
        .then((data) => {
           
            res.render('home', { data: data });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/",(req,res)=>{
    let { type } =req.body;
    const url = new URL(`https://newsapi.org/v2/everything?q=tesla&from=2024-06-24&sortBy=publishedAt&apiKey=${process.env.KEY}`);
    
    // Set the 'q' parameter to the value from the request body
    url.searchParams.set('q', type);
    
    /* res.send(url.toString()); */
    url.toString();
    fetch(url)
    .then((result) => result.json())
    .then((data) => {
       
        res.render('home', { data: data });
    })
    .catch((err) => {
        console.log(err);
    });
    
    
})
app.get("*",(req,res)=>{
res.send("page not found");
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})