/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Yonghun Won Student ID: 124331224 Date: Oct 25th, 2023
*
********************************************************************************/


const legoData = require("./modules/legoSets");
const express = require('express'); 
const app = express(); 
const HTTP_PORT = process.env.PORT || 8080; 
const path = require("path");


app.set('view engine', 'ejs');
app.use(express.static('public')); 

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, "/views/home.html"))
    res.render("home");
});

app.get('/about', (req, res) => {
    //res.sendFile(path.join(__dirname, "/views/about.html"))
    res.render("about");
});


app.get('/lego/sets', (req, res) => {
    if(req.query.theme){
        legoData.getSetsByTheme(req.query.theme).then((legoSets=>{
            //res.json(legoSet);
            res.render("sets", {sets: legoSets});
        })).catch(err=>{
            //res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
            res.status(404).render('404', { message: 'Error 404 : Page Not Found' });
        });
    }
    else{
        legoData.getAllSets().then((legoSets=>{
            //res.json(legoSet);
            res.render("sets", {sets: legoSets});
        })).catch(err=>{
            //res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
            res.status(404).render('404', { message: 'Error 404 : Page Not Found' });
        });
    }
    
});

app.get('/lego/sets/:set_num', (req, res) => {
    legoData.getSetByNum(req.params.set_num).then((legoSet=>{
        //res.json(legoSet);
        res.render("set", {set: legoSet});
    })).catch(err=>{
        //res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
        res.status(404).render('404', { message: 'Error 404 : Page Not Found' });

    });
});


app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
    res.status(404).render('404', { message: 'Error 404 : Page Not Found' });
});

legoData.initialize().then(()=>{
    app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
}).catch((err)=>{
    console.log(err);
})
