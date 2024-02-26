/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
const formatDate = (dateString: string | undefined = undefined): string => {
  const date = dateString ? new Date(dateString) : new Date();
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day: number = (date as Date).getDate();
  const month: string = months[(date as Date).getMonth()];
  const year: number = (date as Date).getFullYear();

  const formattedDate: string = `${day.toString().padStart(2, '0')} ${month} ${year}`;

  return formattedDate;
};

const formatDate2Digit = (date: Date | null): string => {
  if (date) {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }
  return new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

export { formatDate, formatDate2Digit };
