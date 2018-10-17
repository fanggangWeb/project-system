<template>
  <div class="navbar">
    <!-- <img src="./logo.png" alt=""> -->
    <!-- <p>架子第三版</p> -->
    <div class="el-dropdown">
      <span @click="personCenter" class="el-dropdown-link">
        <!-- <img class="avatar" :src="getAvatar"/> -->
        {{getName}}
      </span>
      <img class="signout" src="../../assets/sign_out.png" @click="logout"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getName',
      'getAvatar'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('FedLogout').then(() => {
        console.log('退出登录')
        this.$router.push({path: '/'})
      })
    },
    personCenter () {
      this.$router.push('/home/center')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .navbar
    height 100%
    text-align right
    background white
    width 100%
    p
      color black
      float left
      margin 20px 0 0 30px
    .el-dropdown
      height 60px
      line-height 60px
      color black
      margin-right 35px
      .el-dropdown-link
        cursor pointer
        margin-right 10px
        .avatar
          width 30px
          height 30px
          display inline-block
          vertical-align top
          margin-top 15px
          border-radius 50%
      .signout
        cursor pointer
        position relative
        top 3px
</style>
