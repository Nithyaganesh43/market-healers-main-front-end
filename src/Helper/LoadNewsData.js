const getCurrentDateObj = (simulatedDate = null) => {
  const date =
    simulatedDate ||
    new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
    });
  const [datePart, timePart] = date.split(', ');
  return { date: datePart.replace(/\//g, '-'), time: timePart };
};

function isFourHoursApart(dt1, dt2) {
  const formatDate = (d) => {
    let [day, month, year] = d.date.split('-');
    return `${year}-${month}-${day} ${d.time}`;
  };

  let t1 = new Date(formatDate(dt1));
  let t2 = new Date(formatDate(dt2));

  return Math.abs(t2 - t1) >= 4 * 60 * 60 * 1000;
}


export async function getNewsData(setMainNewsData, setloading, setNewsData) {
  let news = localStorage.getItem('news');
  if (news) {
    try {
      news = JSON.parse(news);
      if (!isFourHoursApart(news.data.lastUpdated, getCurrentDateObj())) {
      console.log("less then 4h")
        setMainNewsData(Object.values(news.data.data));
        setNewsData(Object.values(news.data.data));
        console.log(news.data.data);
        setloading(false);
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

    setloading(false);
  } catch (error) {
    console.error('Error fetching news data:', error);
  }
}
