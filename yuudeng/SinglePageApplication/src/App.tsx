import "./App.css";
import Link from "./routers/Link";
import Route from "./routers/Route";
import { Routes } from "./routers/Routes";

const YuudengPage = () => <h1>유뎅 페이지</h1>;
const CatPage = () => <h1>고양이 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      <Link to="/yuudeng">YUUDENG</Link>
      <Link to="/cat">CAT</Link>
      <Link to="/joy">JOY</Link>
      <Link to="/not-found">NOT FOUND</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/yuudeng" component={YuudengPage} />
        <Route path="/cat" component={CatPage} />
        <Route path="/joy" component={JoyPage} />
        <Route path="/not-found" component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
