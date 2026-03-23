import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <h1>Hello React</h1>
      <div>
        <span>{count}</span>
        <button onClick={handleIncrease}>증가</button>
        <button onClick={handleDecrease}>감소</button>
      </div>
    </>
  );
}

export default App;
