const path=require('path')
const express=require('express');
const request=require('request');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const hbs=require('hbs')
const app=express();
const port=process.env.PORT || 3000;
console.log(path.join(__dirname,'../public'));
app.set('views',path.join(__dirname,"../templates/views"))
app.set('view engine','hbs')
app.use(express.static( path.join(__dirname,'../public')));
hbs.registerPartials(path.join(__dirname,"../templates/partials"))

app.get('',(req,res)=>{
   res.render('index',{name:'prem panwala',title:'Weather Page'})
})
app.get('/weather',(req,res)=>{
    console.log(req.query.address)
    if(req.query.address)
    {
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error)
            {
              return res.send(error);
            }
              forecast(latitude,longitude, (error, {wd,tp,fl,hu,ws}={}) => {
                if(error)
                {
                  return res.send(error);
                }
                res.send({
                    wd:wd,
                    tp:tp,
                    fl:fl,
                    address:req.query.address,
                    hu:hu,
                    ws:ws,
                })
                // console.log(location);
                // console.log(wd,".",tp,".",fl);
              })
          
          })
        // res.send({
        //     tp:40,
        //     wd:'sunny clear',
        //     location:req.query.address,
        // })
    }
    else{
        res.send({
            error:'you must provide location'
        })
    }
})

app.get('/help',(req,res)=>{
    res.render('help',{name:'prem panwala',title:'help page'})
 })
 app.get('/help/*',(req,res)=>{
    res.render('error',{msg:'help page not found',name:'prem panwala'})
})
app.get('*',(req,res)=>{
    res.render('error',{msg:' page not found',name:'prem panwala'})
})

app.listen(port,()=>{
    console.log("Server Started Succesfully on !!"+port);
})