<template>
  <div class="index">
    <div class="head">{{type}}
      <!-- <span>
        <a href="#" style="padding-right: 17px" @click.prevent="prev" v-if="isFirst>0">
          上一条
        </a>
        <a href="#"  @click.prevent="next" v-if="isLast>0">下一条</a>
      </span> -->
    </div>
    <div class="content">
      <div class="title-con">
        <a class="title">蓝莓项目App</a>
        <span><a style="padding-right: 50px">发送人：{{msgInfo.dispatcherName}}</a><a>发送时间：{{msgInfo.createTime}}</a></span>
      </div>
      <hr style="margin-top: 5px;border: 1px rgba(237,237,237,1) solid" />
      <div class="text">蓝莓蓝莓蓝莓蓝莓里面了蓝莓蓝莓蓝莓科技手动阀十分骄傲时十分骄傲身份卡是否 反对拉萨发生开发力度开始分阶段拉萨解放发大事发生克里夫卡斯反抗拉萨附近斯洛伐克爱上了对方就ask浪费点卡是浪费点卡十六分克里斯蒂房间打扫风口浪尖ask发</div>
      <hr style="margin-top: 5px;border: 1px rgba(237,237,237,1) solid" />
    </div>
    <div class="foot">
      <!-- <span v-if="nextStatus !== '没有下一条了'" @click="next()">下一条{{nextStatus | readStatus}}：{{nextTitle}}</span>
      <span v-if="nextStatus === '没有下一条了'">下一条:{{nextStatus}}</span>
      <span>
          <a href="" style="padding-right: 17px" @click.prevent="prev" v-if="isFirst>0">上一条</a>
          <a  href=""  @click.prevent="next"  v-if="isLast>0">下一条</a>
        </span> -->
    </div>
  </div>
</template>

<script>
  let vm
  import { adviceDetail } from '@/api/request'
  const SUCCESS_OK = '200'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        pageSize: 10,
        nextTitle: '',
        msgInfo: {},
        isFirst: '',
        isLast: '',
        nextStatus: '',
        prevDynamic: '',
        nextDynamic: '',
        type: '动态详情'
      }
    },
    computed: {
      ...mapGetters(['getadviceId'])
    },
    filters: {
      readStatus(item) {
        return item === 'YES_READ' ? '已读' : '未读'
      },
      showType(item) {
        let type
        if (item === '' || item === 'COMPANY_DYNAMICS') {
          type = '公司动态'
        } else if (item === 'PROJECT_DYNAMICS') {
          type = '项目动态'
        } else if (item === 'PERSONNEL_DYNAMICS') {
          type = '人员动态'
        }
        return type
      }
    },
    mounted () {
      vm = this
    },
    methods: {
      _adviceDetail () {
        adviceDetail({id})
      },
      prev() {
      },
      next() {
      }
    }
  }
</script>

<style lang="less" scoped>
  .index {
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: left;
    .head {
      width: 100%;
      background: #f4f6f7;
      font-size: 20px;
      font-weight: bold;
      color: rgba(118, 118, 118, 1);
      height: 55px;
      line-height: 55px;
      text-indent: 22px;
      span {
        float: right;
        margin-right: 22px;
        font-size: 16px;
        color: rgba(118, 118, 118, 1);
        line-height: 55px;
      }
    }
    .content {
      width: 100%;
      height: calc(100% - 110px);
      background: rgba(255, 255, 255, 1);
      padding: 15px;
      padding-bottom: 481px;
      overflow-y: auto; 
      box-sizing: border-box;
      .title-con{
        height: 30px;
        line-height: 30px;
        .title {
          font-size: 20px;
          color: rgba(103, 103, 103, 1);
          line-height: 0px;
        }
      }
      span {
        float: right;
        margin-right: 46px;
        padding-top: 12px;
        font-size: 16px;
        color: rgba(118, 118, 118, 1);
        line-height: 0px;
      }
      .text {
        padding-top: 38px;
        padding-right: 10px;
        font-size: 16px;
        letter-spacing: 1px;
        color: rgba(118, 118, 118, 1);
        line-height: 27px;
      }
    }
    .foot {
      width: 100%;
      background: #f4f6f7;
      font-size: 16px;
      color: rgba(118, 118, 118, 1);
      line-height: 55px;
      text-indent: 10px;
      span:not(:first-child) {
        float: right;
        margin-right: 22px;
        font-size: 16px;
        color: rgba(118, 118, 118, 1);
        line-height: 72px;
      }
    }
  }
</style>
