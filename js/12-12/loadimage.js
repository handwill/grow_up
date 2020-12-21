function loadImage(src,resolve,reject){
    let image = new Image();
    
    image.src = src;
    image.onload = ()=>{
        document.body.appendChild(image)
        resolve()
    } ;
    image.onerror = reject;
}
loadImage('https://img.zai-art.com/zaiart/saas/image/39b1f0c9f6d01502aecc1d6489e1d1e3.jpeg',()=>{
   console.log('图片加载完成');
},()=>{
    console.log('图片加载失败');
})