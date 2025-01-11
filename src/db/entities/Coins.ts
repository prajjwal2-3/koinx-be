import { Entity, Column ,ObjectId,ObjectIdColumn } from "typeorm"

@Entity()
export class Coins{
    @ObjectIdColumn()
    id: ObjectId

    @Column({ type: 'varchar', length: 50 })
    coin: string; 
  
    @Column({ type: 'decimal', precision: 15, scale: 2 })
    price: number;
  
    @Column({ type: 'bigint' })
    marketCap: number;

    @Column({type: 'decimal', precision: 5, scale: 2 })
    Usd24hChange: number;

}

