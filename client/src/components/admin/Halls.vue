<template>
    <div class="panel-wrapper">
        <ul class="quick-list">
            <li @click="windowToggler(0)" class="quick-item">
                Opret hall
            </li>
            <li @click="windowToggler(1)" class="quick-item">
                Slet hall
            </li>
            <li @click="windowToggler(2)" class="quick-item">
                Rediger hall
            </li>
            <li @click="windowToggler(3)" class="quick-item">
                Se alle hall
            </li>
        </ul>
    </div>
    <div class="panel">
        <p style="font-weight: bold; color: #fff; margin-bottom:5px">hall er required til at lave en theater</p>
        <div v-if="selectedwindows.opret == true">
            <form class="opretform" v-on:submit.prevent="createHall">
                
                <label for="availabel">Ledig:</label>
                <input type="number" placeholder="1 = ledig | 0 = fuld" id="availabel" name="availabel">

                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.slet == true">
            <form class="opretform" v-on:submit.prevent="deleteHall">
                <label for="id">Hall ID:</label>
                <input type="text" id="id" name="id">
                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.rediger == true">
            <form v-if="hallFound == false" class="opretform" v-on:submit.prevent="checkHall">
                <label for="hallCheck">Hall ID:</label>
                <input type="text" id="hallCheck" name="hallCheck">
                <button type="submit">Submit</button>
            </form>

            <form v-if="hallFound" class="opretform" v-on:submit.prevent="editHalls">
                <label for="qty">Hall plads:</label>
                <input v-model="editHall.qty" type="text" id="qty" name="qty">

                <label for="availabel">Hall ledig:</label>
                <input v-model="editHall.availabel" type="text" required id="availabel" name="availabel">

                <button type="submit">Submit</button>
            </form>
        </div>
        <div style="color:white" v-if="selectedwindows.seAlle == true">
            <div v-for="item in halls" :key="item.length">
                {{'Hall ID: ' + item.hallId}}<br>
                {{'Hall plads: ' + item.qty}}<br>
                {{'Hall ledig: ' + item.availability}}<br><br>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useToast } from "vue-toastification";
import { useStore } from 'vuex'
import { onMounted, reactive, ref } from 'vue'

export default {
    setup(){
        const toast = useToast();
        const state = useStore();

        let hallFound = ref(false);
        let halls = ref({});

        let editHall = reactive({
            id: 0,
            qty: 0,
            availabel: ''
        })

        let selectedwindows = reactive({
            opret: false,
            rediger: false,
            slet: false,
            seAlle: false
        })

        function createHall(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.post('http://localhost:3000/halls/', {
                availabel: form.availabel.value
            }, options).then(resp => {
                if (resp.data.status == "OK") {
                    return toast.success("Hall oprettet!")
                }
                console.log(resp.data.message)
            }).catch(err => {
                console.log(err)
            })
        }

        function deleteHall(e) {
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            axios.delete('http://localhost:3000/halls/' + e.target.id.value, options)
            .then(resp => {
                if (resp.data.status == "OK") {
                    return toast.success("hall slettet!")
                }
                return toast.error("hall ikke fundet!")
            }).catch(err => {
                console.log(err)
            })
        }
        
        function getAllHall() {
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            axios.get('http://localhost:3000/halls', options)
            .then(response => {
                if (response.data.status === "OK") {
                    halls.value = response.data.result
                }else{
                    return false
                }
            })
        }

        function checkHall(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.get('http://localhost:3000/halls/' + form.hallCheck.value, options)
            .then(response => {
                console.log(response.data)
                if (response.data.status === "OK") {
                    toast.success("Hall fundet!");
                    editHall.id = response.data.result.hallId;
                    editHall.availabel = response.data.result.availability;
                    hallFound.value = true
                    return true
                }else{
                    toast.error("Hall findes ikke!");
                    hallFound.value = false
                    return false
                }
            })
        }

        function editHalls(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.put('http://localhost:3000/halls/' + editHall.id, {
                availabel: form.availabel.value,
            }, options).then(resp => {
                console.log(resp)
                if (resp.data.status == "OK") {
                    return toast.success("Hall opdateret!")
                }
                toast.error(resp.data.message);
            }).catch(err => {
                console.log(err)
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
            getAllHall()
        })

        return { selectedwindows, windowToggler, checkHall, createHall, hallFound, editHalls, editHall, halls, deleteHall }
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
    height: 100%;
    justify-content:space-between
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
.panel-wrapper{
    position: relative;
    height: 100%;
    float: left;    
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