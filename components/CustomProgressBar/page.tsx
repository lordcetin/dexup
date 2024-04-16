
interface CustomProgressBarProps {
  buys: number;
  sells: number;
  title1:string;
  title2:string;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({ buys, sells,title1,title2 }) => {
  const total = buys + sells;
  const buysWidth = (buys / total) * 100;
  const sellsWidth = (sells / total) * 100;

  return (
    <div style={{ width: '100%', borderRadius: '5px',display:'block',marginTop:'5px',marginBottom:'5px' }}>
      <div className="flex">
      <div title={`${title1+ " " +String(buysWidth)}`} style={{ width: `${buysWidth}%`, backgroundColor: '#22c55e', height: '8px', borderRadius: '5px 0 0 5px' }}></div>
      <div title={`${title2+ " " +String(sellsWidth)}`} style={{ width: `${sellsWidth}%`, backgroundColor: '#dc2626', height: '8px', borderRadius: '0 5px 5px 0' }}></div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-x-1 justify-start"><h1>{title1}</h1><span>{buys}</span></div>
        <div className="flex items-center gap-x-1 justify-end"><h1>{title2}</h1><span>{sells}</span></div>
      </div>
    </div>
  );
};

export default CustomProgressBar;
