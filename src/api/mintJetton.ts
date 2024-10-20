import { ContractInstance } from "../endpoints";
import { Order } from "../types/order";

export type MetaData = Omit<Order, "id"> & {
  name: string;
  address: string;
  phone: string;
};

export async function mintJetton(address: string) {
  try {
    await ContractInstance.post(`send-jetton/${address}`);
  } catch (e) {
    throw new Error("Can not make a transaction!");
  }
}
