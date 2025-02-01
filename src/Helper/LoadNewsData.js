function isOneDayOlder(lastUpdatedStr) {
  const lastUpdated = new Date(lastUpdatedStr);
  const now = new Date();  
  return now.toLocaleDateString()!=lastUpdated.toLocaleDateString();
}

export async function getNewsData(setMainNewsData, setloading, setNewsData) {
  let news = localStorage.getItem('news');
  if (news) {
    try {
      news = JSON.parse(news);
      if (news && !isOneDayOlder(news.data.lastUpdated.date)) {
        setloading(false);
        setMainNewsData(Object.values(news.data.data));
        setNewsData(Object.values(news.data.data));
        return;
      }
    } catch (e) {
      console.error('Error parsing localStorage news data:', e);
    }
  }

  try {
    setloading(true);
    console.log('fetched');
    let data = await fetch(
      'https://server.markethealers.com/MarketHealers/getNewsData',
      { 
        credentials: 'include',  
      }
    );
    if (!data.ok) {
      throw new Error('Failed to fetch news data');
    }
    data = await data.json();
    localStorage.setItem('news', JSON.stringify(data));
    setMainNewsData(Object.values(data.data.data));
    setNewsData(Object.values(data.data.data));

    setloading(false);
  } catch (error) {
    console.error('Error fetching news data:', error);
  }
} 