import { useSelector, useDispatch } from 'react-redux'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBox from '../components/'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks'
import { RootState } from '../store/store'
import { ApiError } from '../types/ApiError'
import { convertProductToCartItem, getError } from '../utils'
import { addItem } from '../store/slices/cartSlice'

export default function ProductPage() {
  const params = useParams()
  const { slug } = params
  const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!)

  // Redux state for cart
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCartHandler = () => {
    const existItem = cartItems.find((x) => x._id === product!._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product!.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch(addItem({ ...convertProductToCartItem(product!), quantity }))
    toast.success('Product added to the cart')
    navigate('/cart')
  }

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div>
      <Row className="g-4">
        <Col md={6} sm={12}>
          <img className="img-fluid rounded" src={product.image} alt={product.name}></img>
        </Col>
        <Col md={6} sm={12}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price: <span className="text-success">${product.price}</span></ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={12} lg={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col className="text-end">${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
