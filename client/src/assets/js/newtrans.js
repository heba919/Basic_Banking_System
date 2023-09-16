import {useState} from 'react';
import Axios from 'axios';
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const btn = document.getElementById("btn");


try{ 
btn.addEventListener("click", () => {
  const from = fromInput.value;
  const to = toInput.value;
  const amount = amountInput.value;
  const date = dateInput.value;
  
  const [d, setData] = useState()


 Axios.get('http://localhost:3002/alltransaction')
        .then((response) => {
          const data = response.data;
          setData((data.length)+1);
      })
    
if (d && from && to && amount &&  date){
  Axios.post("http://localhost:3002/makeTransaction", 
  {
        id: d,
        from: from,
        to: to,
        amount: amount,
        date : date
      
    })
    .then((response) => { 
      console.log(response);
      alert("done");
    }
    ).catch(function (error) {
        console.log(error);
        alert(" not done");
      });

    } 
    else
    {
   console.log("data is empty!!");
   alert(" not done");
    
    };
  
});
}catch (err){
  console.log(err);
   alert(err);
}
