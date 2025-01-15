import './styles.css';

const NewsCard = (data) => {
  const { description, image, publishedAt, source, title, url } = data.data;
 function toReadableDate(dateStr) {
   const options = {
     year: 'numeric',
     month: 'long',
     day: 'numeric',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
   };
   return new Date(dateStr).toLocaleString('en-US', options);
 }
  return (
    <div className="card">
      <img src={image} alt="Image" />
      <div className="card-heading">{title}</div>
      <div className="card-description">{description}</div>
      <div className="card-meta">{toReadableDate(publishedAt)}</div>
      <a href={url} target="_blank" className="card-link">
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
