import { useState } from 'react';
import './styles.css';

const NewsCard = ({ data }) => {
  const { description, image, publishedAt, title, url } = data;
  const [imgError, setImgError] = useState(false);

  function toReadableDate(dateStr) {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  return (
    <div className="card456">
      {!imgError && image && (
        <img src={image} alt="News" onError={() => setImgError(true)} />
      )}
      <div className="card-heading456">{title}</div>
      <div className="card-description456">{description}</div>
      <div className="card-meta456">{toReadableDate(publishedAt)}</div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link456">
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
