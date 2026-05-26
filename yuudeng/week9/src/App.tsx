import { Provider } from "react-redux";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { CartList } from "./components/CartList";
import { store } from "./store/store";
import { PriceBox } from "./components/PriceBox";
//import UseReducerCompany from "./useReducer/UseReducerCompany";

function App() {
  return (
    //<UseReducerCompany />
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />
    </Provider>
  );
}

export default App;
