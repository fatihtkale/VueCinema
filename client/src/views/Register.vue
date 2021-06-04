<template>
  <form class="form" v-on:submit.prevent="onSubmit">
    <div class="login-icon">Tec & Chill</div>
    <div class="login-body">
      <input v-model="user.username" placeholder="Brugernavn" name="username" class="input-field" type="text">

      <input @blur="validateEmail" v-model="user.email" placeholder="Email" name="email" class="input-field" type="text">

      <input v-model="user.firstname" placeholder="Navn" name="firstname" class="input-field" type="text">

      <input v-model="user.lastname" placeholder="Efternavn" name="lastname" class="input-field" type="text">

      <input v-model="user.password" placeholder="Kodeord" name="password" class="input-field" type="password">

      <input @focus="passwordVerify" v-model="user.password2" placeholder="indtast kodeord igen" class="input-field" type="password">

      <input v-model="user.date" name="birthday" style="margin:0;margin-top:10px;width:100%;" class="input-field" type="date">

      <button class="button" v-if="checkALl" type="submit">Login</button>
      <button class="button red" v-else disabled type="submit">Login</button>

      <div class="login-footer">
        <router-link to="login">Allerede bruger?</router-link>
        <router-link to="#">Glemt Adgangskode</router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import dayjs from 'dayjs'
import { useToast } from "vue-toastification";

export default {
  setup(){
    const router = useRouter()
    const toast = useToast();

    let user = reactive({
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      password2: "",
      date: ""
    })

    const validateEmail = () => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = re.test(String(user.email).toLowerCase());

      if (result == false) {
        return toast.error('Email is invalid!')
      }

      return true
    }

    const passwordVerify = () => {
      if (user.password != user.password2 && user.password2.length >= 0 && user.password.length >= 0) {
        return false
      }
      return true
    }

    const checkALl = computed(() => {
      return user.username.length != 0 && user.email.length != 0 && user.firstname.length != 0 && user.lastname.length != 0 && passwordVerify() == true && validateEmail() == true && user.date != 0;
    })

    function onSubmit(e){
      var form = e.target;
      axios.post('http://localhost:3000/users', {
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        birthday: dayjs(form.birthday.value).toDate(),
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
      }).then((response) => {
        if (response.data.status === "OK"){
          toast.success('Registered!')
          router.push("login")
        }else{
          toast.error("User already exsist!")
        }
      }).catch(error => {
        console.log(error)
      })
    }

    return {
      user, validateEmail, passwordVerify,
      onSubmit, checkALl
    }
  }
}
</script>

<style scoped>

.form{
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%, 0);
  position: absolute;
  background-color: #202020;
  border: 2px solid #303030;
  border-radius: 8px;
  padding: 25px 44px;
}
.login-body{
  font-family: 'Poppins', sans-serif;
  color: white;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center
}
.login-icon{
  text-align: center;
  font-size: 69px;
  font-weight: bold;
  color: #51B973;
}
.input-field{
  padding: 8px;
  font-size: 20px;
  color: white;
  background-color: #3F3F3F;
  border: 2px solid #707070;
  border-radius: 5px;
  outline: none;
  flex: 1 0 auto;
  box-sizing: border-box;
  margin: 10px
}
.text{
  font-size: 20px;
  font-weight: normal;
  margin: 8px 0;
  display: inline-block;
}
.button{
  width: 100%;
  background-color: #59CB7F;
  border: 2px solid #51B973;
  border-radius: 5px;
  padding: 13px 0;
  color: white;
  font-size: 20px;
  margin-top: 60px;
  cursor:pointer
}
.login-footer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  align-items: space-between;
}
.login-footer a{
  font-size: 20px;
  text-decoration: none;
  color: #5a5a5a;
  margin-top: 60px;
  margin-bottom: 11px;
}
.red {
  background-color: #E74C3C;
  border-color: #ca4334;
  cursor:no-drop
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (max-width : 425px){
  .form{
    padding-right: 10px;
    padding-left: 10px;
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (max-width : 768px){
  .form{
    width: 100%;
    border-radius: 0 !important;
  }
  .input-field{
    margin-right: 0;
  }
}
</style>