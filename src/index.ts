import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config/dotenv';
import { AppDataSource } from './db/data-source';
import coinsRoute from './routes/coins.routes'

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/coins',coinsRoute)

app.get('/', (req: Request, res: Response) => {
    res.json({ message: `Server is up and running on Port: ${config.PORT}` });
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

 async function startServer (){
    try {
        await AppDataSource.initialize();
        console.log('Database connection successfull');
        app.listen(config.PORT, () => {
            console.log(`Server is running on http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.error('Error initializing the application:', error);
        process.exit(1); 
    }
};

startServer();
