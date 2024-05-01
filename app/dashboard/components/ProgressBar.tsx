import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
interface CustomProgressBarProps {
  buys: number;
  sells: number;
  used: number;
  title1:string;
  title2:string;
  title3:string;
}

const ProgressBar: React.FC<CustomProgressBarProps> = ({ buys,used ,sells,title1,title2,title3 }) => {
  const total = buys + sells;

  return (
    <div style={{ width: '100%', borderRadius: '5px',display:'block',marginTop:'5px',marginBottom:'5px' }}>
      <div className="flex relative">
      <Tippy content={`${title1}: ${buys}`}>
      <div style={{ width: `${buys}%`, backgroundColor: '#6366f1', height: '11px', borderRadius: '5px 0 0 5px' }} className='hover:opacity-80'></div>
      </Tippy>
      <Tippy content={`${title3}: ${used}`}>
      <div style={{ width: `${used * 10}%`, backgroundColor: '#fbbf24', height: '11px', borderRadius: '0px 0 0 0px' }} className='hover:opacity-80'></div>
      </Tippy>
      <Tippy content={`${title2}: ${sells}`}>
      <div style={{ width: `${sells}%`, backgroundColor: '#312e81', height: '11px', borderRadius: '0 5px 5px 0' }} className='hover:opacity-80'></div>
      </Tippy>
      </div>
    </div>
  );
};

export default ProgressBar;
