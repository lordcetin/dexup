/* eslint-disable react-hooks/rules-of-hooks */
'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./styles.module.css";
import { useEffect, useRef } from "react";
import { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString, widget } from "@/public/static/charting_library";
import DataFeed from "@/app/swap/datafeed/datafeed";
import { generateSymbol } from "@/app/swap/datafeed/helpers";

export const TVChartContainer = (props: any) => {
	const chartContainerRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	const {
		baseCoinId,
		quoteCoinId,
	} = props
	useEffect(() => {
		const configurationData = {
			// Represents the resolutions for bars supported by your datafeed
			supported_resolutions: ['1D', '1W', '1M'],
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


	const getAllSymbols = async () => {
		const responseALLTOKEN  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}?tickers=true`,{
			method:'GET',
			headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
			cache:'no-store',
		});
		const dataALLTOKEN = await responseALLTOKEN.json();
		return dataALLTOKEN
	}
	const datafeed:any = {
			onReady: (callback: any) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configurationData),0);
			},
			searchSymbols: async (
				userInput:any,
        exchange:any,
        symbolType:any,
        onResultReadyCallback:any) => {
					// You can implement symbol search if needed
					console.log('[searchSymbols]: Method call');
					const symbols = await getAllSymbols();
					console.log("symbol",symbols)

					const isExchangeValid = exchange === '' || symbols.tickers[0]?.market?.name === exchange;
					const isFullSymbolContainsInput = symbols.tickers[0]?.base
							.toLowerCase()
							.indexOf(userInput.toLowerCase()) !== -1;
					const result = isExchangeValid && isFullSymbolContainsInput
					onResultReadyCallback(result);
			},
			resolveSymbol: async (
        symbolName:any,
        onSymbolResolvedCallback:any,
        onResolveErrorCallback:any,
        extension:any
    ) => {
			try {
				
				const symbols = await getAllSymbols()

				const parseSYMB = symbolName.split('/');
				const fromT =  parseSYMB[0];
				const toT =  parseSYMB[1];
				const sym = generateSymbol(symbols?.tickers[0]?.market?.name,fromT,toT)

				const symbolInfo = {
					symbol: sym.short,
					ticker: sym.full,
					description: sym.short,
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
					supported_resolution: ['1D', '1W', '1M'],
					volume_precision: 2,
					data_status: 'streaming',
					visible_plots_set:"ohlc",
				}

				onSymbolResolvedCallback(symbolInfo);
			} catch (error) {
				onResolveErrorCallback("RESOLVERROR",error)
			}
    },
			getBars: async (symbolInfo: any, resolution: string, periodParams:any, onHistoryCallback: any, onErrorCallback: any) => {

        const { from, to, firstDataRequest } = periodParams;
				console.log("periodParams",periodParams)
					try {
						const responseOHLCV  = await fetch(`/api/chartdata?baseCoinId=${baseCoinId}&from=${from}&to=${to}`,{
							method:'GET',
							headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
							cache:'no-store',
						});
						const data = await responseOHLCV.json()

						console.log("data",data)

					// 	let bars: any[] = [];
					// 	ohlc.forEach((item: any, index: number) => {

					// 		// if (item.time >= (from * 1000) && item.time < (to * 1000)) {
					// 		const volume = voldata[index][1];
					// 		bars = [...bars, { 
					// 				time: item[0] / 1000,
					// 				open: item[1],
					// 				high: item[2],
					// 				low: item[3],
					// 				close: item[4],
					// 				volume: volume
					// 				}]

					// 		// }
					// });

						onHistoryCallback(data, { noData: false });
					} catch (error) {
							onErrorCallback("BARS",error);
					}
			},
			subscribeBars: (symbolInfo: any, resolution: string, onRealtimeCallback: any, subscriberUID: string, onResetCacheNeededCallback: any) => {
					// Subscribe to real-time updates if available
			},
			unsubscribeBars: (subscriberUID: string) => {
					// Unsubscribe from real-time updates if available
			}
		};
		
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

function useCallback(arg0: () => void, arg1: any[]) {
	throw new Error("Function not implemented.");
}
