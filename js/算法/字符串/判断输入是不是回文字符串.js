function isPlalindrome1(input) {
  if (typeof input !== "string") return false;
  return input.split("").reverse().join("") === input;
}

function isPlalindrome2(input) {
  if (typeof input !== "string") return false;
  let i = 0,
    j = input.length - 1;
  while (i < j) {
    if (input.charAt(i) !== input.charAt(j)) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}
