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
isPalindrome('cКекс'); // false
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

(extractNumbers('2023 год')); // 2023
(extractNumbers('ECMAScript 2022')); // 2022
(extractNumbers('1 кефир, 0.5 батона')); // 105
(extractNumbers('агент 007')); // 7
(extractNumbers('а я томат')); // NaN

(extractNumbers(2023)); // 2023
(extractNumbers(-1)); // 1
(extractNumbers(1.5)); // 15
