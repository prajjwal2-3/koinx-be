import axios from 'axios';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const COINGECKO_API_KEY = process.env.COINGECKO_API;
const DB_NAME = 'koinx';
const COLLECTION_NAME = 'coins';

const createCoinGeckoUrl = (coins) => {
    const coinIds = coins.join(',');
    return `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&precision=0`;
};

const getCoinGeckoOptions = (url) => ({
    method: 'GET',
    url,
    headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': COINGECKO_API_KEY
    }
});


const client = new MongoClient(MONGODB_URI);

const createCoinDocument = (coinId, data) => ({
    coin: coinId,
    price: data[coinId].usd,
    marketCap: data[coinId].usd_market_cap,
    Usd24hChange: data[coinId].usd_24h_change,
    timestamp: new Date()
});

export const handler = async () => {
    try {
        
        await client.connect();
        console.log('MongoDB connection successful');

        const coins = ['bitcoin', 'matic-network', 'ethereum'];
        const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

        const url = createCoinGeckoUrl(coins);
        const response = await axios.request(getCoinGeckoOptions(url));

        const operations = coins.map(coin => {
            if (response.data[coin]) {
                const document = createCoinDocument(coin, response.data);
                return collection.insertOne(document);
            }
            console.warn(`No data found for ${coin}`);
            return null;
        }).filter(Boolean);

        const results = await Promise.all(operations);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Documents created successfully',
                insertedCount: results.length
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error processing request',
                error: error.message
            })
        };

    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
};