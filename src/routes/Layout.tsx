import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "../components/privateRoute/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import LayoutWithHeaderFooter from "./LayoutWithHeaderFooter";
import ProductDetails from "../pages/ProductDetails";
import ScrollToTop from "../components/scrollToTop/ScrollToTop";
import Cart from "../pages/Cart";

function Layout() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutWithHeaderFooter />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Layout;
