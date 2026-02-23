import { useState } from "react";
import ComplatePage from "./pages/ComplatePage";
import OrderPage from "./pages/OrderPage";
import SummaryPage from "./pages/SummaryPage";

function App() {
  const [step, setStep] = useState(0);

  return (
    <div style={{ padding: "4rem" }}>
      {step === 0 && <OrderPage setStep={setStep} />}
      {step === 1 && <SummaryPage setStep={setStep} />}
      {step === 2 && <ComplatePage setStep={setStep} />}
    </div>
  );
}

export default App;
