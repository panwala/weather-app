const request=require('request');
const geocode=(address,callback)=>{
const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHJlbTAxMzEiLCJhIjoiY2tpN2wzbzl2MGFzdjJzbzN1OHlsMHI0ayJ9.9VBmBbX1ZlRxrFg9k6sD-A&limits=1'
request({url:geourl,json:true},(error,response)=>{
    if(error)
    {
        callback('unable to connect to weather services',undefined)
    }
    else if(response.body.features.length===0)
    {
        callback('please check your location',undefined)
    }
    else{
    callback(undefined,{
        latitude:response.body.features[0].center[1],
        longitude:response.body.features[0].center[0],
        location:response.body.features[0].place_name
    })
    }
})
}
module.exports=geocode;
