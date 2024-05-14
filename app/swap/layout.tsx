'use client'
import { useEffect, useState } from "react";

const useViewport = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    // Initial width on component mount
    setWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener('resize', handleWindowResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []); // Run effect only on component mount

  return width;
};
export default function SwapLayout({
  children,
  chart,
  comments,
  details,
  iframes,
  honeypot,
  traders,
  shortdetail,
}:{
  children:React.ReactNode,
  chart:React.ReactNode,
  comments:React.ReactNode,
  details:React.ReactNode,
  iframes:React.ReactNode
  traders:React.ReactNode
  shortdetail:React.ReactNode
  honeypot:React.ReactNode
}) {
  const viewportWidth:any = useViewport();
  return (
    <div>
      <div>{children}</div>
      <div style={{display:'flex', flex:1}}>{shortdetail}</div>
      <div style={{ display: "flex" , flexDirection:'column'}} className="gap-x-2 max-md:flex-col max-md:gap-y-2">
        <div style={{ display:"flex", flex:1 }} className="gap-x-2 max-md:flex-col max-md:gap-y-2">
          <div>{details}</div>
          <div>{chart}</div>
          <div>{comments}</div>
        </div>
        <div style={{ display:"flex", flex:1 }} className="gap-x-2 max-md:flex-col max-md:gap-y-2">
          <div>{iframes}</div>
          <div>{traders}</div>
        </div>
      </div>
    </div>
  )
}