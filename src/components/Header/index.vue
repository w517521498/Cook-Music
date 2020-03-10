<template>
  <div class='header'>
    <!-- 如果图片在public目录直接用根路径 -->
    <img src="http://ustbhuangyi.com/music/img/default.cbc0e020.png" alt="">
    <span>Cook Music</span>
    <div class="right">
        <i data-v-81206c3e="" class="icon-mine"></i>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.header{
  color: @yellow;
  font-size:@fs-l;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .w(375);
  height: 44px;
  img{
    width: 30px;
    height:32px;
    display: inline-block;
    vertical-align: top;
    margin-right: 9px;
  }
  .right{
    position: absolute;
    top: 0;
    right: 0;
      [class*=" icon-"], [class^=icon-]{
      font-family: music-icon;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      display: block;
      padding: 12px;
      font-size: 20px;
      color: #ffcd32;
    }
  }
    

}
</style>