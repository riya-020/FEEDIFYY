import React from 'react';
import { useCartState, useCartDispatch } from '../components/ContextReducer';
 // Assuming you have a trash icon in your assets folder
// import Delete from '@mui/icons-material/Delete'; // If MUI installed


export default function Cart() {
  let data = useCartState();
  let dispatch = useCartDispatch();
  
  const handleCheckOut = async () => {
    let userEmail=localStorage.getItem('userEmail')
    let response= await fetch('http://localhost:5000/api/orderData',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            
        },
        body:JSON.stringify({
            order_data:data,
            order_date:new Date().toDateString(),
            email:userEmail
        })


     
    })

    console.log("Order Response",response)
    if(response.status===200){
        dispatch({type:"DROP"})
    }
  };

  if (data.length === 0) {
    return <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>;
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
      <table className='table table-hover'>
        <thead className='text-success fs-4'>
          <tr>
            <th>#</th><th>Name</th><th>Quantity</th><th>Option</th><th>Amount</th><th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td>
                <button className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index: index })}>
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
      <div>
        <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
