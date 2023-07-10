export const getFormattedDateTime = (date: Date) => {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const formattedDate = `${day} ${monthNames[monthIndex]}, ${year}`;

  const formattedTime = `${hours}:${minutes}`;

  return [formattedDate, formattedTime];
};
