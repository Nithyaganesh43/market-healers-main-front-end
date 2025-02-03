const getValueOrDefault = (value) =>
  value != null ? Number(value).toFixed(3) : ' - - ';

const convertToIST = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleTimeString('en-IN', options);
};

export const updateRealData = (
  values,
  currentIndex,
  setLatestData,
  setRandomizedData,
  setPrevCloseValue,
  setCurrentIndex
) => {
  const realData = {
    time: convertToIST(values.timestamp[currentIndex]),
    high: getValueOrDefault(values.high[currentIndex]),
    low: getValueOrDefault(values.low[currentIndex]),
    open: getValueOrDefault(values.open[currentIndex]),
    close: getValueOrDefault(values.close[currentIndex]),
  };
  setLatestData(realData);
  setRandomizedData(realData);
  setPrevCloseValue(parseFloat(realData.close));
  if (currentIndex < values.timestamp.length) {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }
};

export const updateLastData = (values, setRandomizedData) => {
  const realData = {
    time: convertToIST(values.timestamp[values.timestamp.length - 1]),
    high: getValueOrDefault(values.high[values.timestamp.length - 1]),
    low: getValueOrDefault(values.low[values.timestamp.length - 1]),
    open: getValueOrDefault(values.open[values.timestamp.length - 1]),
    close: getValueOrDefault(values.close[values.timestamp.length - 1]),
  };
  setRandomizedData(realData);
};

export const applyRandomChanges = (
  setCloseColor,
  latestData,
  setRandomizedData,
  prevCloseValue,
  currentIndex
) => {
  if (currentIndex > 15) {
    setCloseColor('neutral');
    return;
  }

  function calculateParityValue(num) {
    const inValFilter = (num) =>
      Number(
        num
          .toString()
          .replace(/[^1-9]/g, '')
          .slice(-3)
          .slice(-1)
      );
    const inVal = inValFilter(num);
    const now = new Date();
    const seconds = now.getSeconds();
    if (inVal % 2 == 0) {
      return (
        (seconds % 2 == 0 ? inVal * 10 + seconds : inVal * 10 + seconds) * 0.001
      );
    } else {
      return (
        (seconds % 2 == 0 ? inVal * 10 + seconds : 0 - (inVal * 10 + seconds)) *
        0.001
      );
    }
  }

  const alteredData = {
    ...latestData,
    high: getValueOrDefault(
      parseFloat(latestData.high) + calculateParityValue(latestData.high)
    ),
    low: getValueOrDefault(
      parseFloat(latestData.low) + calculateParityValue(latestData.low)
    ),
    open: getValueOrDefault(
      parseFloat(latestData.open) + calculateParityValue(latestData.open)
    ),
    close: getValueOrDefault(
      parseFloat(latestData.close) + calculateParityValue(latestData.close)
    ),
  };
  setRandomizedData(alteredData);

  if (prevCloseValue !== null) {
    if (parseFloat(alteredData.close) > prevCloseValue) {
      setCloseColor('green');
    } else if (parseFloat(alteredData.close) < prevCloseValue) {
      setCloseColor('red');
    } else {
      setCloseColor('neutral');
    }
  }
};
