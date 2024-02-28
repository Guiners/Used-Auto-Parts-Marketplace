import { Document } from 'mongoose';
import { Product } from './productEntity'
import { Address } from './addressEntity'

export interface Order extends Document{
    email: string;
    products: [Product];
    price: number;
    date: string;
    adress: Address;
}