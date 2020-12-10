

console.log("client side script is loaded");

  const form=document.querySelector('form');
  const input=document.querySelector('input')
  const m1=document.querySelector('#m1')
  const m2=document.querySelector('#m2')
  form.addEventListener('submit',(e)=>{
      e.preventDefault();
      console.log(input.value)
      m1.textContent="Loading Weather Details ,";
      fetch('http://localhost:3000/weather?address= '+input.value+'').then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            m1.textContent=data.error;
            
        }
        else{
            m1.textContent="Temprature: "+data.tp+". Feels Like: "+data.fl+". Location: "+data.address;
        }
    })
})
  })