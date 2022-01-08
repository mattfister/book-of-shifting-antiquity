import  { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import HomePage from "./components/HomePage";


function App() {
  return (
    <div>
      <HomePage/>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
        <Button>hello</Button>
      </nav>
    </div>
  );
}

export default App