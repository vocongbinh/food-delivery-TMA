import { ContractInstance } from "../endpoints";
import { Order } from "../types/order";

export type MetaData = Omit<Order, "id">; 

export async function deployNFT(data: MetaData, address: string, orderId: string) {
    console.log(import.meta.env.VITE_CONTRACT_URL)
    const metadata = {
        ...data,
        image: data.orderItems[0].dish.imageUrl
    }
    try {
        await ContractInstance.post(`deploy-NFT/${address}`, metadata, {
            params: {
                order_id: orderId
            }
        });
    }
    catch(e) {
        throw new Error("Can not make a transaction!");
    }
   

}