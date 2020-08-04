const formInput = document.querySelector('form');
const inputValue = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const submission = formInput.addEventListener('submit',(e)=>{
    e.preventDefault();
    const search = inputValue.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address='+search).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error; 
        }else{
            messageOne.textContent = 'Location: '+data.location;
            messageTwo.textContent = 'Forecast: '+data.forecast;
        }
    });
});
});