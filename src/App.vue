<template>
  <div id="app">
    <router-view v-if="isLogin()" />
    <div v-show="!isLogin()">
      <div class="slim-header with-sidebar">
        <user />
      </div>
      <div class="slim-body">
        <Menu />
        <div class="slim-mainpanel">
          <router-view />          
        </div>
      </div>
      <Foot />      
    </div>
  </div>
</template>
<script>
import Foot from "./components/layout/Foot";
import Menu from "./components/layout/Menu";
import User from "./components/layout/User";
export default {
  components: {
    Foot,
    Menu,
    User,
  },
  methods: {
    isLogin() {
      return this.$route.path == "/login";
    },
  },
};
</script>
