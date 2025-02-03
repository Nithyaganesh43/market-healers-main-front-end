function isThreeHoursOlder(lastUpdatedStr) {
  const lastUpdated = new Date(
    lastUpdatedStr.split('-').reverse().join('-') +
      'T' +
      lastUpdatedStr.split(' ')[1]
  );
  const now = new Date();
  const diff = now - lastUpdated;
  return diff >= 6 * 60 * 60 * 1000;
}

export async function getNewsData(setMainNewsData, setloading, setNewsData) {
  let news = localStorage.getItem('news');
  if (news) {
    try {
      news = JSON.parse(news);
      if (
        news &&
        !isThreeHoursOlder(
          news.data.lastUpdated.date + ' ' + news.data.lastUpdated.time
        )
      ) {
        console.log("not older")
        setloading(false);
        console.log(news.data.lastUpdated);
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
    console.log("fetch")
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
