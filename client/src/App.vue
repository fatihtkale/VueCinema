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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
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
