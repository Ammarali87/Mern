
export default function () {
  return (
    <div>
        <footer className="bg-dark text-dark mt-5 py-4">
<div className="container">
  <h4 className="text-warning">Footer</h4>
  <div className="row">
    <div className="col-md-4 footer-column">
      <h5>Product</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">Product 1</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Product 2</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Plans & Prices</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">FAQs</a>
        </li>
      </ul>
    </div>
    <div className="col-md-4 footer-column">
      <h5>Company</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">About us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Job postings</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">News and articles</a>
        </li>
      </ul>
    </div>
    <div className="col-md-4 footer-column">
      <h5>Contact & Support</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="fas fa-comments"></i> +20 123 24 25</a>
        </li> 
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="fas fa-comments"></i> Live chat</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="fas fa-envelope"></i> Contact us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="fas fa-star"></i> Give feedback</a>
        </li>
      </ul>
    </div>
  </div>
  <div className="row text-center mt-4">
    <div className="col-md-4">
      <p className="mb-0">&copy; {new Date().getFullYear()} Amazon Clone</p>
    </div>
    <div className="col-md-4">
      <ul className="list-inline">
        <li className="list-inline-item">
          <a href="#" className="text-dark">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#" className="text-dark">
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a href="#" className="text-dark">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>
      </ul>
    </div>
    <div className="col-md-4">
      <ul className="list-inline">
        <li className="list-inline-item">
          <a href="#" className="text-dark">Privacy Policy</a>
        </li>
        <li className="list-inline-item">
          <a href="#" className="text-dark">Terms of Use</a>
        </li>
      </ul>
    </div>
  </div>
</div>
</footer>
    </div>
  )
}
