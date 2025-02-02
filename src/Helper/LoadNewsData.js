const getCurrentDateObj = (simulatedDate = null) => {
  const date = simulatedDate
    ? simulatedDate
    : new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
      });
  const [datePart, timePart] = date.split(', ');
  return { date: datePart.replace(/\//g, '-'), time: timePart };
};


function isFourHoursApart(dt1, dt2) {
  let t1 = new Date(`${dt1.date} ${dt1.time}`);
  let t2 = new Date(`${dt2.date} ${dt2.time}`);
  return Math.abs(t2 - t1) >= 4 * 60 * 60 * 1000;
}
 
export async function getNewsData(setMainNewsData, setloading, setNewsData) {
  let news = localStorage.getItem('news');
  if (news) {
    try {
      news = JSON.parse(news); 
      if ( 
        !isFourHoursApart(news.data.lastUpdated, getCurrentDateObj())
      ) {
        console.log('not old news');
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