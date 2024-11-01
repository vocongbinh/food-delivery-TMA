import { ContractInstance } from "../endpoints";
import { Order } from "../types/order";

export type MetaData = Omit<Order, "id"> & {
  name: string;
  address: string;
  phone: string;
};

export async function mintJetton(address: string) {
  try {
    console.log(address)
    await ContractInstance.post(`send-jetton/${address}`);
  } catch (e) {
    console.log(e)
    throw new Error("Can not make a transaction!");
  }
}
