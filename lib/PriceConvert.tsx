import React from "react";

type Props = {
  amount:any
};

function PriceConvert({amount}: Props) {
  const formatted = new Intl.NumberFormat("en-US",{
    style:"currency",
    currency: "USD",
    notation: 'compact',
    compactDisplay: 'short'
  }).format(amount)

  const significantZeros = String(amount).includes('e') 
  ? parseInt(String(amount).split('e-')[1], 10) 
  : String(amount).split('.')[1]?.length || 0;

  const expNotation = parseFloat(amount).toExponential().split('e-');
  const significantDigits = expNotation[0];
  const zeros = expNotation.length > 1 ? parseInt(expNotation[1], 10) - 1 : 0; // -1 çünkü baştaki 0. şeklini hesaba katıyoruz

  // Son iki önemli rakamı al
  let lastTwoDigits = significantDigits.replace('.', '').padEnd(3, '0').slice(0, 2); // '.' kaldır, 3 karaktere tamamla, ilk iki karakteri al
  
  return <div className="flex justify-center items-center">{significantZeros < 18 ? formatted : <span className='cursor-pointer relative'>${`0.00`}<small className='relative top-1'>{zeros}</small>{lastTwoDigits}</span>}</div>
}

export default PriceConvert;
