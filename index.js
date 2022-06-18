const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const app = express();
const port = 3000;

const path = require('path')
const router = require('./route/route.js')


//home route
const x = app.use('/api',router);

//static view path
app.use(expressLayouts);
app.use('/public', express.static(path.join(__dirname,'static')));
app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    return res.render('index')

})


//server setup running on port 3000
app.listen(port,()=>{
    console.log(`server is running on port:.`);
})