
interface CustomProgressBarProps {
  buys: number;
  sells: number;
  title1:string;
  title2:string;
}

const RadialProgressBar: React.FC<CustomProgressBarProps> = ({ buys, sells,title1,title2 }) => {
  const total = buys + sells;
  const buysWidth = (buys / total) * 1000;
  const sellsWidth = (sells / total) * 1000;

  return (

    <div className="flex-1 justify-center items-center w-full rotate-90 relative mt-4">
      <div className="flex items-center">
      {/* <div title={`${title1+ " " +String(buysWidth)}`} style={{ width: `${buysWidth}%`, backgroundColor: '#22c55e', height: '8px', borderRadius: '5px 0 0 5px' }}></div>
      <div title={`${title2+ " " +String(sellsWidth)}`} style={{ width: `${sellsWidth}%`, backgroundColor: '#dc2626', height: '8px', borderRadius: '0 5px 5px 0' }}></div> */}

    <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="rotate-90 size-32 overflow-hidden absolute">
      <circle className="" cx="400" cy="400" fill="none"
        r="200" stroke-width='27' stroke="#22c55e"
        stroke-dasharray={`${buysWidth} ${buysWidth}`}
        stroke-linecap="round" />
    </svg>


    <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="rotate-90 size-32 overflow-hidden absolute">
      <circle className="" cx="400" cy="400" fill="none"
        r="200" stroke-width='27' stroke="#dc2626"
        stroke-dasharray={`${sellsWidth} ${sellsWidth}`}
        stroke-linecap="round" />
    </svg>


      </div>

    </div>

  );
};

export default RadialProgressBar;
