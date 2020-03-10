<template>
  <div class="search">
    <div class="search-box-wrapper">
      <div class="search-box">
        <i data-v-38254089="" class="icon-search"></i>
        <input placeholder="搜索歌曲、歌手" class="box">
        <i data-v-38254089="" class="icon-dismiss" style="display: none;"></i>
      </div>
    </div>
    <div class="shortcut-wrapper">
      <div class="shortcut">
        <div>
          <div class="hot-key">
              <h1 class="titke"></h1>
            <ul>
              <li></li>
            </ul>
          </div>
        <div class="search-history"></div>
        </div>
      </div>
    </div>
    <div class="search-reslut">
      <div class="suggest">
        <ul class="suggest-list">
            <div class="loading">
              <img src="" alt="">
              <p class="desc"></p>
            </div>
        </ul>
        <div class="no-result-wrapper">
          <div class="no-result">
            <div data-v-8adf9066="" class="no-result-icon"></div>
            <p class="no-result-text"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text"></p>
          <div class="operate">
            <div class="operate-left"></div>
            <div class="operate-right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BS from 'better-scroll'
import {getHistoryLord,getMyList} from  'api/api.js'
export default{
  data(){
    return{

    }
  },
  created(){
    getHistoryLord().then((res)=>{
      console.log(res)
    }),
    getMyList().then((res)=>{
      console.log(res)
    })
  }
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.search{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: 400;
    vertical-align: baseline;
    .search-box-wrapper{
      margin: 20px;
      .search-box{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 6px;
        height: 40px;
        background: #333;
        border-radius: 6px;
        .icon-search{
          font-size: 24px;
          color: #a98175;
        }
        .box{
          -webkit-box-flex: 1;
          flex: 1;
          margin: 0 5px;
          line-height: 18px;
          background: #333;
          color: #fff;
          font-size: 14px;
        }
        .icon-dismiss{
            font-size: 16px;
            color: #a98175;
        }
      }
    }
    .shortcut-wrapper{
      position: fixed;
      top: 178px;
      bottom: 60px;
      width: 100%;
      .shortcut{
        height: 100%;
        overflow: hidden;
        div{
          .hot-key{
            margin: 0 20px 20px 20px;
            .title{
                  margin-bottom: 20px;
                  font-size: 14px;
                  color: rgba(255,255,255,0.5);
            }
            ul{
              li{
                display: inline-block;
                padding: 5px 10px;
                margin: 0 20px 10px 0;
                border-radius: 6px;
                background: #333;
                font-size: 14px;
                color: rgba(255,255,255,0.3);
              }
            }
          }
          .search-history{
              position: relative;
              margin: 0 20px;
              display: none;
              pointer-events: auto;
              .title{
                -webkit-box-flex: 1;
                flex: 1;
                margin: 0 5px;
                line-height: 18px;
                background: #333;
                color: #fff;
                font-size: 14px;
            }
            .search-list{

            }
          }
        }
      }
      .search-reslut{
        position: fixed;
        width: 100%;
        top: 178px;
        bottom: 60px;
        display: none;
        .suggest{
          height: 100%;
          overflow: hidden;
          ul{
              transition-property: transform;
              transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
              transition-duration: 0ms;
              transform: translate(0px, 0px) translateZ(0px);
          }
          .no-result-wrapper{
            position: absolute;
            width: 100%;
            top: 50%;
            display: none;
            .no-result{
                text-align: center;
                .no-result-icon{
                    width: 86px;
                    height: 90px;
                    margin: 0 auto;
                }
                .p{
                  margin-top: 30px;
                  font-size: 14px;
                  color: hsla(0,0%,100%,.3);
                }
            }
          }
        }
      }
      .confirm{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 998;
        background-color: rgba(0,0,0,.3);
        .confirm-wrapper{
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            z-index: 999;
            .confirm-content{
                width: 270px;
                border-radius: 13px;
                background: #333;

            }
        }
      }
    }
}
</style>