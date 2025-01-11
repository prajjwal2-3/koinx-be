
import { Request, Response } from "express";
import { getCoinStats, getLast100Prices } from "../functions/stats.function";
import { getStandardDeviation } from "../utils/standardDeviation";


export async function getCoinPrice(req: Request, res: Response) {
    const { coin } = req.query
    if (!coin) {
        res.status(400).json({ error: 'coin parameter is required' })
        return
    }
    if (typeof coin !== "string") {
        res.status(400).json({ error: 'Invalid coin format' })
        return
    }

    const coinsData = await getCoinStats(coin)
    res.status(200).json(coinsData)
    return
}

export async function getDeviation(req: Request, res: Response) {
    const { coin } = req.query
    if (!coin) {
        res.status(400).json({ error: 'coin parameter is required' })
        return
    }
    if (typeof coin !== "string") {
        res.status(400).json({ error: 'Invalid coin format' })
        return
    }
    const prices = await getLast100Prices(coin)
    const deviation = getStandardDeviation(prices)

    res.status(200).json({ deviation })
    return
}