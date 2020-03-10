<template>
  <div class='player' v-if='songList.length'>
    <div v-if='fullScreen' class='big'>
    <!-- 头部 -->
     <div class='top'>
       <div class="back">
         <i data-v-b7471128="" class="icon-back" @click='changeScreen(false)'></i> 
       </div>
       <h1 class="title">{{currentSong.songname}}</h1>
           <!-- 歌手 -->
      <p class='name'>{{currentSong.singer[0].name}}</p>
     </div>
     <!-- 背景 -->
     <div class='bg'>
       <img :src="currentSong.albumUrl" alt="">
     </div>
     <!-- 专辑图片 -->
     <div class='img'>
       <img :class='cd' :src="currentSong.albumUrl" alt="">
     </div>
     <!-- 歌词 -->
     <Lyric :seekTime = 'seekTime' :play='play'></Lyric>
    <!-- 进度条 -->
    <MyProgress
    :startTime = 'startTime'
    :endTime = 'endTime'
    @seekFa = 'seek'
    ></MyProgress>
     <!-- 播放 -->
     <div class="operators">
       <div class="icon-left">
         <i data-v-b7471128="" class="icon-sequence" @click='changeLoop'>{{loops[loop]}}</i>
       </div>
       <div class="icon-left">
         <i data-v-b7471128="" class="icon-prev" @click="last"></i>
       </div>
       <div class="icon-center">
         <i data-v-b7471128="" class="icon-play" @click='togglePlay'></i>
       </div>
       <div class="icon-right">
         <i data-v-b7471128="" class="icon-next" @click='next'></i>
       </div>
       <div class="icon-right">
         <i data-v-b7471128="" class="icon icon-not-favorite"></i>
       </div>
     </div>
     <!-- 播放器 -->
     <audio ref='audio' 
            @canplay='canplay'
            @ended ='ended'
            @timeupdate="timeupdate"
            :src='currentSong.audioUrl'></audio>
    </div>
    <div v-else 
    class='small'
    @click='changeScreen(true)'
    >
      <div class="icon">
        <div class="imgWrapper">
          <img :src="currentSong.albumUrl" alt="">
        </div>
      </div>
      <div class="text">
        <h2 class="name">{{currentSong.songname}}</h2>
        <p class="desc">{{currentSong.singer[0].name}}</p>
      </div>
      <div class="control">
        <div class="progress-circle">
          <i class="icon-mini icon-play-mini"
          ></i>
        </div>
      </div>
      <div class="control">
        <i data-v-b7471128="" class="icon-playlist"></i>
      </div>
    </div>
  </div>
</template>
<script>
import MyProgress from 'components/Progress'
import Lyric from 'components/Lyric'
import {mapState, mapMutations, mapGetters} from 'vuex'
export default {
  components:{MyProgress,Lyric},
  data(){
    return{
      startTime:0,
      endTime:0,
      loops:['','1','2','3'],
      play:false,
      seekTime:0
    }
  },
  computed:{
    ...mapState(['songList','fullScreen','loop']),
    ...mapGetters(['currentSong']),
    cd(){
      return this.play?'cd':'cd paused'
    }
  },
  methods:{
    ...mapMutations(['changeScreen','nextCurrentIndex','lastCurrentIndex','changeCurrentIndex','changeLoop','changeSuijiIndex']),
    togglePlay(){
      this.play=!this.play
    },
    // mimiPlay(){
    //   this.play=!this.play
    //   // togglePlay(!play)
    //   // changeScreen(false)
    // },
    timeupdate(e){
      this.startTime= e.target.currentTime
    },
    canplay(){
      // 歌曲可以播放 
      this.audio = this.$refs.audio 
      console.log('可以播放了')
      this.audio.play()
      this.play = true
      console.log(this.audio.__proto__)
      //获取歌曲的总时长
      this.endTime = this.audio.duration
    },
    seek(s){
      console.log('父组件的方法')
      if(!this.audio){return false}
      //更改播放的时间
      this.audio.currentTime = s
      this.seekTime = s
    },
    ended(){
      this.play = false
      console.log('播放完毕',this.loop)
      switch (this.loop) {
        case 1:
          // 单曲循环
          this.play = true
          this.audio.play()
          break;
        case 2:
          //列表相当于下一曲
          this.nextCurrentIndex()
          break;
          case 3:
            //随机播放
            let count =this.songList.length
            let index =parseInt(Math.random()*count)
            console.log('随机',index)
            this.changeCurrentIndex(index)
        default:
          break;
      }
    },
    last(){
        this.lastCurrentIndex()
    },
    next(){
      //下一曲 
        this.nextCurrentIndex()
    },
  },
  watch:{
    play(newValue,oldValue){
      console.log('播放状态',newValue)
      if(!this.audio) return false 
      if(newValue){
        this.audio.play()
      }else{
        this.audio.pause()
      }
    }
  } 
}
/*
1.处理数据 
2.显示数据渲染界面 name 歌手 专辑图片
3.专辑图片能动
4.显示歌词 
5.控制器 前一曲 后一曲 循环模式  播放 收藏
6.进度条  
  a.随着时间动
  b.可以点击控制歌曲播放
  c.可以拖动控制歌曲的播放
 
*/ 
</script>
<style lang="less" scoped>
@import '~style/index.less';
.player{
  color: #fff;
  .big{
    position: fixed;
    top:0px;
    bottom: 0px;
    left:0;
    right:0;
    background: #222;
    .top{
      font-size: @fs-l;
      text-align: center;
      position: relative;
      margin-bottom: 25px;
      .back{
            position: absolute;
            top: 0;
            left: 6px;
            z-index: 50;
            .icon-back{
            display: block;
            padding: 9px;
            font-size: 22px;
            color: #ffcd32;
            transform: rotate(-90deg);
        }    
      }.title{
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 18px;
          color: #fff;      
      }.name{
        line-height: 20px;
        text-align: center;
        font-size: 14px;    
        color: #fff;
      }
    }
    .name{
      font-size: @fs-s;
      text-align: center;
      padding: 10px;
    }
    .bg{
      position: absolute;
      z-index: -9;
      top: 0px;
      width: 100%;
      height: 100%;
      filter: blur(15px);
      img{
         width: 100%;
         height: 100%;
      }
    }
    .img{
      text-align: center;
      .w(375);
      padding: 20px;
      box-sizing: border-box;
      img{
          width: 85%;
          border-radius:50%;
          border: 10px solid #ccc; 
      }
      & .cd{
        animation: rotate 10s linear infinite;
      }
      & .paused{
        animation-play-state: paused;
      }
    }
    .operators{
      .w(375);
      height: 40px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin-bottom: 30px;
      .icon-left{
        .w(67);
        .h(31);
        text-align: right;
      }
      .icon-center{
        .w(107);
        .h(40);
        text-align: center;
        .icon-play{
          padding: 0 20px;
          font-size: 40px;
        }
      }
      .icon-right{
        .w(67);
        .h(31);
        text-align: left;
      }
    }
  }
  .small{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #333;
      .icon{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 40px;
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        padding: 0 10px 0 20px;
        .imgWrapper{
          height: 100%;
          width: 100%;
          img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
      }
      .text{
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-flex: 1;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name{
          margin-bottom: 2px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
          color: #fff;
          width: 244px;
          height: 20px;
        }
        .desc{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 12px;
          color: hsla(0,0%,100%,.3);
          width: 244px;
          height: 20px;
        }
      }
      .control{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 30px;
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        .progress-circle{
          position: relative;
          .icon-mini{
            font-size: 32px;
            position: absolute;
            left: 0;
            top: -12px;
          }
          .icon-playlist{
          font-size: 30px;
          color: rgba(255,205,49,.5);
          position: absolute;
          left: 0;
          top: -12px;
          }
        }
      }
      // .control{
      //   -webkit-box-flex: 0;
      //   -ms-flex: 0 0 30px;
      //   flex: 0 0 30px;
      //   width: 30px;
      //   padding: 0 10px;
        
      // }
    }
  @keyframes rotate {
    0% {
     transform: rotate(0deg)
    }
    100%{
      transform: rotate(360deg)
    }
  }
}  
</style>