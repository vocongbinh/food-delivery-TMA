
import {
    createContext,
    ReactNode,
    useContext,
    useState,
  } from "react";
import { OrderItem } from "../types/order-item";
  interface ContextValue {
    orderItems: OrderItem[];
    setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>
  }
  
  export const OrdersContext = createContext<ContextValue>({
    orderItems:[],
    setOrderItems:() => {}
  });
  
  const OrdersProvider = ({ children }: { children: ReactNode }) => {
   const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
   return (
    <OrdersContext.Provider value={{ orderItems, setOrderItems }}>
      {children}
    </OrdersContext.Provider>
  );
  }
  
  export const useOrdersContext = () => useContext(OrdersContext);
  
  export default OrdersProvider;
  