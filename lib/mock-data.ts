// Mock data for cryptocurrencies
export const mockCoinsData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    current_price: "65420.10",
    market_cap: "1285420000000",
    market_cap_rank: "1",
    total_volume: "42650000000",
    price_change_percentage_24h: "2.35",
    circulating_supply: "19650000",
    total_supply: "21000000",
    max_supply: "21000000",
    ath: "73750.25",
    ath_date: "2024-03-14T12:15:00Z",
    category: "layer1",
    watchlist_count: 1250000,
    description:
      "Bitcoin is the first decentralized cryptocurrency, based on blockchain technology. It was created in 2009 by an anonymous person or group known as Satoshi Nakamoto.",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    current_price: "3450.75",
    market_cap: "415200000000",
    market_cap_rank: "2",
    total_volume: "18750000000",
    price_change_percentage_24h: "1.85",
    circulating_supply: "120350000",
    total_supply: "120350000",
    max_supply: null,
    ath: "4865.57",
    ath_date: "2021-11-10T14:24:19Z",
    category: "layer1",
    watchlist_count: 980000,
    description:
      "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.",
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    current_price: "145.20",
    market_cap: "65800000000",
    market_cap_rank: "5",
    total_volume: "3250000000",
    price_change_percentage_24h: "4.25",
    circulating_supply: "453000000",
    total_supply: "560000000",
    max_supply: null,
    ath: "259.96",
    ath_date: "2021-11-06T21:54:35Z",
    category: "layer1",
    watchlist_count: 650000,
    description:
      "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.",
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    current_price: "0.45",
    market_cap: "16200000000",
    market_cap_rank: "9",
    total_volume: "750000000",
    price_change_percentage_24h: "-1.25",
    circulating_supply: "36000000000",
    total_supply: "45000000000",
    max_supply: "45000000000",
    ath: "3.09",
    ath_date: "2021-09-02T06:00:10Z",
    category: "layer1",
    watchlist_count: 520000,
    description:
      "Cardano is a proof-of-stake blockchain platform that says its goal is to allow 'changemakers, innovators and visionaries' to bring about positive global change.",
  },
  {
    id: "uniswap",
    symbol: "uni",
    name: "Uniswap",
    current_price: "10.85",
    market_cap: "8450000000",
    market_cap_rank: "18",
    total_volume: "320000000",
    price_change_percentage_24h: "-0.75",
    circulating_supply: "778000000",
    total_supply: "1000000000",
    max_supply: "1000000000",
    ath: "44.92",
    ath_date: "2021-05-03T05:25:04Z",
    category: "defi",
    watchlist_count: 380000,
    description:
      "Uniswap is a popular decentralized trading protocol, known for its role in facilitating automated trading of decentralized finance tokens.",
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    current_price: "14.75",
    market_cap: "8750000000",
    market_cap_rank: "17",
    total_volume: "450000000",
    price_change_percentage_24h: "2.15",
    circulating_supply: "593000000",
    total_supply: "1000000000",
    max_supply: "1000000000",
    ath: "52.70",
    ath_date: "2021-05-10T00:13:57Z",
    category: "defi",
    watchlist_count: 410000,
    description:
      "Chainlink is a decentralized oracle network that provides real-world data to smart contracts on the blockchain.",
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "Binance Coin",
    current_price: "580.25",
    market_cap: "89500000000",
    market_cap_rank: "4",
    total_volume: "1850000000",
    price_change_percentage_24h: "-0.35",
    circulating_supply: "154000000",
    total_supply: "166800000",
    max_supply: "166800000",
    ath: "686.31",
    ath_date: "2021-05-10T07:24:17Z",
    category: "exchange",
    watchlist_count: 720000,
    description:
      "Binance Coin (BNB) is an exchange-based token created and issued by the cryptocurrency exchange Binance.",
  },
  {
    id: "usdc",
    symbol: "usdc",
    name: "USD Coin",
    current_price: "1.00",
    market_cap: "32500000000",
    market_cap_rank: "6",
    total_volume: "4250000000",
    price_change_percentage_24h: "0.01",
    circulating_supply: "32500000000",
    total_supply: "32500000000",
    max_supply: null,
    ath: "1.17",
    ath_date: "2019-05-08T00:40:28Z",
    category: "stablecoin",
    watchlist_count: 320000,
    description: "USD Coin (USDC) is a stablecoin that is pegged to the U.S. dollar on a 1:1 basis.",
  },
  // Add more mock coins as needed
]

// Mock historical price data
export const mockCoinHistoricalData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 365 + i)

  // Create a somewhat realistic price curve
  const basePrice = 30000
  const trend = Math.sin(i / 30) * 10000 + i * 100
  const volatility = Math.random() * 2000 - 1000
  const price = basePrice + trend + volatility

  return {
    timestamp: date.getTime(),
    price: Math.max(100, price), // Ensure price doesn't go below 100
  }
})

// Mock market data
export const mockCoinMarkets = [
  {
    exchange: "Binance",
    pair: "BTC/USDT",
    price: "65425.50",
    volume: "1250000000",
  },
  {
    exchange: "Coinbase",
    pair: "BTC/USD",
    price: "65410.25",
    volume: "850000000",
  },
  {
    exchange: "Kraken",
    pair: "BTC/USD",
    price: "65415.75",
    volume: "450000000",
  },
  {
    exchange: "Huobi",
    pair: "BTC/USDT",
    price: "65420.00",
    volume: "650000000",
  },
  {
    exchange: "KuCoin",
    pair: "BTC/USDT",
    price: "65418.50",
    volume: "350000000",
  },
  {
    exchange: "Bybit",
    pair: "BTC/USDT",
    price: "65422.75",
    volume: "550000000",
  },
  {
    exchange: "OKX",
    pair: "BTC/USDT",
    price: "65419.25",
    volume: "480000000",
  },
  {
    exchange: "Bitfinex",
    pair: "BTC/USD",
    price: "65415.00",
    volume: "220000000",
  },
]
