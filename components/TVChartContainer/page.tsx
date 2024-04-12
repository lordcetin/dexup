/* eslint-disable react-hooks/rules-of-hooks */
'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { useEffect, useRef } from "react";
import { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString, widget } from "@/public/static/charting_library";
import DataFeed from "@/app/swap/datafeed/datafeed";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { generateSymbol } from "@/app/swap/datafeed/helpers";
import { CrosshairMode, LineStyle, createChart } from 'lightweight-charts';


export const TVChartContainer = (props:any) => {
	const searchParams = useSearchParams()
	const chain = searchParams.get('chain')
	const pooladdress = searchParams.get('pair')


	const {baseCoinId} = useAppContext()
	const chartContainerRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {

		const getAllSymbols = async () => {
			const responseALLTOKEN  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId && baseCoinId.toLowerCase()}?tickers=true`,{
					method:'GET',
					headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
			});
			const dataALLTOKEN = await responseALLTOKEN.json();
			return dataALLTOKEN
	}
		const configurationData = {
			// Represents the resolutions for bars supported by your datafeed
			supported_resolutions: ["D", "2D", "3D", "W", "3W", "M", "6M"],
			intraday_multipliers: ['1','3','5','15','30','45'],
			seconds_multipliers: ['1S','3S','5S'],

			// The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
			exchanges: [
					{ value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex'},
					{ value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange'},
					{ value: 'DEXUP', name: 'Dexup', desc: 'Dexup bitcoin exchange'},
			],
			// The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
			symbols_types: [
					{ name: 'crypto', value: 'crypto'}
			],
			supports_group_request: false,
			supports_marks: false,
			supports_search: false,
			supports_timescale_marks: false,
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

			const symbolInfo = {
					symbol: sym.short,
					ticker: sym.short,
					description: sym.short,
					name:sym.short,
					type: 'crypto',
					session: '24x7',//24x7
					timezone: 'Etc/UTC',//Etc/UTC
					exchange: 'DEXUP',
					minmov: 1,
					pricescale: 1000000,
					has_intraday:true,
					has_seconds:true,
					intraday_multipliers: ['1','3','5','15','30','45'],
					seconds_multipliers: ['1S','3S','5S'],
					supported_resolution: ['1D', '1W', '1M','1','3','5','15','30','45'],
					volume_precision: 2,
					data_status: 'streaming',
					supports_group_request: false,
					supports_marks: false,
					supports_search: false,
					supports_timescale_marks: false,
					// debug:true,
			}
	
			onSymbolResolvedCallback(symbolInfo);
			} catch (error) {
					onResolveErrorCallback("RESOLVERROR",error)
			}
			},
			getBars: async (symbolInfo:any, resolution:any, periodParams:any, onHistoryCallback:any, onErrorCallback:any) => {
			// console.log("resoulution",resolution) // 1D
			const { from, to, firstDataRequest } = periodParams;

			try {

					const resda = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks`,{
						method:'GET',
						headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
					})
					const net = await resda.json()
					const network = net.data.filter((item:any) => item.attributes.coingecko_asset_platform_id === chain)
					const chaId = network[0]?.id

					const responseOHLC  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain === 'solana' ? 'solana' : chain === 'arbitrum' ? 'arbitrum' : chain === 'the-open-network' ? 'ton' : chaId}/pools/${pooladdress && pooladdress}/ohlcv/minute?aggregate=15&limit=1000&currency=usd`,{
							method:'GET',
							headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
							cache:'no-cache',
					});

					const dataOHLC = await responseOHLC.json();
					const datas = dataOHLC?.data?.attributes?.ohlcv_list

		// console.log("from", new Date(periodParams.from * 1000)); // Mon Jun 16 1456 01:55:52 GMT+0155 (GMT+03:00)
		// console.log("time", new Date(datas[0][0] * 1000)); // Mon Apr 08 2024 12:15:00 GMT+0300 (GMT+03:00)
	
			const bars = datas.sort((a:any, b:any) => a[0] * 1000 - b[0] * 1000).map((ohlcItem:any) => {
					return {
							time: ohlcItem[0] * 1000,
							open: parseFloat(ohlcItem[1].toFixed(4)),
							high: parseFloat(ohlcItem[2].toFixed(4)),
							low: parseFloat(ohlcItem[3].toFixed(4)),
							close: parseFloat(ohlcItem[4].toFixed(4)),
							volume: parseFloat(ohlcItem[5].toFixed(4))
					};
			});
					onHistoryCallback(bars, { noData: false });
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
			// disabled_features: ["use_localstorage_for_settings"],
			// enabled_features: ["study_templates"],
			// charts_storage_url: props.charts_storage_url,
			charts_storage_api_version: props.charts_storage_api_version,
			client_id: props.client_id,
			user_id: props.user_id,
      theme: props.theme,
      width: props.width,
      height: props.height,
			supports_group_request: false,
			supports_marks: false,
			supports_search: false,
			supports_timescale_marks: false,
			// show_exchange_logos: props.show_exchange_logos,
			// debug: props.debug,
			// timeframe:props.timeframe
		};

		const tvWidget = new widget(widgetOptions);

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
		<div className="w-[980px] h-[600px] overflow-hidden rounded-xl">
		{/* <div id="tvchart" className={styles.TVChartContainer}></div> */}
			<div ref={chartContainerRef} className={styles.TVChartContainer} />
		</div>
		</>
	);
};
