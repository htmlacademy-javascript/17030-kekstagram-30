const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const halfCharsNumber = normalizedString.length / 2;

  for (let i = 0; i < halfCharsNumber; i++) {
    const char = normalizedString.at(i);
    const oppositeChar = normalizedString.at(-i - 1);

    if (char !== oppositeChar) {
      return false;
    }
  }

  return true;
};

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

const extractNumbers = (target) => {
  const charset = target.toString();
  let numbersSet = '';

  for (const char of charset) {
    const isNumber = !Number.isNaN(Number.parseInt(char, 10));

    if (isNumber) {
      numbersSet += char;
    }
  }

  return Number.parseInt(numbersSet, 10);
};

extractNumbers('2023 год'); // 2023
extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007'); // 7
extractNumbers('а я томат'); // NaN

extractNumbers(2023); // 2023
extractNumbers(-1); // 1
extractNumbers(1.5); // 15

const normalizeTimeComponent = (timeComponent) => Number.parseInt(timeComponent.padStart(2, '0'), 10);
const splitTimeStringToComponents = (time) => time.split(':').map(normalizeTimeComponent);
const createDateFromTimeComponent = (hours, minutes) => new Date(0, 0, 0, hours, minutes);

const validateBusinessMeeting = (workDayStartTime, workDayEndTime, meetingStartTime, meetingDurationInMinutes) => {
  const workDayStartTimeComponents = splitTimeStringToComponents(workDayStartTime);
  const workDayEndTimeComponents = splitTimeStringToComponents(workDayEndTime);
  const [meetingStartTimeHours, meetingStartTimeMinutes] = splitTimeStringToComponents(meetingStartTime);

  const workDayStartDate = createDateFromTimeComponent(...workDayStartTimeComponents);
  const workDayEndDate = createDateFromTimeComponent(...workDayEndTimeComponents);
  const meetingStartDate = createDateFromTimeComponent(meetingStartTimeHours, meetingStartTimeMinutes);
  const meetingEndDate = createDateFromTimeComponent(meetingStartTimeHours, meetingStartTimeMinutes + meetingDurationInMinutes);

  return workDayStartDate <= meetingStartDate && workDayEndDate >= meetingEndDate;
};

validateBusinessMeeting('08:00', '17:30', '14:00', 90); // true
validateBusinessMeeting('8:0', '10:0', '8:0', 120); // true
validateBusinessMeeting('08:00', '14:30', '14:00', 90); // false
validateBusinessMeeting('14:00', '17:30', '08:0', 90); // false
validateBusinessMeeting('8:00', '17:30', '08:00', 900); // false
