export function convertMilitaryTime(time) {
  const militaryHours = Number(time.slice(0, 2));
  const minutes = time.slice(2);

  const hours = militaryHours > 12 ? militaryHours - 12 : militaryHours;

  const meridiem = militaryHours >= 12 ? 'pm' : 'am';

  const hoursLeadingZero = hours < 10 ? [0, hours].join('') : hours;

  return `${[hoursLeadingZero, minutes].join(':')}${meridiem}`;
}

// 2200
