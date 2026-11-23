import { Link } from "react-router-dom";
import { getContentType } from "../catalogUtils.js";

function HeroBanner({ title, eyebrow = "Featured today" }) {
  if (!title) return null;

  return (
    <section className="hero" style={{ backgroundImage: `url(${title.posterUrl})` }}>
      <div className="hero-overlay" />
      <div className="hero-text page-width">
        <span className="featured-label"><span /> {eyebrow}</span>
        <p className="hero-brand">M <strong>FILM</strong></p>
        <h1>{title.title}</h1>
        <div className="hero-meta" aria-label="Title information">
          {title.year && <span>{title.year}</span>}
          {title.rating && <span className="rating-pill">{title.rating}</span>}
          <span>{getContentType(title)}</span>
          <span>{title.genre || "Other"}</span>
        </div>
        <p className="hero-description">{title.description}</p>
        <div className="hero-actions">
          <Link to={`/movie/${title._id}`} className="btn btn-light"><span aria-hidden="true">▶</span> Play</Link>
          <Link to={`/movie/${title._id}`} className="btn btn-secondary"><span aria-hidden="true">ⓘ</span> More Info</Link>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
