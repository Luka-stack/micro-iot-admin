export function calculateHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return { hours, minutes: remainingMinutes };
}

export function calculateMonthDay(date: string) {
  return new Date(date).toLocaleString('en-Us', { weekday: 'long' });
}

export function toDecimalHours(utilization: number) {
  const { hours, minutes } = calculateHoursAndMinutes(utilization);

  return hours + minutes * 0.01;
}

export function toHoursAndMinutes(decimalHours: number) {
  return {
    hours: Math.floor(decimalHours),
    minutes: Number((decimalHours % 1).toFixed(2)) * 100,
  };
}
