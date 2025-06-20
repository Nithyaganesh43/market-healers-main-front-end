const convertToIndianMarketTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { timeZone: 'Asia/Kolkata' };
  const indiaDate = new Date(date.toLocaleString('en-US', options));

  const day = indiaDate.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';
  const month = indiaDate.toLocaleString('en-US', {
    month: 'long',
    timeZone: 'Asia/Kolkata',
  });
  const year = indiaDate.getFullYear();
  const hours = indiaDate.getHours();
  const minutes = String(indiaDate.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${day}${suffix} ${month} ${year} at ${hour12}:${minutes} ${period}`;
};

function timeDiff(input) {
  let now = new Date();
  let [day, month, year] = input.date.split('-');
  let formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0'
  )}`;
  let inputDate = new Date(`${formattedDate}T${input.time}`);
  return Math.floor((now - inputDate) / 60000);
}

async function fetchMarketValueData(setIsLoading, setMarketValueData) {
  let index = 0;
  localStorage.setItem('index', index);
  setIsLoading(true);
  try {
    const response = await fetch(
      'https://server.markethealers.com/markethealers/getMarketdata'
    );
    if (!response.ok) throw new Error('Failed to fetch market data');
    const data = await response.json();
    // console.log(data);
    setMarketValueData(data?.data || {});

    return timeDiff(data.data.lastUpdated);
  } catch (error) {
    console.error('Error fetching market data:', error.message);
    setMarketValueData({ error: 'Something Went Wrong' });
    return -1;
  } finally {
    setIsLoading(false);
  }
}

function getLastMarketClosedDateAndTime(marketValueData) {
  if (!marketValueData?.data?.[0]?.values?.timestamp?.length) {
    return 'Unavailable';
  }
  return convertToIndianMarketTime(
    marketValueData.data[0].values.timestamp[
      marketValueData.data[0].values.timestamp.length - 1
    ]
  );
}

export { getLastMarketClosedDateAndTime, fetchMarketValueData };
