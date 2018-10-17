<template>
  <div class="aside">
    <div class="logo">
      <img src="../../assets/home/login_index.png" alt="">
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#282C2F"
      text-color="#fff"
      :router="true"
      style="border:none"
      active-text-color="#ffd04b">
      <template v-for="item in JSON.parse(getrouters)">
        <el-menu-item v-if="!item.noShow" :key="item.path" :index="'/home'+'/'+item.path">
          <template slot="title">
            <i v-if="item.name == '任务' || item.name == '分配'" class="el-icon-success"></i>
            <i v-if="item.name == '项目'" class="el-icon-document"></i>
            <i v-if="item.name == '审批'" class="el-icon-edit"></i>
            <i v-if="item.name == '评分'" class="el-icon-edit-outline"></i>
            <i v-if="item.name == '动态'" class="el-icon-bell"></i>
            <i v-if="item.name == '人员'" class="el-icon-info"></i>
            <i v-if="item.name == '反馈'" class="el-icon-message"></i>
            <i v-if="item.name == '跟进'" class="el-icon-document"></i>
            <i v-if="item.name == '绩效'" class="el-icon-tickets"></i>
            <span>{{item.name}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mainRoute } from '../../router/index'
export default {
  data () {
    return {
      router: mainRoute
    }
  },
  created () {
  },
  mounted () {
  },
  updated () {
  },
  computed: {
    ...mapGetters([
      'getrouters'
    ])
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style lang="stylus" scoped>
.aside
  text-align left
  .logo
    width 80px
    height 100px
    margin 100px 0 0 90px
    img
      width 100%
  .el-menu-demo
    margin-top 88px
    .el-menu-item
      font-size 18px
      text-align center
      height 60px
      line-height 60px
</style>
