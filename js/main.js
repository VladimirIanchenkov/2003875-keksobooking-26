function getRandomRange(min, max) {
  if (min === max || min < 0 || max < 0) {
    return 'Error';
  }
  if (min > max) {
    return Math.random() * (min - max) + max;
  }
  return (Math.random() * (max - min) + min).toFixed(0);
}

getRandomRange(1, 2);

function getRandomFromRange(min, max, decimalDigit) {
  if (min === max || min < 0 || max < 0 || decimalDigit < 0) {
    return 'Error';
  }
  if (min > max) {
    return Math.random() * (min - max) + max;
  }
  return (Math.random() * (max - min) + min).toFixed(decimalDigit);
}

getRandomFromRange(1, 10, 3);
