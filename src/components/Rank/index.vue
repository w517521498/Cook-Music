<template>
  <div class='rank'>
     <div class="toplist" ref='toplist'>
       <div class="content">
          <ul class="clear" style="" >
         <li class="" v-for="(item,index) in list" :key=index   style="width:374px;height:120px;">
          <ul class="tian" style="width:374px;height:120px">
            <li class="xiao" v-for="(aitem,aindex) in item.list" :key=aindex @click='go(aitem.id)' style="width:374px;height:120px;display: flex;margin: 0 20px;padding-top: 20px;height: 100px;">
                  <img v-lazy="aitem.picUrl" alt="" style="width:100px;height:100px">
                <ul class="right" style="width:274px;height:100px;justify-content: center;padding: 0 20px;height: 100px;overflow: hidden;background: #333;color: hsla(0,0%,100%,.3);font-size: 12px;">
                  <li class="song" v-for='(sitem,sindex) in aitem.songList' :key='sindex' style="width:195;height:26px;padding-top:8px">
                      <span style="font-size:12px;color:rgba(255,255,255,0.3)">{{sindex+1}}</span>
                      <span style="display:inline-block;font-size:12px;color:rgba(255,255,255,0.3);overflow:hidden;text-overflow: ellipsis;white-space: nowrap;ine-height: 26px;" class="zi">{{sitem.songname}}-{{sitem.singername}}</span>
                  </li>
                </ul>
            </li>
          </ul>
         </li>
       </ul>
       </div>
     </div>
     <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <router-view></router-view>
      </transition>
  </div>
</template>
<script>
import BS from 'better-scroll'
import {getRankId} from 'api/api.js'
import {handleData} from '../Rank/index'
export default {
  data(){
    return{
      list:[],
    }
  },
  methods:{
    initBs(){
      let toplist = this.$refs.toplist
      new BS(toplist,{click:true})
    },
    go(id){
      this.$router.push(`/rank/${id}`)
    }
  },
  created(){
    getRankId().then((res)=>{
     this.list= handleData(res.data.topList)
    console.log(this.list)    
    this.$nextTick(()=>{
      this.initBs()
      })
    })
  },
  mounted(){
    
  }  
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.tab{
  .w(375);
  height: 44px;
  display: flex;
}
  .rank{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .toplist{
    height: 100%;
    overflow: hidden;
    .shit{
      .clear{
        .tian{
        .xiao{
          display: flex;
          margin: 0 20px;
          padding-top: 20px;
          height: 100px;
          .w(335);
          .h(120);
          .left{
            .w(100);
            .h(100)
          }
          .right{
            width: 235px;
            height: 100px;
            padding: 0 20px;
            height: 100px;
            overflow: hidden;
            background: #333;
            color: hsla(0,0%,100%,.3);
            .song{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 26px;
                width:195;height:26px;
                .w(195);
                .h(26);
                display: inline-block;
                .zi{
                  font-size: 8px;
                }
            }
          }
        }
      }
      }
    }
    }
  }
</style>