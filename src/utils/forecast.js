const request=require('request'); 

const forecast=(a,b,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=94e01333334b811a4e9e52e8721ebb37&query='+a+','+b+'&units=f'
request({url:url,json:true},(error,response)=>{
   if(error)
   {
       callback('lodo le',undefined);
   }else if(response.body.error)
   {
    callback('lodo le',undefined);
   }
   else{
       const ans={wd:response.body.current.weather_descriptions[0],
        tp:response.body.current.temperature,
        fl:response.body.current.feelslike,
        hu:response.body.current.humidity,
        ws:response.body.current.wind_speed,
        };
    callback(undefined,ans)
   }

})
}
module.exports=forecast;