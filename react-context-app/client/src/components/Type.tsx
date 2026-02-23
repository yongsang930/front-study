import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import ErrorBanner from "./ErrorBanner";
import Options from "./Options";
import Products from "./Products";

export type OrderType = "products" | "options";

export type UpdateItemCount = (
  itemName: string,
  newItemCount: number,
  orderType: OrderType,
) => void;

export type OrderContextValue = [
  any, // order state 타입으로 교체 가능
  UpdateItemCount,
];
interface TypeProps {
  orderType: OrderType;
}

export default function Type({ orderType }: TypeProps) {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [orderDate, updateItemCount] = useContext(OrderContext);

  //console.log("orderDate", orderDate.totals);

  const loadItems = async (orderType: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const ItemComponent = orderType === "products" ? Products : Options;

  const renderedItems = ItemComponent
    ? items.map((item) => (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
          updateItemCount={(itemName: string, newItemCount: number) =>
            updateItemCount(itemName, newItemCount, orderType)
          }
        />
      ))
    : null;

  if (error) {
    return <ErrorBanner message={"에러 발생!"} />;
  }

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격: {orderDate.totals[orderType]}</p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" ? "column" : undefined,
        }}
      >
        {renderedItems}
      </div>
    </>
  );
}
