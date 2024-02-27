import { Link } from 'react-router-dom';
import './notfound.css';

function NotFound() {
  return (
    <div className="notFound">
      <h1>PAGE NOT FOUND</h1>
      <p className="zoom-area">
        <b>YOU</b> ARE LOST.{' '}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">
          GO BACK HOME
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
