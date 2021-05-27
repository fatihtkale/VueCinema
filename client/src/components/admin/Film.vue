<template>
    <div class="panel-wrapper">
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
            <form class="opretform" v-on:submit.prevent="createFilm">
                <label for="title">Film titel:</label>
                <input type="text" id="title" name="title">

                <label for="desc">Film beskrivelse:</label>
                <input type="text" id="desc" name="desc">

                <label for="navn">Film bedømmelse:</label>
                <input type="text" id="rate" name="rate">

                <label for="efternavn">Film genre:</label>
                <input type="text" id="genre" name="genre">

                <label for="release">Film udgivelsesår:</label>
                <input type="text" id="release" name="release">

                <label for="banner">Film banner:</label>
                <input type="text" id="banner" name="banner">

                <label for="age">Film aldersgrænse:</label>
                <input type="text" id="age" name="age">

                <label for="nextshow">Film næste show:</label>
                <input name="nextshow" id="nextshow" style="margin: 0; display:flex; margin-top: 10px;" type="date">

                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.slet == true">
            <form class="opretform" v-on:submit.prevent="deleteFilm">
                <label for="title">Film title:</label>
                <input type="text" id="title" name="title">
                <button type="submit">Submit</button>
            </form>
        </div>
        <div v-if="selectedwindows.rediger == true">
            <form v-if="filmFound == false" class="opretform" v-on:submit.prevent="checkFilm">
                <label for="filmCheck">Film title:</label>
                <input type="text" id="filmCheck" name="filmCheck">
                <button type="submit">Submit</button>
            </form>

            <form v-if="filmFound" class="opretform" v-on:submit.prevent="editFilms">
                <label for="title">Film titel:</label>
                <input v-model="editFilm.title" type="text" id="title" name="title">

                <label for="desc">Film beskrivelse:</label>
                <input v-model="editFilm.desc" type="desc" required id="desc" name="desc">

                <label for="navn">Film bedømmelse:</label>
                <input v-model="editFilm.rating" type="text" id="rate" name="rate">

                <label for="efternavn">Film genre:</label>
                <input v-model="editFilm.genre" type="text" id="genre" name="genre">

                <label for="release">Film udgivelsesår:</label>
                <input v-model="editFilm.release" type="text" id="release" name="release">

                <label for="age">Film aldersgrænse:</label>
                <input v-model="editFilm.age" type="text" id="age" name="age">

                <button type="submit">Submit</button>
            </form>
        </div>
        <div style="color:white" v-if="selectedwindows.seAlle == true">
            <div v-for="(item, index) in film.result" :key="item.length">
                {{'Titel: ' + item.movieTitle}}<br>
                {{'Beskrivelse: ' + item.movieDescription}}<br>
                {{'Genre: ' + item.movieGenre}}<br>
                {{'Film rating: ' + item.movieRating}}<br>
                {{'Set: ' + film.detailsResult[index].movieView}}<br>
                {{'Profit: ' + film.detailsResult[index].movieProfit}}<br>
                {{'Næste afspilning: ' + film.detailsResult[index].movieNextShow}}<br><br>
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
import dayjs from 'dayjs'

export default {
    setup(){
        const toast = useToast();
        const state = useStore();

        let filmFound = ref(false)
        let film = ref({})

        let editFilm = reactive({
            id: 0,
            title: '',
            desc: '',
            rating: 0,
            genre: '',
            release: '',
            age: '',
        })

        let selectedwindows = reactive({
            opret: false,
            rediger: false,
            slet: false,
            seAlle: false
        })

        function createFilm(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.post('http://localhost:3000/film/', {
                title: form.title.value,
                desc: form.desc.value,
                rate: form.rate.value,
                genre: form.genre.value,
                release: form.release.value,
                age: form.age.value,
                nextshow: form.nextshow.value,
                banner: form.banner.value
            }, options).then(resp => {
                if (resp.data.status == "OK") {
                    return toast.success("Film oprettet!")
                }
                toast.error(resp.data.message);
            }).catch(err => {
                console.log(err)
            })
        }

        function deleteFilm(e) {
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            axios.delete('http://localhost:3000/film/' + e.target.title.value, options)
            .then(resp => {
                if (resp.data.status == "OK") {
                    return toast.success("Film slettet!")
                }
                return toast.error("Film ikke fundet!")
            }).catch(err => {
                console.log(err)
            })
        }
        
        function getAllFilm() {
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            axios.get('http://localhost:3000/film', options)
            .then(response => {
                if (response.data.status === "OK") {
                    film.value = response.data
                    console.log(film.value)
                }else{
                    toast.error("Film findes ikke!");
                    return false
                }
            })
        }

        function checkFilm(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.get('http://localhost:3000/film/' + form.filmCheck.value, options)
            .then(response => {
                console.log(response.data)
                if (response.data.status === "OK") {
                    toast.success("film fundet!");
                    editFilm.id = response.data.result.movieId;
                    editFilm.title = response.data.result.movieTitle;
                    editFilm.desc = response.data.result.movieDescription;
                    editFilm.rating = response.data.result.movieRating;
                    editFilm.genre = response.data.result.movieGenre;
                    editFilm.release = response.data.result.movieReleaseYear;
                    editFilm.age = response.data.result.movieAgeLimit;
                    editFilm.nextShow = response.data.result.movieNextShow;
                    filmFound.value = true
                    return true
                }else{
                    toast.error("film findes ikke!");
                    filmFound.value = false
                    return false
                }
            })
        }

        function editFilms(e) {
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };

            axios.put('http://localhost:3000/film/' + editFilm.id, {
                title: form.title.value,
                desc: form.desc.value,
                rate: form.rate.value,
                genre: form.genre.value,
                release: form.release.value,
                age: form.age.value,
            }, options).then(resp => {
                console.log(resp)
                if (resp.data.status == "OK") {
                    return toast.success("Film opdateret!")
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
            getAllFilm()
            console.log(film.value)
        })

        return { selectedwindows, windowToggler, checkFilm, createFilm, filmFound, editFilms, editFilm, film, deleteFilm }
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