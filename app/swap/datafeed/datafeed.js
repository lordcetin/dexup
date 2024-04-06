/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */

import { makeApiRequest, generateSymbol, parseFullSymbol } from './helpers.js';


// DatafeedConfiguration implementation
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

// Obtains all symbols for all exchanges supported by CryptoCompare API
const getAllSymbols = async (baseCoinId) => {

    const responseALLTOKEN  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId.toLowerCase()}?tickers=true`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        cache:'no-store',
    });
    const dataALLTOKEN = await responseALLTOKEN.json();
    return dataALLTOKEN
}

export default {
    
    onReady: (callback) => {
    console.log('[onReady]: Method call',callback);
    setTimeout(() => callback(configurationData),0);
    },
    searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback) => {
    // You can implement symbol search if needed

    const symbols = await getAllSymbols(userInput);
    console.log("symbol",symbols)

    const isExchangeValid = exchange === '' || symbols.tickers[0]?.market?.name === exchange;
    const isFullSymbolContainsInput = symbols.tickers[0]?.base
            .toLowerCase()
            .indexOf(userInput.toLowerCase()) !== -1;
    const result = isExchangeValid && isFullSymbolContainsInput
    onResultReadyCallback(result);
    },
    resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
    extension
    ) => {
    try {
    const parseSYMB = symbolName.split('/');
    const fromT =  parseSYMB[0];
    const toT =  parseSYMB[1];

    const symbols = await getAllSymbols(fromT)

    const sym = generateSymbol(symbols?.tickers[0]?.market?.name,symbols.symbol,toT)
    
    const symbolInfo = {
        symbol: fromT.toLowerCase(),
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
        volume_precision: 2,
        data_status: 'streaming',
        visible_plots_set:"ohlc",
    }

    onSymbolResolvedCallback(symbolInfo);
    } catch (error) {
        onResolveErrorCallback("RESOLVERROR",error)
    }
    },
    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {

    const { from, to, firstDataRequest } = periodParams;

    try {
        // const responseOHLCV  = await fetch(`/api/chartdata?baseCoinId=${baseCoinId}&from=${from}&to=${to}`,{
        // 	method:'GET',
        // 	headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        // 	cache:'no-store',
        // 	next:{revalidate:3600}
        // });
        // const dataOHLC = await responseOHLCV.json()

        const responseOHLC  = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/eth/pools/0x4a7d4be868e0b811ea804faf0d3a325c3a29a9ad/ohlcv/minute?aggregate=15&limit=1000&currency=usd`,{
            method:'GET',
            headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        });
        const dataOHLC = await responseOHLC.json();
        const datas = dataOHLC?.data?.attributes?.ohlcv_list

        console.log("dataOHLC",dataOHLC)

        // const responseVolume  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${symbolInfo.symbol}/market_chart/range?vs_currency=usd&from=${from}&to=${to}&precision=4`,{
        //     method:'GET',
        //     headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        // });
        // const dataVolume = await responseVolume.json();
        // console.log("dataVolume",dataVolume)

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

    const bars = datas.map((ohlcItem) => {
        console.log("bars",bars)
        return {
            time: ohlcItem[0], //dataVolume?.prices[index][0],
            open: ohlcItem[1],
            high: ohlcItem[2],
            low: ohlcItem[3],
            close: ohlcItem[4],
            volume: ohlcItem[5]
        };
    });

    console.log("bars",bars)
        onHistoryCallback(bars, { noData: false });
    } catch (error) {
            onErrorCallback("BARS",error);
    }
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
            // Subscribe to real-time updates if available
    },
    unsubscribeBars: (subscriberUID) => {
            // Unsubscribe from real-time updates if available
    }
}