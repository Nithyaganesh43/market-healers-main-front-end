import './styles.css';

const NewsCard = (data) => {  
  const { description, image, publishedAt,   title, url } = data.data;
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
    <div className="card456">
      <img src={image} alt="Image" />
      <div className="card-heading456">{title}</div>
      <div className="card-description456">{description}</div>
      <div className="card-meta456">{toReadableDate(publishedAt)}</div>
      <a href={url} target="_blank" className="card-link456">
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
