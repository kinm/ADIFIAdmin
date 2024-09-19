<template>
  <section class="app-main">
    <ScrollPane class="top">
      <el-tag
        v-for="(item,index) in $store.state.routes.list"
        :key="index"
        size="medium"
        :type="$route.path===item.path?'':'info'"
        :effect="$route.path===item.path?'plain':'plain'"
        :closable="$store.state.routes.list.length!==1"
        @click="$router.push(item.path)"
        @close="closeEvent(item)"
      >
        {{ item.meta.title }}
      </el-tag>

    </ScrollPane>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import ScrollPane from './TagsView/ScrollPane'
export default {
  name: 'AppMain',
  components: { ScrollPane },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    closeEvent(item) {
      const _list = this.$store.state.routes.list.filter(i => i.name !== item.name)
      this.$store.commit('routes/SETLIST', _list)
      // 2：如果当前是正在展示的页面，要跳转到其它页面（最後一个页面），没有最後一个了跳转到首页
      if (this.$route.path === item.path) {
        if (_list.length === 0) {
          return
          // this.$router.push('/')
        } else {
          this.$router.push(_list[_list.length - 1].path)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
  ::v-deep .el-tag--plain{
    border-color: transparent;
    background-color: transparent;
  }
}
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  /* min-height: 100vh; */
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f3fa;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
<style lang="scss" scoped>
.top{
  padding:10px 3px;
  .el-tag{
    margin-right:10px;
    cursor: pointer;
  }
}
::v-deep .el-tag{
  font-size:13px;
}
</style>
