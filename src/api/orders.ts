import { Order } from "../types/order";
import { ContractInstance } from "../endpoints";


export type MetaData = Omit<Order, "id">;
export class OrdersApi {

  static async deployOrderContract(opts: {
    owner: string;
    customer: string;
    name: string;
    image: string;
    quantity: number;
    price: bigint;
  }) {
    const res = await ContractInstance.post(`/deploy-order-contract`, undefined, {
      params: opts
    })
    return res.data
  }
}
