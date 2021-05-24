<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      unique-opened
      mode="vertical"
    >
      <el-menu-item :class="sidebar.opened ? '' : 'hideSidebar'" index="1">
        <template>
          <span slot="title">{{ sidebar.opened ? '收起' : '打开' }}</span>
          <hamburger color="white" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        </template>
      </el-menu-item>

      <!-- key值改变route.path -> index -->
      <sidebar-item v-for="(route,index) in permission_routes" :key="index" :item="route" :base-path="route.path" />

    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'

export default {
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger-container {
    line-height: 58px;
    height: 50px;
    float: right;
    padding: 0;
    margin-right: -5px;
  }
</style>
