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

export const TVChartContainer = (props:any) => {
	const searchParams = useSearchParams()
	const chain = searchParams.get('chain')
	const pooladdress = searchParams.get('pair')


	const {baseCoinId} = useAppContext()
	const chartContainerRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {

		const getAllSymbols = async () => {

			const responseALLTOKEN  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId.toLowerCase()}?tickers=true`,{
					method:'GET',
					headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
					cache:'no-store',
			});
			const dataALLTOKEN = await responseALLTOKEN.json();
			return dataALLTOKEN
	}
		const configurationData = {
			// Represents the resolutions for bars supported by your datafeed
			supported_resolutions: ['1D', '1W', '1M','15'],
			// The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
			exchanges: [
					{ value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex'},
					{ value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange'},
					{ value: 'OKEX', name: 'OKEX', desc: 'OKEX bitcoin exchange'},
					{ value: 'nominex', name: 'nominex', desc: 'nominex bitcoin exchange'},
					{ value: 'bitget', name: 'bitget', desc: 'bitget bitcoin exchange'},
					{ value: 'Binance', name: 'Binance', desc: 'Binance bitcoin exchange'},
					{ value: 'BitMart', name: 'BitMart', desc: 'BitMart bitcoin exchange'},
					{ value: 'uniswap', name: 'uniswap', desc: 'UNI bitcoin exchange'},
					{ value: 'Coinbase', name: 'Coinbase', desc: 'Coinbase bitcoin exchange'},
					{ value: 'CoinEx', name: 'CoinEx', desc: 'CoinEx bitcoin exchange'},
					{ value: 'Gateio', name: 'Gateio', desc: 'Gateio bitcoin exchange'},
					{ value: 'Kucoin', name: 'Kucoin', desc: 'Kucoin bitcoin exchange'},
					{ value: 'mexc', name: 'mexc', desc: 'mexc bitcoin exchange'},
			],
			// The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
			symbols_types: [
					{ name: 'crypto', value: 'crypto'}
			],
			supports_group_request: true,
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
	
			const symbols = await getAllSymbols()
	
			const sym = generateSymbol(symbols?.tickers[0]?.market?.name,fromT,toT)
			console.log("SYM",sym)
			const symbolInfo = {
					symbol: sym.short,
					ticker: sym.short,
					description: sym.short.toUpperCase(),
					name:sym.full,
					type: 'crypto',
					session: '24x7',
					timezone: 'America/New_York',
					exchange: 'DEXUP',
					exchange_logo: symbols?.image?.large,
					listed_exchange: symbols?.tickers[0]?.market?.name,
					minmov: 1,
					pricescale: 100,
					has_intraday: false,
					intraday_multipliers: ['1', '5', '15', '30', '60'],
					supported_resolution: ['1D', '1W', '1M','15'],
					volume_precision: 4,
					data_status: 'streaming',
					visible_plots_set:"ohlc",
			}
	
			onSymbolResolvedCallback(symbolInfo);
			} catch (error) {
					onResolveErrorCallback("RESOLVERROR",error)
			}
			},
			getBars: async (symbolInfo:any, resolution:any, periodParams:any, onHistoryCallback:any, onErrorCallback:any) => {
	
			const { from, to, firstDataRequest } = periodParams;
			console.log("resolution",resolution)
	
			try {
					// const responseOHLCV  = await fetch(`/api/chartdata?baseCoinId=${baseCoinId}&from=${from}&to=${to}`,{
					// 	method:'GET',
					// 	headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
					// 	cache:'no-store',
					// 	next:{revalidate:3600}
					// });
					// const dataOHLC = await responseOHLCV.json()

					const resda = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks`,{
						method:'GET',
						headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
					})
					const net = await resda.json()
					const network = net.data.filter((item:any) => item.attributes.coingecko_asset_platform_id === chain)
					const chaId = network[0]?.id

	
					const responseOHLC  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chaId}/pools/${pooladdress}/ohlcv/day?aggregate=1&limit=1000&currency=usd`,{
							method:'GET',
							headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
					});
					const dataOHLC = await responseOHLC.json();
					const datas = dataOHLC?.data?.attributes?.ohlcv_list
	
	
					// const responseVolume  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${symbolInfo.symbol}/market_chart/range?vs_currency=usd&from=${from}&to=${to}&precision=4`,{
					//     method:'GET',
					//     headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
					// });
					// const dataVolume = await responseVolume.json();
					// console.log("dataVolume",dataVolume)
	
			// 	let bars: any[] = [];
			// 	datas.forEach((item: any, index: number) => {


			// 		bars = { 
			// 				time: ...item[0],
			// 				open: ...item[1].toFixed(4),
			// 				high: ...item[2].toFixed(4),
			// 				low: ...item[3].toFixed(4),
			// 				close: ...item[4].toFixed(4),
			// 				volume: ...item[5].toFixed(4)
			// 				} as any

			// });

			// let bars:any[] = [];
		// 	datas.forEach((bar:any) => {
		// 		console.log("bar",bar)
		// 				bars = [...bars, {
		// 						time: bar.time,
		// 						low: bar.low,
		// 						high: bar.high,
		// 						open: bar.open,
		// 						close: bar.close,
		// 				}]
				
		// });

	
			const bars = datas.map((ohlcItem:any) => {

					return {
							time: ohlcItem[0] * 1000, //dataVolume?.prices[index][0],
							open: ohlcItem[1],
							high: ohlcItem[2],
							low: ohlcItem[3],
							close: ohlcItem[4],
							volume: ohlcItem[5]
					};
			});
	
					onHistoryCallback(bars, { noData: false });
			} catch (error) {
				console.log("ERROR",error)
							onErrorCallback(error);
			}
			},
			subscribeBars: (symbolInfo:any, resolution:any, onRealtimeCallback:any, subscriberUID:any, onResetCacheNeededCallback:any) => {
							// Subscribe to real-time updates if available
			},
			unsubscribeBars: (subscriberUID:any) => {
							// Unsubscribe from real-time updates if available
			}
	}

		const widgetOptions: any = {
			symbol: props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: datafeed,
			interval: props.interval as ResolutionString,
      //@ts-ignore
			container: chartContainerRef.current,
			library_path: props.library_path,
			locale: props.locale as LanguageCode,
			disabled_features: ["use_localstorage_for_settings"],
			enabled_features: ["study_templates"],
			charts_storage_url: props.charts_storage_url,
			charts_storage_api_version: props.charts_storage_api_version,
			client_id: props.client_id,
			user_id: props.user_id,
			fullscreen: props.fullscreen,
			autosize: props.autosize,
      theme: props.theme,
      width: props.width,
      height: props.height,
			show_exchange_logos: props.show_exchange_logos
		};

		const tvWidget = new widget(widgetOptions);

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute("title", "Click to show a notification popup");
				button.classList.add("apply-common-tooltip");
				button.addEventListener("click", () =>
					tvWidget.showNoticeDialog({
						title: "Notification",
						body: "TradingView Charting Library API works correctly",
						callback: () => {
							console.log("Noticed!");
						},
					})
				);

				button.innerHTML = "Check API";
			});
		});

		return () => {
			tvWidget.remove();
		};
	}, [props]);

	return (
		<>
		<div className="w-[980px] h-[600px] overflow-hidden rounded-xl">
			<div ref={chartContainerRef} className={styles.TVChartContainer} />
		</div>
		</>
	);
};
