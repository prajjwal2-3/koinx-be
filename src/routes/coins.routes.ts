import express from 'express'
import { getCoinPrice,getDeviation } from '../controller/coins.controller'
const route = express.Router()

route.get('/stats',getCoinPrice)
route.get('/deviation',getDeviation)
export default route