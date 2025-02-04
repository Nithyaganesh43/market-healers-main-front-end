 
function isFourHoursApart(dt1, dt2) {
  const formatDate = (d) => {
    let [day, month, year] = d.date.split('-');
    return `${year}-${month}-${day} ${d.time}`;
  };

  let t1 = new Date(formatDate(dt1));
  let t2 = new Date(formatDate(dt2));

  return Math.abs(t2 - t1) >= 4 * 60 * 60 * 1000;
}
const getCurrentDateObj = (simulatedDate = null) => {
  const date = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(simulatedDate ? new Date(simulatedDate) : new Date());

  const [datePart, timePart] = date.split(', ');
  return { date: datePart.replace(/\//g, '-'), time: timePart };
};


export async function getNewsData(setMainNewsData, setloading, setNewsData) {
  let news = localStorage.getItem('news');
  if (news) {
    try {
      news = JSON.parse(news);
      if (
        news &&
        !isFourHoursApart(news.data.lastUpdated,getCurrentDateObj())
      ) { 
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
    let data = await fetch(
      'https://server.markethealers.com/MarketHealers/getNewsData'
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
