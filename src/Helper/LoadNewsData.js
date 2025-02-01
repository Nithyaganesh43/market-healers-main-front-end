export async function getNewsData(setMainNewsData, setloading, setNewsData) {
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
    setMainNewsData(Object.values(data.data.data));
    setNewsData(Object.values(data.data.data));

    setloading(false);
  } catch (error) {
    console.error('Error fetching news data:', error);
  }
}
