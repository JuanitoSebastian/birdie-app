
const distanceBetweenCoordinates = (startX: number, startY: number, endX: number, endY: number): number => {
  const differenceX = endX - startX;
  const differenceY = endY - startY;

  return Math.sqrt(differenceY * differenceY + differenceX * differenceX);
};

export default {
  distanceBetweenCoordinates
};