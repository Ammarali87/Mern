import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ProductItem from "../components/ProductItem";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useGetProductsQuery } from "../hooks/productHooks";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <Container className="py-4">
      <Helmet>
        <title>Home - Amazona</title>
      </Helmet>
      <h2 className="text-center mb-4">Welcome to TS Amazona</h2>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <Row className="g-4">
          {products!.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
