<template>
  <div class='detail'>
    <!-- 头部导航 -->
    <div class="top" ref=top>
      <span  @click='back'>
        <i data-v-3e2f488d="" class="icon-back"></i>
      </span>
      <span class="name">{{name}}</span>
    </div>  
      <!-- 背景 -->
      <div class="avator"
      :style="{'background-image':`url(${avator})`}"
      ref='img'
      >
        <div class="shadow"></div>
        <div class="play-wrapper">
        <div class="play">
          <i data-v-3e2f488d="" class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="songlist" ref='wrapper'>
        <div class="content">
          <ul>
            <li v-for='(item,index) in musicList'
            :key="index"
            @click="openPlay(index)"
            >
            <h2>{{item.songname}}</h2>
            <p>{{name}}.{{item.albumname}}</p>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>
<script>
import BS from 'better-scroll'
import {getSingerZhuanji,getSongUrlByMid} from 'api/api.js'
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      musicList:[],
      name:'',
      avator:'',
    } 
  },
  methods:{
    ...mapMutations(['addSongList','changeCurrentIndex','changeScreen','changeSuijiIndex']),
    back(){
      this.$router.go(-1)
    },
    openPlay(index){
      // 点击歌的li 显示播放器
      this.addSongList(this.musicList)
      // 确定点击的是那首歌
      this.changeCurrentIndex(index)
      // 点击屏幕变大
      this.changeScreen(true)
    },
    initBs(){
      let img = this.$refs.img
      let imgH= img.clientHeight 
      let wrapper = this.$refs.wrapper
      this.bs = new BS(wrapper,{probeType:3,click:true})
      this.bs.on('scroll',({y})=>{
        // 获取图片的元素和高度
        if(y>=0){
          //下拉放大
          let precent =1+(y/imgH)
          img.style.transform=`scale(${precent})`
          img.style.zIndex=1
        }else{
          //向上滚动
          // 没有到顶部 滚动层的层级高
          // 到达顶部额时候 图片的层级高
          if(Math.abs(y)>imgH-40){
            img.style.zIndex=1
            img.style.paddingTop='0%'
            img.style.height='40px'
          }else{ 
             img.style.zIndex=-1
             img.style.paddingTop='70%'
             img.style.height=0
          }
        }
      })
    },
    handleList(musicList){
      let result =[] 
      let mids=[]
      result=musicList.map((item,index)=>{
        let {albummid,albumname,singer,songmid,songname} =item.musicData
        let albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
        mids.push(songmid)
        return {albummid,albumname,singer,songmid,songname,albumUrl}
      })
      return {result,mids} 
    }
  },
  async created(){
    console.log(this.$route) 
    let {singermid} =this.$route.params
    // 根据歌手mid 发起请求获取数据
    
    let data = await getSingerZhuanji(singermid) 
    let {result,mids}= this.handleList(data.data.list) 
    // 通过接口 将mids 歌曲的媒体id 换成 音乐地址 之后将数据进行合并
    let {urls} =  await getSongUrlByMid(mids)
    console.log(await getSongUrlByMid(mids))
    let finalData = [];
    for (let index = 0; index < result.length; index++) {
     result[index].audioUrl = urls[index]
     if(urls[index]){
       finalData.push(result[index])
     }
    }
    console.log(finalData)
    this.musicList = finalData
    this.name = data.data.singer_name
    this.avator =`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`
    this.$nextTick(()=>{
      this.initBs()
    })
  }
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';

.detail{
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #222;
  left:0px;
  right: 0px;
  .top{
    height: 40px;
    color: #fff;
    position: absolute;
    top: 0;
    z-index: 3;
    .h(262.5);
    [class*=" icon-"], [class^=icon-] {
    font-family: music-icon!important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #ffcd32;
    padding: 10px;
    font-size: 22px;
    }
    .name{
    text-align: center;
    font-size: 18px;
    margin-left: 116px;
    margin-top: 8px;

    }
  }
  .avator{
    .w(375);
    padding-top:70%;
    background-size:cover;
    position: absolute;
    top: 0;
    z-index: -1;
    .shadow{
      position: absolute;
      top: 0;
      background: rgba(7,17,27,0.3);
      width: 100%;
      height:100%;
    }
    .play-wrapper{
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play{
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #ffcd32;
        color: #ffcd32;
        border-radius: 100px;
        font-size: 0;
        .icon-play{
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: 16px;
        }
        span{
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
        }
      }  
    } 
  }
  .songlist{
    position: fixed;
    background: #222;
    // overflow: hidden;
    top:270px;
    bottom: 0px;
    left: 0;
    right: 0;
    .content{
      padding:24px 30px;
      background: #222;
      li{
        font-size: @fs-s;
        color: #fff;
        height: 61px;
        h2{
          height: 20px;
          color: #FFF;
          font-size: 14px;
        }
        p{
          margin-top: 3px;
          height: 20px;
          color: rgba(255,255,255,0.3)
        }
      }
    }
  }
}
</style>