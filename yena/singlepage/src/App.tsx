import "./App.css";
import Link from "./routers/Link";
import Route from "./routers/Route";
import { Routes } from "./routers/Routes";

const YejinPage = () => <h1>예진 페이지</h1>;
const ChanPage = () => <h1>차니 페이지</h1>;
const ZuPage = () => <h1>은쥬 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link to="/yejin">YEJIN</Link>
      <Link to="/chan">CHAN</Link>
      <Link to="/zu">ZU</Link>
      <Link to="/not-found">NOT FOUND</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/yejin" component={YejinPage} />
        <Route path="/chan" component={ChanPage} />
        <Route path="/zu" component={ZuPage} />
        <Route path="/not-found" component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;