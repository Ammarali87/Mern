import { Col, Row, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useGetCategoriesQuery } from '../hooks/productHooks';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils';

const categoryImages = {
    electronics: 'https://images.unsplash.com/photo-1510552776732-03e61cf4b144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGVsZWN0cm9uaWNzfGVufDB8fHx8MTY4Nzg2MTA0MA&ixlib=rb-1.2.1&q=80&w=400',
    jewelery: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGpld2Vscnl8ZW58MHx8fHwxNjg3ODYxMDQw&ixlib=rb-1.2.1&q=80&w=400',
    "men's clothing":'https://i.pinimg.com/originals/59/83/7c/59837c4cf1fb0570e230a52f0fd6442a.jpg',
    "women's clothing":'https://tse1.mm.bing.net/th?id=OIP.hF7QTj2zZqAf4Mu0SpB6MgHaE_&pid=Api&P=0&h=220',
  };  
  

export default function Categories() {
  const { data: products, isLoading, error } = useGetCategoriesQuery();

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
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
      ) : (  
        <Row>
          {products!.map((product) => (
            <Col key={product} sm={6} md={4} lg={3} className="mb-4">
              <div className="text-center">
                <img
                  src={categoryImages[product] || 'https://via.placeholder.com/300'}
                  alt={product}
                  className="img-fluid mb-3"
                />
                <h5>{product}</h5>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
