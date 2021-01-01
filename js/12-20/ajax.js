function ajax(url){
   return new Promise((resolve, reject)=>{
       const xmr = new XMLHttpRequest;
       xmr.open('GET',url,true);
       xmr.onreadystatechange = function(state){
         if (xmr.readyState === 4) {
             if (xmr.status === 200) {
                 resolve(JSON.parse(xmr.responseText))
             }else if(xmr.status === 404){
                 reject('error 404')
             }
         }
       };
       xmr.send(null);
   })
}
ajax('./data.json').then(res=>{
    console.log(res);
}).catch(error=>{
    console.log(error);
})