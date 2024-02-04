// PastaCard.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const PastaCard = ({ pasta, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddClick = () => {
    onAddToCart(pasta, quantity);
  };

  return (
    <Card style={{ width: '300px' }}>
      <CardMedia component="img" alt={pasta.name} height="140" image={pasta.image} />
      <CardContent>
        <Typography variant="h6">{pasta.name}</Typography>
        <Typography variant="body2" color="textSecondary">{pasta.description}</Typography>
        <Typography variant="h6">${pasta.price}</Typography>
        <div>
          <Button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</Button>
          <Typography variant="body1">{quantity}</Typography>
          <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
        </div>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default PastaCard;
