import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
 }
 

function App() {

  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
      alert("Razorpay SDK failed to load. Are you online?")
      return
    }
    const responseObj = await fetch("http://localhost:5000/checkout", {method: "POST"})
    const paymentResponse = await responseObj.json()
    const {amount, currency, id} = paymentResponse.order
    console.log("amount", amount, "currency", currency, "id", id)


    const options = {
      key: "rzp_test_CoMsResythZEfx", // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://th.bing.com/th/id/OIP.Y832vt01HvoSBcbOCQnAigHaEh?rs=1&pid=ImgDetMain",
      order_id: id, 
      handler:async function(response){
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature)
          alert("signature verified successfully!!!"

    )
      },
      
      theme: {
        color: "#3399cc",
      },
    };

    
    console.log("options", options)
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
 
  }

  const [count, setCount] = useState(0)

  return (
    <div style={{
      // height:"100vh",
      // backgroundColor:"black",color:"white",padding:"250px"
    }}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Razor pay Test</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          <code> Eagerly waiting to see the success</code> 
        </p>
      </div>
      <div className="read-the-docs">
      <h1>Make Payments</h1>
      <div className="card">
       <button onClick={displayRazorpay}>Make Payment</button>
      </div>
      </div>
    </div>
  )
}

export default App
