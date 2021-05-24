<template>
    <div class="quick-nav">
    <h1 style="color: #43a062;">TC</h1>
    <ul>
      <li class="nav-link">
        <router-link to="#">Film</router-link>
      </li>
      <li class="nav-link">
        <router-link to="#">Om os</router-link>
      </li>
      <li class="nav-link" v-if="isLoggedIn">
        <div @click="dropDown()" class="button">{{user.users.username}}</div>
      </li>
      <li class="nav-link" v-else>
        <router-link class="button" to="/login">Login</router-link>
      </li>
    </ul>
	<div v-if="isLoggedIn" v-show="dropdown" class="dropdown">
		<ul>
			<li v-if="user.users.admin">
				<router-link class="admin-button" to="/admin">Admin</router-link>
			</li>
			<li @click="logout()">
				Logout
			</li>
		</ul>
	</div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex'

export default {
    name: "NavigationMenu",
	props: {
		isLoggedIn: Boolean
	},
	setup(){
		var state = useStore();
		let decoded = ref({});
		let dropdown = ref(false);
		let token = computed(() => state.state.token);

		function dropDown() {
			dropdown.value = !dropdown.value;
		}
		
		function logout(){
			state.dispatch("userLogout")
			dropDown()
		}

		if (state.state.token <= 0) {
			decoded.value = {};
		}else{
			decoded.value = jwt_decode(state.state.token)
		}

		watch(token, (newPath, OldPath) => {
			if (state.state.token <= 0) {
				decoded.value = {};
			}else{
				decoded.value = jwt_decode(state.state.token)
			}
		})

		return { user: decoded, dropDown, dropdown, logout }
	}
}
</script>

<style scoped>
.admin-button{
	display: block;
	color:white; 
	text-decoration:none
}
@media only screen and (max-width : 425px){

}
@media only screen and (max-width : 768px){

}
.button {
	background-color: #59CB7F;
	padding: 9px 17px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;
	user-select: none;
}
.button:hover{
	background-color: #49a568;
}
.quick-nav{
  background-color: #202020;
  border-bottom: 1px solid #303030;
  font-family: 'Poppins', sans-serif;
  padding: 0 40px;
  margin: 0;
  height: 78px;
}
.quick-nav h1{
  font-size: 68px;
  height: 78px;
  display: inline-block;
}
.quick-nav ul{
  list-style-type: none;
  float: right;
}
.quick-nav .nav-link{
  display: inline-block;
}
.quick-nav .nav-link a{
  color: white;
  text-decoration: none;
  line-height: 78px;
  font-size: 18px;
  padding: 9px 15px;
  margin-left: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  user-select: none;
}
.quick-nav .nav-link a:hover{
	background-color:#171717;
}
.quick-nav li div{
  color: white;
  text-decoration: none;
  margin-left: 15px;
  font-size: 18px;
}
.dropdown{
	background-color:#59CB7F;
	position: fixed;
	right: 40px;
	top: 65px;
	width: 150px;
	border-radius: 3px;
}
.dropdown ul{
	width: 100%;
}
.dropdown ul li{
	color: white;
	padding: 10px;
	cursor: pointer;
	transition: background-color 0.3s;
	width:100%;
}
.dropdown ul li:hover{
	background-color: #49a568;
}
</style>