import mongoose, { Model } from "mongoose";
import { Order } from '../entities/orderEntity';
import { Address } from '../entities/addressEntity';
import { Product } from '../entities/productEntity';
// const addressDB: Model<Address>  = require('../model/Address');
const orderDB: Model<Order>  = require('../model/Order');

const createOrder = async (email: string, productsList: Product[], address: Address) => {
    try{

        if (!address || !email || !productsList.length) {
            if (!address) {
                throw new Error("Address is missing");
            }
            if (!email) {
                throw new Error("Email is missing");
            }
            if (!productsList.length) {
                throw new Error("No products provided");
            }
        }

        let sumProductPrice: number = 0;

        for (let product of productsList){
            sumProductPrice += product.price;
        }

        const newOrder: Order = {
            email: email,
            products: productsList,
            price: sumProductPrice,
            date: new Date().toLocaleString('pl-PL'),
            adress: address,
        }

        return await orderDB.create(newOrder);
    
    } catch (error) {
        throw error;
    }
}

const getOrdersByEmail = async (email: string) => {
    try{
        const foundOrder: Order|null|Order[] = await orderDB.findOne({email: email}).exec();

        if (!foundOrder || foundOrder !== null){
            throw new Error("Order not found");
        }

        return foundOrder;
    
    } catch (error) {
        throw error;
    }
}

const getOrderById = async (id: string) => {
    try{
        const foundOrder: Order|null = await orderDB.findOne({_id: id}).exec();

        if (!foundOrder || foundOrder !== null){
            throw new Error("Order not found");
        }

        return foundOrder;
    
    } catch (error) {
        throw error;
    }
}

const deleteOrder = async (id: string) => {
    try{
        const foundOrder: Order = await getOrderById(id);
       
        return orderDB.deleteOne({ _id: foundOrder._id });
    } catch (error) {
        throw error;
    }
}

const editOrder = async (id: string, email: string, productsList: Product[], address: Address) => {
    try{

        if (!address || !email || !productsList.length) {
            if (!address) {
                throw new Error("Address is missing");
            }
            if (!email) {
                throw new Error("Email is missing");
            }
            if (!productsList.length) {
                throw new Error("No products provided");
            }
        }

        let sumProductPrice: number = 0;

        for (let product of productsList){
            sumProductPrice += product.price;
        }

        const editedOrder: Order = {
            email: email,
            products: productsList,
            price: sumProductPrice,
            date: new Date().toLocaleString('pl-PL'),
            adress: address
        }

        const foundOrder: Order = await getOrderById(id);
        
        return await orderDB.findOneAndUpdate({ _id: foundOrder._id }, editedOrder, { new: true });
        // return await orderDB.create(editedOrder);
    
    } catch (error) {
        throw error;
    }
}


module.exports = { createOrder, getOrdersByEmail,  deleteOrder, editOrder, getOrderById }
