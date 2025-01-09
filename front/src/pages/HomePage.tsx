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

  return (
    <Container>
      <Helmet>
        <title>TS Amazona</title>
      </Helmet>
      <h2 className="mt-4 text-center">HomePage</h2>
      <h5 className="text-center mb-4">Items are here:</h5>

      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <Row className="g-4">
          {products!.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Row>
      )}
    </Container>
  );
}
