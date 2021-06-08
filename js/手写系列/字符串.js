// 、手写字符串转二进制
function charToBinary(text) {
    let code = "";
    for (let i of text) {
      // 字符编码
      let number = i.charCodeAt().toString(2);
      // 1 bytes = 8bit，将 number 不足8位的0补上
      for (let a = 0; a <= 8 - number.length; a++) {
         number = 0 + number;
      }
      code += number;
    }
    return code;
  }
