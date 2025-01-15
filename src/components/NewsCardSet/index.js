 
import NewsCard from './NewsCard/index';

const NewsCardSet = (data)=>{
 const {news , topic } = data.data;
  
  return (
    <div>
      
        {Object.entries(news).map(([key, value]) => {
          
          return (
            <NewsCard
              data={{
                content: value.content,
                description: value.description,
                image: value.image,
                publishedAt: value.publishedAt,
                source: value.source,
                title: value.title,
                url: value.url,
              }}
            />
          );
        })}
      
    </div>
  );
}
export default NewsCardSet;