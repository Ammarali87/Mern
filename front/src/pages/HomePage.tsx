import { Col, Row, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductItem from '../components/ProductItem';
import { useGetProductsQuery } from '../hooks/productHooks';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils';

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log("https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b");

  return (
    <Container>
      <Helmet>
        <title>TS Amazona</title>
      </Helmet>
      <h2 className="text-center my-4">Welcome to TS Amazona</h2>
      <h5 className="text-center mb-4">Shop your favorite items</h5>
         
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <Row>
          {products!.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}



