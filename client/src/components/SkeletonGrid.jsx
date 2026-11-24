// Grey placeholder cards shown while titles load, so the page does not jump.
function SkeletonGrid({ count = 8, label = "Loading titles" }) {
  return (
    <div className="catalog-grid skeleton-grid" role="status" aria-live="polite" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index} aria-hidden="true">
          <div className="skeleton-image" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonGrid;
