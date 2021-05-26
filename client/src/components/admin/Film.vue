<template>
    <div class="film-panel">
        <ul class="quick-list">
            <li @click="windowToggler(0)" class="quick-item">
                Opret film
            </li>
            <li @click="windowToggler(1)" class="quick-item">
                Slet film
            </li>
            <li @click="windowToggler(2)" class="quick-item">
                Rediger film
            </li>
            <li @click="windowToggler(3)" class="quick-item">
                Se alle film
            </li>
        </ul>
    </div>
    <div class="panel">
        <div v-if="selectedwindows.opret == true">
            <form class="opretform" v-on:submit.prevent="createUser">
                <label for="title">Film titel:</label>
                <input type="text" id="title" name="title">

                <label for="desc">Film beskrivelse:</label>
                <input type="desc" required id="desc" name="desc">

                <label for="navn">Film bedømmelse:</label>
                <input type="text" id="rate" name="rate">

                <label for="efternavn">Film genre:</label>
                <input type="text" id="genre" name="genre">

                <label for="release">Film udgivelsesår:</label>
                <input type="text" id="release" name="release">

                <label for="age">Film aldersgrænse:</label>
                <input type="text" id="age" name="age">

                <label for="nextshow">Film næste show:</label>
                <input name="nextshow" id="nextshow" style="margin: 0; display:flex; margin-top: 10px;" type="date">

                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.slet == true">
            <form class="opretform" v-on:submit.prevent="deleteUser">
                <label for="username">Bruger navn:</label>
                <input type="text" id="username" name="username">
                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.rediger == true">
            <form v-if="userFound == false" class="opretform" v-on:submit.prevent="checkUser">
                <label for="brugernavn">Bruger navn:</label>
                <input type="text" id="brugernavnCheck" name="brugernavnCheck">
                <button type="submit">Submit</button>
            </form>

            <form v-if="userFound" class="opretform" v-on:submit.prevent="editUsers">
                <label for="username">Brugernavn:</label>
                <input v-model="editUser.username" type="text" id="username" name="username">

                <label for="email">Email:</label>
                <input v-model="editUser.email" type="email" id="email" name="email">

                <label for="name">Navn:</label>
                <input v-model="editUser.name" type="text" id="name" name="name">

                <label for="lastname">Efternavn:</label>
                <input v-model="editUser.lastname" type="text" id="lastname" name="lastname">

                <label for="kodeord">Kodeord:</label>
                <input v-model="editUser.password" type="password" id="password" name="password">

                <button type="submit">Submit</button>
            </form>
        </div>
        <div style="color:white" v-if="selectedwindows.seAlle == true">
            <div v-for="item in users.users" :key="item.length">
                {{'Brugernavn: ' + item.username}}<br>
                {{'Email: ' + item.email}}<br>
            </div>
            <div v-for="item in users.user" :key="item.length">
                {{'Brugernavn: ' + item.firstname}}<br>
                {{'Email: ' + item.lastname}}<br><br>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
import { useToast } from "vue-toastification";
import { useStore } from 'vuex'
import { onMounted, reactive, ref } from 'vue'

export default {
    setup(){
        const toast = useToast();
        const state = useStore();
        let userFound = ref(false)
        let users = ref({})

        let editUser = reactive({
            id: 0,
            username: '',
            email: '',
            name: '',
            lastname: '',
            password: ''
        })

        let selectedwindows = reactive({
            opret: false,
            rediger: false,
            slet: false,
            seAlle: false
        })

        function createUser(e) {
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

        function deleteUser(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            
            axios.get('http://localhost:3000/users/' + form.username.value, options)
            .then(response => {
                console.log(response.data)
                if (response.data.status === "OK") {
                    toast.success("Bruger fundet!");

                    axios.delete('http://localhost:3000/users/' + response.data.user.user.userId, options)
                    .then(response => {
                        if (response.data.status === "OK") {
                            toast.success("Bruger slettet!")
                        }
                    })

                    userFound.value = true
                    return true
                }else{
                    toast.error("Bruger findes ikke!");
                    userFound.value = false
                    return false
                }
            })

        }
        
        function getAllUsers() {
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            axios.get('http://localhost:3000/users', options)
            .then(response => {
                if (response.data.status === "OK") {
                    users.value = response.data.user
                    console.log(users.value)
                }else{
                    toast.error("Bruger findes ikke!");
                    return false
                }
            })
        }

        function checkUser(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.get('http://localhost:3000/users/' + form.brugernavnCheck.value, options)
            .then(response => {
                console.log(response.data)
                if (response.data.status === "OK") {
                    toast.success("Bruger fundet!");
                    editUser.username = response.data.user.users.username;
                    editUser.email = response.data.user.users.email;
                    editUser.lastname = response.data.user.user.lastname;
                    editUser.name = response.data.user.user.firstname;
                    editUser.id = response.data.user.users.id;
                    userFound.value = true
                    return true
                }else{
                    toast.error("Bruger findes ikke!");
                    userFound.value = false
                    return false
                }
            })
        }

        function editUsers(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.put('http://localhost:3000/users/' + editUser.id, {
                username: form.username.value,
                password: form.password.value == "" ? '' : form.password.value,
                email: form.email.value,
                firstname: form.name.value,
                lastname: form.lastname.value,
            }, options)
            .then(response => {
                if (response.data.status === "OK") {
                    toast.success("Opdateret bruger!");
                    return true
                }else{
                    toast.error("Noget gik galt!");
                    userFound.value = false
                    return false
                }
            })
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

        onMounted(() => {
            getAllUsers()
            console.log(users.value)
        })

        return { selectedwindows, windowToggler, checkUser, createUser, userFound, editUser, editUsers, users, deleteUser }
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