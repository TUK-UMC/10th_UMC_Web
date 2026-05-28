import { useReducer, useState } from "react";

// 1. state에 대한 interface
interface IState {
  counter: number;
}
// 2. reducer에 대한 interface
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
}

function reducer(state: IState, action: IAction) {
  const { type } = action;

  switch (type) {
    case "INCREASE": {
      return { ...state, counter: state.counter + 1 };
    }
    case "DECREASE": {
      return { ...state, counter: state.counter - 1 };
    }
    case "RESET_TO_ZERO": {
      return { ...state, counter: 0 };
    }
    default:
      return state;
  }
}

export const UseReducerPage = () => {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useReducer
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <div className="flex items-center justify-center flex-col mt-30 gap-2">
      <h2 className="flex text-3xl">useState 훅 사용</h2>
      <h1 className="flex text-2xl">{count}</h1>
      <button
        className="flex bg-gray-200 rounded-lg p-2"
        onClick={handleIncrease}
      >
        Increase
      </button>

      <h2 className="flex text-3xl">useReducer 훅 사용</h2>
      <h1 className="flex text-2xl">{state.counter}</h1>
      <div className="flex gap-2">
        <button
          className="flex bg-gray-200 rounded-lg p-2"
          onClick={() =>
            dispatch({
              type: "INCREASE",
            })
          }
        >
          Increase
        </button>
        <button
          className="flex bg-gray-200 rounded-lg p-2"
          onClick={() =>
            dispatch({
              type: "DECREASE",
            })
          }
        >
          Decrease
        </button>
        <button
          className="flex bg-gray-200 rounded-lg p-2"
          onClick={() =>
            dispatch({
              type: "RESET_TO_ZERO",
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
};
