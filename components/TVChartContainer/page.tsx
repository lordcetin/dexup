import styles from "./styles.module.css";
import { useEffect, useRef } from "react";
import { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString, widget } from "@/public/static/charting_library";
import DataFeed from "@/app/swap/datafeed/datafeed";

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
	const chartContainerRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {

	const datafeeds = {
			onReady: (callback: any) => {
					setTimeout(() => callback({ supported_resolutions: ['1D', '1W', '1M'] }), 0);
			},
			searchSymbols: (userInput: string, exchange: string, symbolType: string, onResultReadyCallback: any) => {
					// You can implement symbol search if needed
			},
			resolveSymbol: async (
        symbolName:any,
        onSymbolResolvedCallback:any,
        onResolveErrorCallback:any,
        extension:any
    ) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        console.log('[onResolveErrorCallback]: ', onResolveErrorCallback);
        console.log('[extension]: ', extension);
				const symbolParts = symbolName.split('/');
				const sembol = symbolParts[0];

				const symbolInfo = {
					name: symbolName,
					ticker: sembol,
					description: sembol,
					type: 'crypto',
					session: '24x7',
					exchange: 'DEXUP',
					minmov: 1,
					pricescale: 100,
					has_intraday: true,
					intraday_multipliers: ['1', '5', '15', '30', '60'],
					supported_resolution: ['1D', '1W', '1M'],
					volume_precision: 8,
					data_status: 'streaming',
				}

				onSymbolResolvedCallback(symbolInfo);
    },
			getBars: async (symbolInfo: any, resolution: string, periodParams:any, onHistoryCallback: any, onErrorCallback: any) => {

        const { from, to, firstDataRequest } = periodParams;
				const { ticker: semname } = symbolInfo

					try {
						const responseOHLC  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${semname}/ohlc?vs_currency=usd&days=1`,{
							method:'GET',
							headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
							cache:'no-store',
						});
						const dataOHLC = await responseOHLC.json();
						const responseVolume  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${semname}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,{
							method:'GET',
							headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
							cache:'no-store',
						});
						const dataVolume = await responseVolume.json();

						const bars = dataOHLC.prices.map((price: any, index: number) => {

							const fik = {
								time: Math.floor(price[0] / 1000),
								open: price[1],
								high: price[2],
								low: price[3],
								close: price[4],
								volume: dataVolume[index][1] // Hacim verisini OHLC verilere göre dizin eşleştirerek alın
							}
							console.log("FIK",fik)
							return fik
					});

						onHistoryCallback(bars, { noData: false });
					} catch (error) {
							onErrorCallback(error);
					}
			},
			subscribeBars: (symbolInfo: any, resolution: string, onRealtimeCallback: any, subscriberUID: string, onResetCacheNeededCallback: any) => {
					// Subscribe to real-time updates if available
			},
			unsubscribeBars: (subscriberUID: string) => {
					// Unsubscribe from real-time updates if available
			}
		};
		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: datafeeds as any,
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