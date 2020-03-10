function handleData(data){
  console.log(data)
    let obj={};
    for (let index = 0; index < data.length; index++) {
      let {id,picUrl,songList,topTitle} = data[index]
      let singerItem= {id,picUrl,songList,topTitle}
      if(!obj[index]){
        obj[index]=[singerItem]
      }else{
        obj[index].push(singerItem)
      }   
   }
 
  let other=[]
  for (const key in obj) {
    if(key){
      other.push({key,list:obj[key]})
    }else{
      
    }
  }
  //按照下标进行排序

  // 将最热和排序过的数据进行合并
  let result =other
  return result 
}
   export {handleData}