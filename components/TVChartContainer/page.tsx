/* eslint-disable react-hooks/rules-of-hooks */
'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString, widget } from "@/public/static/charting_library";
import DataFeed from "@/app/swap/datafeed/datafeed";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { generateSymbol } from "@/app/swap/datafeed/helpers";
import { CrosshairMode, LineStyle, createChart } from 'lightweight-charts';

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
export const TVChartContainer = (props:any) => {
	const searchParams:any = useSearchParams()
	const chain = searchParams.get('chain')
	const pooladdress = searchParams.get('pair')
	const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const viewportWidth:any = useViewport();
	useEffect(() => {

		function countLeadingZeros(number:any) {
			// Sayıyı string'e dönüştür ve bilimsel gösterimde olup olmadığını kontrol et.
			const numberStr = number.toString();
			if (numberStr.includes('e-')) {
				// Bilimsel gösterimdeki sayının üssünü döndür.
				return parseInt(numberStr.split('e-')[1], 10);
			} else {
				// Ondalık kısmı al ve baştaki sıfır sayısını say.
				const decimalPart = numberStr.split('.')[1];
				if (!decimalPart) return 0; // Ondalık kısım yoksa sıfır döndür.
				const match = decimalPart.match(/^0+/); // Başlangıçtaki sıfırları eşle.
				return match ? match[0].length : 0; // Eşleşme varsa sıfır sayısını döndür.
			}
		}

		const configurationData = {
			// Represents the resolutions for bars supported by your datafeed
			supported_resolutions: ['1', '5', '15', '1H', '4H', 'D'],

			// The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
			exchanges: [
					{ value: 'DEXUP', name: 'Dexup', desc: 'Dexup exchange platform'},
			],
			// The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
			symbols_types: [
					{ name: 'crypto', value: 'crypto'}
			],
			supports_group_request: false,
			supports_marks: true,
			supports_timescale_marks: true,
			supports_time: true,
	};
		const datafeed = {
    
			onReady: (callback:any) => {

			setTimeout(() => callback(configurationData),0);

			},
			resolveSymbol: async (
			symbolName:any,
			onSymbolResolvedCallback:any,
			onResolveErrorCallback:any,
			extension:any
			) => {
			try {

			const parseSYMB = symbolName.split('/');
			const fromT =  parseSYMB[0];
			const toT =  parseSYMB[1];
	
			const sym = generateSymbol('Dexup',fromT,toT)

			const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json()

			const priceResponse = await fetch(`https://api.geckoterminal.com/api/v2/simple/networks/${chain}/token_price/${pairData?.baseaddress}`);
			const priceData = await priceResponse.json();
			const price = priceData?.data?.attributes?.token_prices[pairData?.baseaddress];

			const significantZeros = price.toString().includes('e') 
					? parseInt(price.toString().split('e-')[1], 10) + 1 
					: price.toString().split('.')[1]?.length || 0; 

			const scale = significantZeros >= 24 ? 1000000000000000 : 1000000;

			const symbolInfo = {
					symbol: sym.short,
					ticker: sym.short,
					description: sym.short,
					name:sym.short,
					type: 'crypto',
					session: '24x7',//24x7
					timezone: 'exchange',//Etc/UTC
					exchange: 'dexup.io',
					minmov: 1,
					pricescale: scale,//100
					has_intraday:true,
					logo_urls:pairData?.baseImg,
					supported_resolutions: ['1', '5', '15', '1H', '4H', 'D'],
					volume_precision: 2,
					data_status: 'streaming',
					supportSymbolSearch:false,
			}
	
			onSymbolResolvedCallback(symbolInfo);
			} catch (error) {
					onResolveErrorCallback("SYMBOLERROR",error)
			}
			},
			getBars: async (symbolInfo:any, resolution:any, periodParams:any, onHistoryCallback:any, onErrorCallback:any) => {
			const { from, to, firstDataRequest,countBack } = periodParams;
			try {

				const responseOHLC  = await fetch(`https://api.geckoterminal.com/api/v2/networks/${chain}/pools/${pooladdress}/ohlcv/${resolution === '15' ? 'minute?aggregate=15' : resolution === '1D' ? 'day?aggregate=1' : resolution === '1' ? 'minute?aggregate=1' : resolution === '5' ? 'minute?aggregate=5' : resolution === '60' ? 'hour?aggregate=1' : resolution === '240' ? 'hour?aggregate=4' : 'minute?aggregate=15' }&before_timestamp=${to}&limit=1000&currency=usd&token=base`);

				const dataOHLC = await responseOHLC.json();
				const datas = dataOHLC?.data?.attributes?.ohlcv_list


		const bars = datas.sort((a:any, b:any) => a[0] * 1000 - b[0] * 1000).map((ohlcItem:any) => {
				return {
						time: ohlcItem[0] * 1000,
						open: parseFloat(ohlcItem[1]),
						high: parseFloat(ohlcItem[2]),
						low: parseFloat(ohlcItem[3]),
						close: parseFloat(ohlcItem[4]),
						volume: parseFloat(ohlcItem[5])
				};
		});

				// const response = await fetch(`/api/chartdata?chain=${chain}&pooladdress=${pooladdress}&to=${to}`)
				// const bardata = await response.json()

				// if(resolution === '15'){
				// 	onHistoryCallback(bardata[0]?.bars15, { noData: false, });
				// }else if(resolution === '240'){
				// 	onHistoryCallback(bardata[0]?.bars240, { noData: false, });
				// }
				onHistoryCallback(bars, { noData: false, });
			} catch (error) {
				console.log("ERROR",error)
				onErrorCallback(error);
			}
			},
			subscribeBars: async (symbolInfo:any, resolution:any, onRealtimeCallback:any, subscriberUID:any, onResetCacheNeededCallback:any) => {

			},
			unsubscribeBars: (subscriberUID:any) => {

			}
	}

		const widgetOptions: any = {
			symbol: props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: datafeed,
			interval: props.interval,//,
      //@ts-ignore
			container: chartContainerRef.current,
			library_path: props.library_path,
			locale: props.locale as LanguageCode,
			timezone: 'exchange',
			// disabled_features: ["use_localstorage_for_settings"],
			// enabled_features: ["study_templates"],
			// charts_storage_url: props.charts_storage_url,
			charts_storage_api_version: props.charts_storage_api_version,
			client_id: props.client_id,
			user_id: props.user_id,
      theme: props.theme,
      width: props.width,
      height: props.height,
			supportSymbolSearch:false,
			// timeframe:props.timeframe
			enabled_features: [
				"show_spread_operators",
				"adaptive_logo",
				"side_toolbar_in_fullscreen_mode",
				// "show_symbol_logos",
				// "show_symbol_logo_in_legend",
			],
			disabled_features: [
				"use_localstorage_for_settings",
				"header_symbol_search",
				"header_compare",
				"header_quick_search",
				"symbol_search_hot_key",
				"header_undo_redo",
				"display_market_status",
				"edit_buttons_in_legend"
			],
		};

		const tvWidget = new widget(widgetOptions);

		// tvWidget?.activeChart()?.executeActionById("drawingToolbarAction");

		tvWidget.onChartReady(() => {
			// tvWidget.headerReady().then(() => {
			// 	const button = tvWidget.createButton();
			// 	button.setAttribute("title", "Click to show a notification popup");
			// 	button.classList.add("apply-common-tooltip");
			// 	button.addEventListener("click", () =>
			// 		tvWidget.showNoticeDialog({
			// 			title: "Notification",
			// 			body: "TradingView Charting Library API works correctly",
			// 			callback: () => {
			// 				console.log("Noticed!");
			// 			},
			// 		})
			// 	);

			// 	button.innerHTML = "Check API";
			// });
		});

		return () => {
			tvWidget.remove();
		};
	}, [props]);

	return (
		<>
		<div style={{height: `${props?.height}px`}} className={viewportWidth > 1920 ? `w-[1600px] h-[${props?.height}px] overflow-hidden rounded-xl bg-[#131722] border border-white/10` : `w-[780px] max-md:w-96 h-[${props?.height}px] max-md:h-96 overflow-hidden rounded-xl bg-[#131722] border border-white/10`}>
		{/* <div id="tvchart" className={styles.TVChartContainer}></div> */}
			<div ref={chartContainerRef} className={styles.TVChartContainer} />
		</div>
		</>
	);
};
