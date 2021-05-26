function getInstance(fn) {
  let result;
  return function () {
    return result ? result : (result = fn.apply(this, arguments));
  };
}

let createAlertMessage = function (html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
};

let createSingleAlertMessage = getSingleton(createAlertMessage);
document.body.addEventListener("click", function () {
  // 多次点击只会产生一个弹窗
  let alertMessage = createSingleAlertMessage("您的知识需要付费充值！");
  alertMessage.style.display = "block";
});
