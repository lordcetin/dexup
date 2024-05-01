import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
interface CustomProgressBarProps {
  buys: number;
  sells: number;
  title1:string;
  title2:string;
}

const ProgressBar: React.FC<CustomProgressBarProps> = ({ buys, sells,title1,title2 }) => {
  const total = buys + sells;
  const buysWidth = (buys / total) * 100;
  const sellsWidth = (sells / total) * 100;

  return (
    <div style={{ width: '100%', borderRadius: '5px',display:'block',marginTop:'5px',marginBottom:'5px' }}>
      <div className="flex relative">
      <Tippy content={`${title1}: ${buys}`}>
      <div title={`${title1+ " " +String(buysWidth)}`} style={{ width: `${buysWidth}%`, backgroundColor: '#22c55e', height: '11px', borderRadius: '5px 0 0 5px' }}></div>
      </Tippy>
      <Tippy content={`${title2}: ${sells}`}>
      <div title={`${title2+ " " +String(sellsWidth)}`} style={{ width: `${sellsWidth}%`, backgroundColor: '#dc2626', height: '11px', borderRadius: '0 5px 5px 0' }}></div>
      </Tippy>
      </div>
    </div>
  );
};

export default ProgressBar;
