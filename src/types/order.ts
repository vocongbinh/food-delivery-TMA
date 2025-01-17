
import { OrderItem } from "./order-item";

export interface Order {
    id: number;
    orderItems: OrderItem[];
    name:string;
    address:string;
    phone:string 
}