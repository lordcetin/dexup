/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useRef,memo, useEffect } from "react";

type Props = {
  baseSymbol:string
};

const Chart = ({baseSymbol}: Props) => {
  const container = useRef<any>(null);

  useEffect(() => {
    if (!container.current) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize":"false",
        "width": "980",
        "height": "610",
        "symbol": "${baseSymbol}USDT",
        "interval": "D",
        "timezone": "exchange",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "drawings_accessible": true,
        "hide_side_toolbar": false,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.removeChild(script);
      }
    }
  },[baseSymbol])

  return (
    <div className="overflow-hidden h-[600px] w-full rounded-2xl border-[1.5px] border-white border-opacity-20">
    <div className="tradingview-widget-container" ref={container} style={{ height: "600px", width: "100%" }}>
    </div>
    </div>
  );
};

export default memo(Chart);
