<template>
  <div class='progress'>
      <span>{{startTime|handleTime}}</span>
      <div class="wrapper" ref='wrapper' 
      @click='clickProgress'>
        <div class="content" ref='content'></div>
        <div class="dot" ref='dot'
              @touchstart='touchStart'
              @touchmove='touchMove'
              @touchend='touchEnd'
        >
          <div class="red">

          </div>
        </div>
      </div>
      <span>{{endTime|handleTime}}</span>
  </div>
</template>
<script>
export default {
  methods:{
    jump(precent){
      let time = precent*this.endTime/100
      console.log(precent,this.endTime)
      this.$emit('seekFa',time)
    },
    touchStart(e){
      this.touch =true
      this.distance =0
    },
    touchMove(e){
      let left =this.$refs.wrapper.getBoundingClientRect().left
      let width=this.$refs.wrapper.clientWidth
      this.distance = e.touches[0].pageX- left
      if(this.distance>=0&&this.distance<=width){
        this.offsetMove(this.distance)
      }
    },
    touchEnd(){
      this.touch =false
      this.offsetMove(this.distance)
    },
    clickProgress(e){
      let x= e.pageX
      let left =this.$refs.wrapper.getBoundingClientRect().left
      let distance = x -left
      this.offsetMove(distance)
    },
    offsetMove(distance){
      let precent =(distance/this.$refs.wrapper.clientWidth)*100
      this.$refs.content.style.width = precent+'%'
      this.$refs.dot.style.transform = `translateX(${distance}px)`
      // 控制歌曲时间
      // console.log('快进时间',precent)
      // 按下状态 不控制歌曲快进
      if(this.touch){return false}
      this.jump(precent)
    }
  },
  props:{
    startTime:{type:Number,default:0},
    endTime:{type:Number,default:0}
  },
  filters:{
    handleTime(data){
      let time =parseInt(data)
      let m =parseInt(time/60)
      let s =time%60
      s=s<=9?`0${s}`:s
      return m+':'+s
    }
  },
  watch:{
    startTime(newValue,oldValue){
      if(this.touch){return false}
      let precent = (this.startTime/this.endTime)*100
      this.$refs.content.style.width = precent+'%'
      let width= this.$refs.wrapper.clientWidth*precent/100
      this.$refs.dot.style.transform = `translateX(${width}px)`
    }
  },
  created(){

  }
}   
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.progress{
  .w(375);
  height: 30px;
  display: flex;
  font-size: @fs-s;
  align-items: center;
  justify-content: center;
  margin-top: 76px;
  padding: 10px 0px;
  span{
    display: inline-block;
    width: 30px;
  }
  .wrapper{
    margin: 0px 10px;
    .w(270);
    height: 4px;
    background: rgba(0,0,0,.3);
    position: relative;
    .content{
      height: 4px;
      width: 0%;
      background: @yellow;
    }
    .dot{
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      position: absolute;
      transform: translateX(-8px);
      top:-6px;
      .red{
        position: absolute;
        top: 2px;
        left: 2px;
        height: 12px;
        width: 12px;
        background: @yellow;
        border-radius: 50%;
      }
    }
  }
}  
</style>