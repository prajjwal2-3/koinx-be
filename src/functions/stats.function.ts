import { AppDataSource } from "../db/data-source";
import { Coins } from "../db/entities/Coins";

const coinsRepo = AppDataSource.getMongoRepository(Coins)

export async function getCoinStats(coin: string) {
    const data = await coinsRepo.findOne({
        where: {
            coin
        }, order: {
            id: 'ASC'
        }
    })
    const structure= {
        price: data?.price,
        marketCap:data?.marketCap,
        "24hChange":data?.Usd24hChange
    }
    return structure
}

export async function getLast100Prices(coin: string) {
    const prices = await coinsRepo.find({
        where: {
            coin,
        },
        order: {
            id: "ASC",
        },
        take: 100,
    });

    const pricesArray = prices.map((coin) => coin.price);
    return pricesArray
}