import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "../components/privateRoute/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LayoutWithHeaderFooter from "./LayoutWithHeaderFooter";
import ProductDetails from "../pages/ProductDetails";
// import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Cart from "../pages/Cart";
import OrderList from "../components/orderList/OrderList";
import OrderSuccess from "../pages/OrderSuccess";
import ErrorPage from "../components/error404/ErrorPage";

function Layout() {
  return (
    <Router>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route element={<LayoutWithHeaderFooter />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order_success" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Layout;
