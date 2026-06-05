
const SkeletonCard = () => {
  return (
    <div className="skeleton-card animate-pulse">
      <div className="skeleton-cover" />
      <div className="skeleton-details">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line skeleton-subtitle" />
        <div className="skeleton-line skeleton-subtitle" style={{ width: "30%" }} />
        <div className="skeleton-line skeleton-footer" />
      </div>
    </div>
  );
};

const SkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="book-grid">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
