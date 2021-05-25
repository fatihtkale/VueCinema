<template>
  <NavigationMenu :isLoggedIn="loggedIn" />
  <router-view/>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import NavigationMenu from './components/NavigationMenu'
import { computed } from 'vue'

export default {
  setup(){
    let router = useRouter();
    var vuex = useStore();
    let loggedIn = computed(() => vuex.state.loggedIn)

    const tokenCheck = () => {
      axios.post("http://localhost:3000/validatetoken", {
        token: vuex.state.token
      }).then((resp) => {
        if (resp.data.status != "OK") {
          vuex.dispatch("userLogout");
        }
      })
    }

    watch(router.currentRoute, (newPath, OldPath) => {
      tokenCheck()
    })

    return { loggedIn }
  },
  components: {
    NavigationMenu
  }
}
</script>


<style>
html, body{
  background-color: #171717;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif
}
</style>
