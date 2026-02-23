import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { SetStepProps } from "../SummaryPage/index";

const ComplatePage = ({ setStep }: SetStepProps) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderData] = useContext(OrderContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderComplated(orderData);
  }, [orderData]);

  const orderComplated = async (orderData: any) => {
    try {
      const res = await axios.post("http://localhost:4000/order", orderData);
      console.log("res", res);
      setOrderHistory(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const orderTable = orderHistory.map((item: any) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ));

  if (loading) {
    return <div>...loading</div>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>주문 성공!</h2>
        <h3>지금까지 모든 주문</h3>
        <table style={{ margin: "auto" }}>
          <tr>
            <th>number</th>
            <th>price</th>
          </tr>
          {orderTable}
        </table>
        <button onClick={() => setStep(0)}>첫 페이지로 이동</button>
      </div>
    );
  }
};

export default ComplatePage;
