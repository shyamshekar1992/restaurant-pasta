// Cart.js
import React from 'react';
import { Button, Typography } from '@mui/material';
import { ElementsConsumer, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Total: ${item.price * item.quantity}</p>
          <Button onClick={() => onRemoveFromCart(index)}>Remove</Button>
        </div>
      ))}
      <hr />
      <Typography variant="h6">Total Amount: ${calculateTotalPrice()}</Typography>
    </div>
  );
};

export default Cart;
