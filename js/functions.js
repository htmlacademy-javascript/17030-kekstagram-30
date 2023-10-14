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
