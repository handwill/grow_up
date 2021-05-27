let imgList = [...document.querySelectorAll("img")];

function lazyLoad() {
  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.src = entry.dataSet.src;
        observer.unobserve(entry.target);
      }
    });
  });
  imgList.forEach((img) => {
    observer.observe(img);
  });
}
