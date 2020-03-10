<template>
  <div class='xiangxi'>
    <!-- 头部导航 -->
    <div class="top" ref=top>
      <span  @click='back'>
        <i data-v-3e2f488d="" class="icon-back"></i>
      </span>
      <span class="name">{{name}}</span>
    </div>  
      <!-- 背景 -->
      <div class="bg" :style="{'background-image':`url(${bg})`}" ref='img'>
        <div class="shadow"></div>
        <div class="play-wrapper">
        <div class="play" @click='suijiplay(indexs)'>
          <i data-v-3e2f488d="" class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      </div>
      <div class="songlist" ref='wrapper'>
        <div class="content">
          <ul>
            <li v-for='(item,index) in musiclist' :key='index'>
                <ul>
                  <li v-for='(aitem,aindex) in item.singer'
                  :key="aindex" @click="openPlay(index)" class="l1"
                  >
                  <h2 class="l2">{{item.songname}}</h2>
                  <p class="p3">{{aitem.name}}/{{aitem.name}}.{{item.albumname}}</p>
                  </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>
<script>
import BS from 'better-scroll'
import  {getRankSongList,getSongUrlByMid} from 'api/api.js'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
          musiclist:[],
         name:[],
         bg:[],
        }
    },
    methods:{
      ...mapMutations(['addSongList','changeCurrentIndex','changeScreen']
      ),
        openPlay(index){
        // 点击歌的li 显示播放器
        this.addSongList(this.musiclist)
        // 确定点击的是那首歌
        this.changeCurrentIndex(index)
        // 点击屏幕变大
        this.changeScreen(true)
        },
        initBs(){
        let img = this.$refs.img
        let imgH= img.clientHeight 
        let wrapper = this.$refs.wrapper
        new BS(wrapper,{probeType:3,click:true})
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
      back(){
        this.$router.go(-1)
      },
      handleList(data){
        console.log(data)
        let result=[]
        let mids=[]
        result =data.map((item,index)=>{
          let {albummid,albumname,songname,singer,songmid}=item.data
          let albumUrl=`http://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg`
          this.bg=`http://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg`
          mids.push(songmid)
          return {albummid,albumname,songname,singer,songmid,albumUrl}
        })
        return {result,mids}
      },
    },
    async created(){
        // console.log(this.$route)
        let {topid}=this.$route.params
        let res= await getRankSongList(topid)
        console.log(res)
        let{result,mids} = this.handleList(res.songlist)
        let {urls} = await getSongUrlByMid(mids)
        let finallist=[];
        for (let index = 0; index < result.length; index++) {
            result[index].audioUrl=urls[index]
            if(urls[index]){
              finallist.push(result[index])
            }
        }
        console.log(finallist)
        console.log(result)
        this.musiclist=finallist
        this.name=res.topinfo.ListName
            this.$nextTick(()=>{
              this.initBs()
            })
    }
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
  .xiangxi{
    background:#222; position: fixed;
    top: 0px;
    bottom: 0px;
    left:0px;
    right: 0px;
    .top{
      .w(414);
      .h(289.8);
      z-index: 3;
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
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #fff;
      }
    }
    .bg{
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
      .l1{
        font-size: @fs-s;
        color: #fff;
        height: 61px;
        .l2{
          height: 20px;
          color: #FFF;
          font-size: 14px;
        }
        .p3{
          margin-top: 3px;
          height: 20px;
          color: rgba(255,255,255,0.3)
        }
      }
    }
   }
  }
  </style>