export function formatCookTime(time: number) {
  let timeString = "";

  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours > 0) {
    timeString += hours + (hours === 1 ? " hour " : " hours ");
  }
  if (minutes > 0) {
    timeString += minutes + (minutes === 1 ? " minute " : " minutes");
  }

  return timeString;
}
