<template>
  <el-container style="height:100%;width:100%">
    <el-aside width="250px" style="background:#282C2F">
      <aside-oa></aside-oa>
    </el-aside>
    <el-container>
      <el-header style="padding:0">
        <header-oa></header-oa>
      </el-header>
      <el-main style="box-sizing:border-box;overflow:hidden;width:100%;height:100%;padding:0px;">
        <main-oa></main-oa>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import mainOa from '@/view/layout/main'
  import asideOa from '@/view/layout/aside'
  import headerOa from '@/view/layout/header'
  export default {
    data() {
      return {}
    },
    components: {
      mainOa,
      asideOa,
      headerOa
    },
    methods: {
    },
    computed: {},
    watch: {
      $route: function(val, oldval) {
        // console.log(val)
      }
    },
    mounted() {
      // console.log(this.$route.query.id)
      console.log()
    }
  }
</script>
<style lang="stylus" scoped>
</style>
