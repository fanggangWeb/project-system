<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
let vm
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getid'])
  },
  watch: {
    $route: function (val, oldval) {
      // this.over()
      // this.websocket()
    },
    getid: function (val, oldval) {
      this.websocket()
    }
  },
  methods: {
    close() {
      this.$notify.close()
    },
    websocket() {
      let ws = new WebSocket(`ws://${this.socketApi}/websocket/socketServer.ws?userId=${this.getid}`)
      ws.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send('hello')
        console.log('数据发送中...')
      }
      ws.onmessage = evt => {
        console.log('数据已接收...')
        // console.log(evt)
        if (evt) {
          this.$notify({
            title: '消息通知',
            duration: 0,
            message: `${evt.data}`,
            onClick: function () {
              vm.$router.push('/home/dynamic')
              this.close()
            }
          })
        }
      }
      // ws.onclose = function() {
      //   // 关闭 websocket
      //   console.log('连接已关闭...')
      // }
      // 组件销毁时调用，中断websocket链接
      this.over = () => {
        ws.close()
      }
    }
  },
  mounted () {
    vm = this
    this.websocket()
  },
  destroyed () {
    this.over()
  }
}
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    width: 100%;
    height: 100%;
  }
  #app {
    font-family: 'MicrosoftYaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }
</style>
