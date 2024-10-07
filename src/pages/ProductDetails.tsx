import { useParams } from "react-router-dom";
import ProductDetail from "../components/productDetails/ProductDetail";

function ProductDetails() {
  //IMPORTS
  const { id } = useParams();

  return <ProductDetail />;
}

export default ProductDetails;
