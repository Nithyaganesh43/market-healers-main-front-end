import { useEffect, useState } from 'react';
import './styles.css';

const NewsCard = (data) => {  
  const [img, setimg] = useState(
    'https://miro.medium.com/v2/resize:fit:640/format:webp/1*t8ZaGUP8uXuTTsWuiKNdyA.gif'
  );
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
 useEffect(async () => {
   const im = await fetch(image);
   if (im.ok) {
     setimg(image);
   } else {
     setimg(null);
   }
 }, []);
  return (
    <div className="card456">
      {img ?< img src={img} alt="Image" /> :""}
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
