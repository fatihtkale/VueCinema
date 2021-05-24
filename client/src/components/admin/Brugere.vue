<template>
    <div class="bruger-panel">
        <ul class="quick-list">
            <li @click="windowToggler(0)" class="quick-item">
                Opret bruger
            </li>
            <li @click="windowToggler(1)" class="quick-item">
                Slet bruger
            </li>
            <li @click="windowToggler(2)" class="quick-item">
                Rediger bruger
            </li>
            <li @click="windowToggler(3)" class="quick-item">
                Se alle bruger
            </li>
        </ul>
    </div>
    <div class="panel">
        <div v-if="selectedwindows.opret == true">
            <form class="opretform" v-on:submit.prevent="opretBruger">
                <label for="brugernavn">Brugernavn:</label>
                <input type="text" id="brugernavn" name="brugernavn">

                <label for="email">Email:</label>
                <input type="email" required id="email" name="email">

                <label for="navn">Navn:</label>
                <input type="text" id="navn" name="navn">

                <label for="efternavn">Efternavn:</label>
                <input type="text" id="efternavn" name="efternavn">

                <label for="kodeord">Kodeord:</label>
                <input type="password" id="kodeord" name="kodeord">

                <label for="birthday">Fødselsdag:</label>
                <input name="birthday" id="birthday" style="margin: 0; display:flex; margin-top: 10px;" type="date">

                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.slet == true">
            <form class="opretform" v-on:submit.prevent="OpretBruger">
                <label for="brugernavn">Bruger navn:</label>
                <input type="text" id="brugernavn" name="brugernavn">
                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.rediger == true">
            <form class="opretform" v-on:submit.prevent="OpretBruger">
                <label for="brugernavn">Bruger navn:</label>
                <input type="text" id="brugernavn" name="brugernavn">
                <button type="submit">Submit</button>
            </form>
            
            <form v-if="false" class="opretform" v-on:submit.prevent="OpretBruger">
                <label for="brugernavn">Brugernavn:</label>
                <input type="text" id="brugernavn" name="brugernavn">

                <label for="email">Email:</label>
                <input type="email" id="email" name="email">

                <label for="navn">Navn:</label>
                <input type="text" id="navn" name="navn">

                <label for="efternavn">Efternavn:</label>
                <input type="text" id="efternavn" name="efternavn">

                <label for="kodeord">Kodeord:</label>
                <input type="password" id="kodeord" name="kodeord">

                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.seAlle == true">
            en eller anden funktion
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import dayjs from 'dayjs'
import { useToast } from "vue-toastification";
import axios from 'axios'

export default {
    setup(){
        const toast = useToast();

        let selectedwindows = reactive({
            opret: false,
            rediger: false,
            slet: false,
            seAlle: false
        })

        function opretBruger(e) {
            var form = e.target;
            axios.post('http://localhost:3000/users', {
              firstname: form.navn.value,
              lastname: form.efternavn.value,
              username: form.brugernavn.value,
              email: form.email.value,
              birthday: dayjs(form.birthday.value).toDate(),
              password: form.kodeord.value
            }).then((response) => {
              if (response.data.status === "OK"){
                toast.success('Registeret!')
              }else{
                toast.error("Bruger eksister allerede!")
              }
            }).catch(error => {
              console.log(error)
            })
        }

        function sletBruger(e) {
            
        }

        function redigerBruger(e) {
            
        }

        function windowToggler(window) {
            if (window == 0) {
                selectedwindows.opret = true;
                selectedwindows.rediger = false;
                selectedwindows.seAlle = false;
                selectedwindows.slet = false;
            }
            if (window == 1) {
                selectedwindows.opret = false;
                selectedwindows.rediger = false;
                selectedwindows.seAlle = false;
                selectedwindows.slet = true;
            }
            if (window == 2) {
                selectedwindows.opret = false;
                selectedwindows.rediger = true;
                selectedwindows.seAlle = false;
                selectedwindows.slet = false;
            }
            if (window == 3) {
                selectedwindows.opret = false;
                selectedwindows.rediger = false;
                selectedwindows.seAlle = true;
                selectedwindows.slet = false;
            }
        }

        return { selectedwindows, windowToggler, redigerBruger, opretBruger }
    }
}
</script>

<style scoped>
.quick-list{
    list-style-type: none;
    float: left;
    border-right: 1px solid #303030;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 38px;
}
.quick-item {
    cursor: pointer;
    background-color:#171717;
    color: white;
    padding: 10px;
    border-radius: 8px;
    margin: 20px;
}
.panel{
    margin: 10px 20px;
}
.opretform{
    display: flex;
    flex-direction: column;
}
.opretform label{
    color: white;
    margin-bottom: 8px;
}
.opretform input{
    margin-bottom: 10px;
    padding: 9px;
    background-color: #171717;
    border: 1px solid #303030;
    color: white;
    outline: none;
    border-radius: 4px;
}
.opretform button{
    padding: 10px;
    font-size: 18px;
    border: 1px solid #303030;
    background-color: #171717;
    color: white;
    border-radius: 4px;
}
</style>