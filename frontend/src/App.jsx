import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transaction";
import Navbar from "./components/Navbar";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories";

function Layout() {
  const location = useLocation();

  // hide navbar for auth pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/categories" element={<Categories />} />
        <Route></Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;