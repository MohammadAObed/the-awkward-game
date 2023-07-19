const MaxLoopIteration = 7;

export function getRandomNumber(rangeMax = 1, rangeMin = 0, dontMatchNumber = -1) {
  let randomNumber = Math.floor(Math.random() * (rangeMax - rangeMin)) + rangeMin;
  let maxCount = 0;
  while (randomNumber === dontMatchNumber) {
    randomNumber = Math.floor(Math.random() * (rangeMax - rangeMin)) + rangeMin;
    maxCount += 1;
    if (maxCount > MaxLoopIteration && maxCount > rangeMax) {
      break;
    }
  }
  return randomNumber;
}
