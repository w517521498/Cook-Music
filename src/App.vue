<template>
  <div id="app">
    <Header></Header>
    <Tab></Tab>
   <!-- <LessDemo></LessDemo> -->
    <!-- <router-view></router-view> -->
    <router-view></router-view>
    <Player></Player>
  </div>
</template>
<script>
// import LessDemo from './demo/less/LessDemo/index'
import Player from './components/Player/idnex'
import Header from './components/Header'
import Tab from './components/Tab'
export default {
     components:{ Header ,Tab,Player}
}
</script>
<style lang="less" scoped>
@import './style/index.less';
#app{
  background: @black2;
  .w(375);
  height: 100vh;
}
</style>
