import { useParams } from "react-router-dom";
import { Row, Col, Card, ListGroup, Button, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import { ApiError } from "../types/ApiError";
import { convertProductToCartItem, getError } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { toast } from "react-toastify";
import { addItem } from '../store/slices/cartSlice' // Add this import

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(id!);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  // const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
  
    if (product!.count < quantity) {
      toast.warn("Sorry, product is out of stock");
    alert('Product added to cart');
      return;
    }
  
    // Replace string-based dispatch with action creator
    dispatch(addItem({ ...convertProductToCartItem(product!), quantity }));
    toast.success("Product added to cart");
  }

  if (isLoading) return <LoadingBox />;
  if (error)
    return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;

  if (!product) {
    return <MessageBox variant="danger">Product Not Found</MessageBox>;
  }

  return (
    <Row className="gy-4 px-5 py-2" xs={1} sm={2} md={3} lg={2} xl={2}>
      {/* Product Image */}
      <Col>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        )}
      </Col>

      {/* Product Details */}
      <Col>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h2>{product.name}</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating  rating={product.rating}
          numReviews={product.count}  />
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Price:</strong> ${product.price}
          </ListGroup.Item>
          <ListGroup.Item>{product.description}</ListGroup.Item>
        </ListGroup>
      </Col>

      {/* Add to Cart Section */}
      <Col>
        <Card className="shadow-sm">
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col><strong>Price:</strong></Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Status:</strong></Col>
                  <Col>
                    {product.count > 0 ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Unavailable</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.count > 0 && (
                <ListGroup.Item className="text-center">
                  <Button
                    onClick={addToCartHandler}
                    variant="primary"
                    className="w-100"
                  >
                add to cart
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}











