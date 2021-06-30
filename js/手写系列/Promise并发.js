function sendRequest(urls, max, callback) {
  let pending_count = 0, //并发数
    idx = 0; //当前请求的位置

  while (pending_count < max) {
    _fetch(urls[idx++]);
  }

  async function _fetch(url) {
    if (!url) return;
    pending_count++;
    console.log(url + ":start", "并发数: " + pending_count);
    await fetch(url);
    pending_count--;
    console.log(url + ":done", "并发数: " + pending_count);
    _fetch(urls[idx++]);
    pending_count || (callback && callback());
  }
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${url} 请求返回`);
    }, 500);
  });
}

let urls = ["url1", "url2", "url3", "url4", "url5"];
sendRequest(urls, 3, () => {
  console.log("所有请求返回了");
});
