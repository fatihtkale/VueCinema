<template>
    <div class="panel-wrapper">
        <ul class="quick-list">
            <li @click="windowToggler(0)" class="quick-item">
                Opret theater
            </li>
            <li @click="windowToggler(1)" class="quick-item">
                Slet theater
            </li>
            <li @click="windowToggler(2)" class="quick-item">
                Rediger theater
            </li>
            <li @click="windowToggler(3)" class="quick-item">
                Se alle theater
            </li>
        </ul>
    </div>
    <div class="panel">
        <div v-if="selectedwindows.opret == true">
            <form class="opretform" v-on:submit.prevent="createTheater">
                <label for="normalrow">Normal række antal:</label>
                <input type="number" id="normalrow" name="normalrow">

                <label for="viprow">Vip række antal:</label>
                <input type="number" id="viprow" name="viprow">

                <label for="selecthall">hallId:</label>
                <select name="selecthall" id="selecthall">
                    <option name="selecthall" :value="items.hallId" v-for="items in halls" :key="items.length">{{items.hallId}}</option>
                </select>

                <label for="selectmovie">MovieId:</label>
                <select name="selectmovie" id="selectmovie">
                    <option name="selectmovie" v-for="items in film" :key="items.length" :value="items.movieId">{{items.movieTitle}}</option>
                </select>

                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.slet == true">
            <form class="opretform" v-on:submit.prevent="deleteTheater">
                <label for="id">Theater ID:</label>
                <input type="text" id="id" name="id">
                <button type="submit">Submit</button>
            </form>
        </div>
        <!-- <div v-if="selectedwindows.rediger == true">
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
        </div> -->
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
        let halls = ref([]);
        let film = ref([])

        let editHall = reactive({
            id: 0,
            qty: '',
            availabel: ''
        })

        let selectedwindows = reactive({
            opret: false,
            rediger: false,
            slet: false,
            seAlle: false
        })

        function createTheater(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            
            axios.post('http://localhost:3000/theater',{
                normalrow: form.normalrow.value,
                viprow: form.viprow.value,
                selecthall: form.selecthall.value,
                selectmovie: form.selectmovie.value
            }, options).then(response => {
                console.log(response);
                editHalls(response.data.result)
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

        function getAllMovies() {
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            axios.get('http://localhost:3000/film', options)
            .then(response => {
                if (response.data.status === "OK") {
                    film.value = response.data.result
                }else{
                    toast.error("Film findes ikke!");
                    return false
                }
            })
        }

        function createSeat(e) {
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            for (let i = 0; i < e.rowQty; i++) {
                    axios.post('http://localhost:3000/seats/', {
                        seat: 10,
                        availability: 1,
                        theaterId: e.theaterId
                }, options).then(resp => {
                    console.log(resp)
                }).catch(err => {
                    console.log(err)
                })
            }

            for (let i = 0; i < e.vipRowQty; i++) {
                axios.post('http://localhost:3000/vipseats/', {
                    seat: 10,
                    availability: 1,
                    theaterId: e.theaterId
                }, options).then(resp => {
                    console.log(resp)
                }).catch(err => {
                    console.log(err)
                })
            }
            editHallsQty(e)
            toast.success("Sæder oprettet");
        }

        async function getAmountOfVipSeats(e) {
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            return await axios.get('http://localhost:3000/vipseats/' + e.theaterId, options)
            .then(response => {
                var result = 0;
                for (let i = 0; i < response.data.result.length; i++) {
                    const element = response.data.result[i];
                    result += element.seat;
                }
                console.log(result)
                return result;
            })
        }

        async function getAmountOfSeats(e) {
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            return await axios.get('http://localhost:3000/seats/' + e.theaterId, options)
            .then(response => {
                var result = 0;
                for (let i = 0; i < response.data.result.length; i++) {
                    const element = response.data.result[i];
                    result += element.seat;
                }
                console.log(result)
                return result;
            })
        }

        async function editHallsQty(e) {
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.put('http://localhost:3000/halls/' + e.hallId, {
                qty: await getAmountOfSeats(e) + await getAmountOfVipSeats(e),
            }, options).then(resp => {
                if (resp.data.status == "OK") {
                    return toast.success("Sæder opdateret!")
                }
                toast.error(resp.data.message);
            }).catch(err => {
                console.log(err)
            })
        }

        function editHalls(e) {
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.put('http://localhost:3000/halls/' + e.hallId, {
                theaterId: e.theaterId,
                qty: null
            }, options).then(resp => {
                if (resp.data.status == "OK") {
                    createSeat(e);
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

        function deleteTheater(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            axios.delete("http://localhost:3000/theater/"+form.id.value, options)
            .then(response => {
                if (response.data.status === "OK") {
                    return toast.success("Theater slettet!")
                }
                return toast.success("Error theater findes ikke!")
            }).catch(err => {
                console.log(err)
            })
        }

        onMounted(() => {
            getAllHall()
            getAllMovies()
        })

        return { selectedwindows, windowToggler, createTheater, hallFound, editHalls, editHall, halls, film, deleteTheater }
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
select { 
    background-color: #171717;
    padding: 5px;
    margin-bottom: 8px;
    color: white;
    border: 1px solid #303030;
    outline: none;
}
</style>