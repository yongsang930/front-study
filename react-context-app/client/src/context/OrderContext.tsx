import { createContext, useEffect, useMemo, useState } from "react";
import type { OrderContextValue, OrderType } from "../components/Type";

export const OrderContext = createContext<OrderContextValue>([
  {} as any,
  () => {},
]);

export function OrderContextProvider(props: any) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map<string, number>(),
    options: new Map<string, number>(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  function calculateSubtotal(orderType: OrderType, orderCounts: any) {
    let optionCount: number = 0;

    for (const count of orderCounts[orderType].values()) {
      // console.log(optionCount, count, orderCounts[orderType].values());
      optionCount += count;
    }
    return optionCount * pricePerItem[orderType];
  }

  useEffect(() => {
    const productTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productTotal + optionsTotal;

    setTotals({
      products: productTotal,
      options: optionsTotal,
      total: total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: number,
      orderType: OrderType,
    ) {
      const newOrderCounts = { ...orderCounts };
      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, newItemCount);
      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
