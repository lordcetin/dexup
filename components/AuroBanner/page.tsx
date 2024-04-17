/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";

type Props = {

};

const AuroBanner = ({}: Props) => {


  return (
    <div className="flex justify-center items-center w-full h-56 object-cover rounded-t-xl overflow-hidden">
    <BackgroundGradientAnimation/>
    </div>
);
};

export default AuroBanner;


// import React, { useState, useEffect } from 'react';

// const ImageColorPalette = ({ imageUrl }) => {
//   const [palette, setPalette] = useState([]);

//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = 'anonymous';  // CORS için gerekli
//     img.src = imageUrl;
//     img.onload = () => {
//       const palette = extractPalette(img);
//       setPalette(palette);
//     };
//   }, [imageUrl]);

//   const extractPalette = (image) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = image.width;
//     canvas.height = image.height;
//     ctx.drawImage(image, 0, 0, image.width, image.height);

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     return getPaletteFromImageData(imageData);
//   };

//   const getPaletteFromImageData = (imageData) => {
//     const colorCounts = {};
//     const data = imageData.data;

//     for (let i = 0; i < data.length; i += 4) {
//       const color = `${data[i]},${data[i + 1]},${data[i + 2]}`;
//       colorCounts[color] = (colorCounts[color] || 0) + 1;
//     }

//     // Sıklığa göre renkleri sıralayıp en sık kullanılanları al
//     const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
//     return sortedColors.slice(0, 5);  // En sık kullanılan 5 rengi al
//   };

//   return (
//     <div>
//       <h2>Color Palette</h2>
//       <ul>
//         {palette.map((color, index) => (
//           <li key={index} style={{ backgroundColor: `rgb(${color})`, padding: '10px', color: 'white' }}>
//             rgb({color})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ImageColorPalette;
