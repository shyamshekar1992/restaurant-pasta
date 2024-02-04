import React from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { pastaName } = useParams();
  console.log("pasta details",pastaName)

  // Fetch pasta details using pastaName from your data

  return (
    <div>
      <h2>{pastaName} Details</h2>
      {/* Display other details of the selected pasta */}
    </div>
  );
};

export default DetailPage;
