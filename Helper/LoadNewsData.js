function isThisToday(dateStr) {
  let today = new Date();
  let date = new Date(dateStr.split('-').reverse().join('-'));
  return today.toDateString() === date.toDateString();
}
export async function getNewsData(setNewsData) {



  let news = localStorage.getItem('news');
  if (news) {
    try {
      news = JSON.parse(news); 
      if (news && isThisToday(news.data.lastUpdated.date)) {
        setNewsData(Object.values(news.data.data));
        return;
      }
    } catch (e) {
      console.error('Error parsing localStorage news data:', e);
    }
  }
  
  try {
     await new Promise((r) => setTimeout(r, 5000));
    let data = await fetch(
      'https://server.markethealers.com/MarketHealers/getNewsData'
    ); 
    if (!data.ok) {
      throw new Error('Failed to fetch news data');
    }
    data = await data.json();
    localStorage.setItem('news', JSON.stringify(data));
    setNewsData(Object.values(data.data.data));
  } catch (error) {
    console.error('Error fetching news data:', error);
  }



}
