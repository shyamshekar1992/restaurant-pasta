import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Tab, Tabs } from '@mui/material';
import PastaCard from './PastaCard';
import DetailPage from './DetailPage';
import pastaData from './pasta.json';
import saladData from './salat.json';
import Cart from './Cart';
const App = () => {
  const [value, setValue] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // App.js
  const handleAddToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((existingItem) => existingItem.name === item.name);

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        // If the item is not in the cart, add it with the specified quantity
        const newCartItems = [...prevItems, { ...item, quantity }];
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return newCartItems;
      }
    });
  };



const handleRemoveFromCart = (index) => {
  setCartItems((prevItems) => {
    const updatedItems = [...prevItems];

    if (updatedItems[index].quantity > 1) {
      // If the item quantity is greater than 1, decrement the quantity
      updatedItems[index].quantity -= 1;
    } else {
      // If the item quantity is 1, remove the item from the cart
      updatedItems.splice(index, 1);
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    return updatedItems;
  });
};

  return (
    <Router>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Veg Pasta" />
          <Tab label="Non-Veg Pasta" />
          <Tab label="Salad Menu" />
        </Tabs>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home
                pastaData={pastaData}
                saladData={saladData}
                value={value}
                onAddToCart={handleAddToCart}
              />
              <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

const Home = ({ pastaData, saladData, value, onAddToCart }) => {
  let filteredItems = [];

  if (value === 0) {
    filteredItems = pastaData.pastaList.filter((pasta) => pasta.type === 'veg');
  } else if (value === 1) {
    filteredItems = pastaData.nonVegPastaList;
  } else if (value === 2) {
    filteredItems = saladData.saladList; // Update the property name based on your salad.json structure
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
      {filteredItems.map((item) => (
        <PastaCard
          key={item.name}
          pasta={item}
          onAddToCart={(item, quantity) => onAddToCart(item, quantity)}
        />
      ))}
    </div>
  );
};

export default App;
