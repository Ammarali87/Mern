import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Product } from "../types/Product";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <Card className="h-100">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ objectFit: "cover", height: "200px" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title className="text-truncate">{product.title}</Card.Title>
        </Link>
        <Rating
          rating={product.rating.rate}
          numReviews={product.rating.count}
        />
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <Button variant="primary" className="w-100">
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
