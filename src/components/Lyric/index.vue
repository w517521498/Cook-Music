<template>
  <div class='lyric'>
     {{text}}
  </div>
</template>
<script>
import {getLyricByMid} from 'api/api.js'
import Lyric from 'lyric-parser'
import {Base64} from 'js-base64'
import {mapState,mapGetters} from 'vuex'
export default {
  data(){
    return{
      text:'暂无歌词'
    }
  },
  props:['startTime','play'],
  computed:{
    ...mapGetters(['currentSong']),
    // ...mapState(['currentIndex'])
  },
  methods:{
    getLyric(songmid){
      getLyricByMid(songmid).then((data)=>{
        // 使用base64解码歌词
        let  decode=Base64.decode(data.lyric)
       if(this.lyricObj){
        //  将之前的歌词播放停止
         this.lyricObj.stop()
       }
        this.lyricObj = new Lyric(decode,({txt})=>{
             console.log(txt)
             this.text=txt
        })
        this.lyricObj.play()
      })
    },
  },
  watch:{
    play(newValue,oldValue){
      if(!this.lyricObj) return false
      console.log('歌词播放状态',newValue)
      this.lyricObj.togglePlay()
    },
    startTime(newValue,oldValue){
      if(!this.lyricObj) return false
      this.lyricObj.seek(newValue*1000)
    },
    currentSong(newData,oldData){
      // console.log('歌曲变了')
      let {songmid}=newData
      this.getLyric(songmid,1)
    },
  },
   mounted() {
      let {songmid}=this.currentSong
      this.getLyric(songmid,0)
    }, 
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.lyric{
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: hsla(0,0%,100%,.5);
    text-align: center;
}
</style>