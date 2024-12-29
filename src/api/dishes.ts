import { endpoint } from "../endpoints";
import { DishType } from "../types/dish";

export class DishesApi {
    static async getAllDishes(): Promise<DishType[]> {
        const res = await endpoint.get("dish_types")
        return res.data;
    }
}