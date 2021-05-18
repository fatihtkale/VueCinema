<template>
  <NavigationMenu :isLoggedIn="loggedIn" />
  <div class="home">
    
  </div>
</template>

<script>
import NavigationMenu from '../components/NavigationMenu'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Home',
  components: {
    NavigationMenu
  },
  setup(){
    var store = useStore();
    let loggedIn = computed(() => store.getters.loggedIn)

    console.log(loggedIn.value)

    return{ loggedIn }
  }
}
</script>

<style scoped>
.home {
  color: white;
}
</style>
