<template>
  <div class="second-container">
    <div class="row">
      <div class="title">项目名称</div>
      <div class="list">蓝莓App项目系统</div>
    </div>
    <div class="row">
      <div class="title">需求文档</div>
      <div class="list">
        <div v-for="(item,index) in demandList" :key="index" class="list-item">
          <div class="name">{{item.name}}</div>
          <div class="download">下载</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="title">原型链接</div>
      <div class="list">
        <div v-for="(item,index) in demandList" :key="index" class="list-item">
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="title">流程图</div>
      <div class="list">
        <div v-for="(item,index) in demandList" :key="index" class="list-item">
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="title">设计图</div>
      <div class="list">
        <div v-for="(item,index) in demandList" :key="index" class="list-item">
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      demandList: [{name: '测试'}, {name: '这也是一个测试啊啊啊啊'}, {name: '这也是一个测试啊啊啊啊'}]
    }
  }
}
</script>
<style lang="less" scoped>
.second-container {
  padding: 20px 30px 0px 30px;
  background: white;
  .row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f8f8f8;
    padding: 20px;
    min-height: 25px; 
    .title {
      display: inline-block;
      width: 120px;
      text-align: right;
      font-size: 16px;
      color: #4D4D4D;
    }
  }
  .row:last-child {
    border: none;
  }
  .list {
    margin-left: 60px;
    color: rgba(132, 132, 132);
    .list-item {
      display: flex;
      width: 380px;
      height: 30px;
      line-height: 30px;
      background: #F9FAFC;
      margin-bottom: 10px;
      font-size: 14px;
      .name {
        width: 310px;
        text-indent: 35px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .download:hover {
        color: #45b78d;
        cursor: pointer;
      }
    }
    .list-item:last-child {
      margin-bottom: 0px; 
    }
  }
}
</style>
