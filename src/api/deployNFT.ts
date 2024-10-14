import { ContractInstance } from "../endpoints";
import { Order } from "../types/order";

export type MetaData = Omit<Order, "id"> & { name:string, address:string, phone:string }; 

export async function deployNFT(data: MetaData, address: string) {
    console.log(import.meta.env.VITE_CONTRACT_URL)
    const metadata = {
        ...data,
        image: data.orderItems[0].dish.imageUrl
    }
    try {
        await ContractInstance.post(`deploy-NFT/${address}`, metadata);
    }
    catch(e) {
        throw new Error("Can not make a transaction!");
    }
   

}