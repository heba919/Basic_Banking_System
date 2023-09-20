import React  from "react";
import { Link, useLocation } from "react-router-dom";

const divStyle = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(https://images.unsplash.com/photo-1607944024060-0450380ddd33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80.com/564x/e8/14/40/e814404504f06eb047b788ec81d115fa.jpg)`,
  backgroundSize: 'cover' 
    
};

const loadScript =  (src) => {
  return new Promise((res) =>{
    const script = document.createElement('script');
    script.src = src ;
    script.onload = ()=>{
      res(true);
    }
    script.onerror= () =>{
      res(false);
    }
      document.body.appendChild(script);
    })
}

export function Home() {

  const displayRazorpay= async() => {
     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) { alert('Razorpay failed')
    return }

		const data = await fetch('http://localhost:3002/razorpay', { method: 'POST' }).then((t) =>
			t.json())

	   	const options = {
      key:"rzp_test_BEDbe8xY9hKINs" ,
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Donation',
			handler: function (response) {
        alert("Thank you !!")
			},
			prefill: {
				name:'Heba ',
				email: 'waledheba91@gmail.com',
	
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()

    
    
   
    
  };

  return (
    <>

  <div className="" style={divStyle}>
        <div className="col-xl-7 p-5">
          <div className="container p-5 m-5 ">
            <h2
              style={{
                color: "#444",
                textAlign: "left",
                fontSize: "35px",
                fontWeight: "600",
                textTransform: "uppercase",
                marginLeft: "60px",
                color:"white"
               
              }}
            >
              Your Convenience Is Our Top Priority.
            </h2>
            <p
              style={{
                fontSize: "15px",
                textAlign: "left",
                marginTop: "20px",
                marginLeft: "60px",
                color:"white"
              }}
            >
              With us, your bank transfers are fast and secure
              
            </p>
            <div
              className=""
              style={{
                textAlign: "left",
                margin: " 50px 60px",
                fontSize: "20px",
              }}
            >
           
              <Link className="btn  btn-outline-info" to="/MakeTrans">
                  Make a Transaction... 
              </Link>

                <button id="pay-button" className="btn  btn-outline-light m-2" onClick={displayRazorpay}
                    target="_blank"
                  
                     >
                Donate 5₹
                </button>
         
            </div>
          </div>
        </div>

    </div>
  
    </>
  );
}