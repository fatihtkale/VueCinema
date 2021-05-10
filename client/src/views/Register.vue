<template>
  <form class="form" v-on:submit.prevent="onSubmit">
    <div class="login-body">
      <div class="login-icon">Tec & Chill</div>

      <div v-if="passwordVerify == false && password.length != 0 && password2.length != 0 ">
        <h1 style="text-align: center">Kodeord matcher ikke</h1>
      </div>

      <div v-if="validateEmail == false && email.length > 0">
        <h1 style="text-align: center">Invalid email</h1>
      </div>
      
      <input v-model="username" placeholder="Brugernavn" name="username" class="input-field" type="text">
      
      <input v-on:blur="validateEmail" v-model="email" placeholder="Email" name="email" class="input-field" type="text">
      
      <input v-model="firstname" placeholder="Navn" name="firstname" class="input-field" type="text">
      
      <input v-model="lastname" placeholder="Efternavn" name="lastname" class="input-field" type="text">

      <input v-model="password" placeholder="Kodeord" name="password" class="input-field" type="password">

      <input v-on:blur="passwordVerify" v-model="password2" placeholder="indtast kodeord igen" class="input-field" type="password">

      <p style="margin-left: 10px;">Fødselsdag<input v-model="date" style="margin: 0; display:flex; margin-top: 10px;" class="input-field" type="date"></p>

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
import { computed, ref } from 'vue'
export default {
  setup(){
    var username = ref("");
    var email = ref("");
    var firstname = ref("");
    var lastname = ref("");
    var password = ref("");
    var password2 = ref("");
    var date = ref("");

    const validateEmail = computed(() => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email.value).toLowerCase());
    })

    const passwordVerify = computed(() => {
      return password.value == password2.value && password.value.length != 0 && password2.value.length != 0;
    })

    const checkALl = computed(() => {
      return username.value.length != 0 && email.value.length != 0 && firstname.value.length != 0 && lastname.value.length != 0 && passwordVerify.value == true && validateEmail.value == true && date.value != 0;
    })

    function onSubmit(e){
      console.log(date.value)
      console.log(e.target.username.value)
    }

    return { password, password2, email, validateEmail, passwordVerify, onSubmit, username, firstname, lastname, date, checkALl }
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
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
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