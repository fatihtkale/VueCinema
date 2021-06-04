<template>
    <div class="container">
        <div class="movie-content">
            <img class="movie-banner" :src="movie.movieBanner" alt="moviebanner">
            <div class="movie-desc">
                <h1 class="movie-title">{{movie.movieTitle}}</h1>
                <p>Movie age limit:</p>
                <p class="movie-text">{{movie.movieAgeLimit}}</p>
                <p>Movie genre:</p>
                <p class="movie-text">{{movie.movieGenre}}</p>
                <p>Movie rating:</p>
                <p class="movie-text">{{movie.movieRating}}</p>
                <p>Movie release year:</p>
                <p class="movie-text">{{movie.movieReleaseYear}}</p>
                <p>Movie description:</p>
                <p class="movie-text">{{movie.movieDescription}}</p>
                <p>Movie next show:</p>
                <p class="movie-text">{{movie.movieNextShow}}</p>
            </div>
        </div>
        <div style="clear:both"></div>
        <div class="seat-select">
            <form v-on:submit.prevent="onSubmit">
                <p style="color:white;text-align:center">yellow border = VIP, non yellow = not vip</p>
                <div>

                <img class="theater" src="@/assets/theater.png" alt="theater">
                </div>
                <ul v-for="(items, i) in commonRows" :key="items.length">
                    <li>
                        <input :value="i+'A'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'A'">
                        <label :for="i+'A'"><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input :value="i+'B'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'B'">
                        <label :for="i+'B'"><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input :value="i+'C'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'C'">
                        <label :for="i+'C'"><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input :value="i+'D'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'D'">
                        <label :for="i+'D'"><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input :value="i+'E'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'E'">
                        <label :for="i+'E'"><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                </ul>
                <ul v-for="(items, i) in vipRows" :key="items.length">
                    <li>
                        <input :value="i+'VA'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'VA'">
                        <label :for="i+'VA'"><img style="border: 2px solid yellow;border-radius:8px;" src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input :value="i+'VB'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'VB'">
                        <label :for="i+'VB'"><img style="border: 2px solid yellow;border-radius:8px;" src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input :value="i+'VC'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'VC'">
                        <label :for="i+'VC'"><img style="border: 2px solid yellow;border-radius:8px;" src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input :value="i+'VD'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'VD'">
                        <label :for="i+'VD'"><img style="border: 2px solid yellow;border-radius:8px;" src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input :value="i+'VE'" v-model="selectedSeat" class="seat" type="radio" name="selectedseat" :id="i+'VE'">
                        <label :for="i+'VE'"><img style="border: 2px solid yellow;border-radius:8px;" src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                </ul>
                <button class="button" type="submit">Buy</button>
            </form>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";
import axios from 'axios';
import dayjs from 'dayjs'

export default {
    name: 'movie',
    setup(){
        let movie = ref({});
        let theater = {};
        let commonRows = ref();
        let vipRows = ref();
        let selectedSeat = ref();
        const route = useRoute()
        const state = useStore();
        const toast = useToast();

        const options = {
            headers: {'x-access-token': state.state.token}
        };

        onMounted(async () => {
            await axios.get('http://localhost:3000/film/movie/' + route.params.id, options)
            .then(response => {
                movie.value = response.data.result;
                movie.value.movieNextShow = dayjs(movie.value.movieNextShow).date() + "/" + (dayjs(movie.value.movieNextShow).month().valueOf() + 1) + "/" + dayjs(movie.value.movieNextShow).year() + " " + dayjs(movie.value.movieNextShow).hour() + ":" + dayjs(movie.value.movieNextShow).minute()
            }).catch(error => {
                console.log(error)
            })
            // Get Theater connected to movie
            await axios.get('http://localhost:3000/theater', options)
            .then(response => {
                for (let i = 0; i < response.data.response.length; i++) {
                    const e = response.data.response[i];
                    if (e.movieId == route.params.id) {
                        theater = e;
                    }
                }
            }).catch(error => {
                console.log(error)
            })
            //getRows
            await axios.get('http://localhost:3000/seats/' + theater.theaterId, options)
            .then(response => {
                commonRows.value = response.data.result
            })

            await axios.get('http://localhost:3000/vipseats/' + theater.theaterId, options)
            .then(response => {
                vipRows.value = response.data.result
            })
        })

        function onSubmit(e){
            var form = e.target;
            const options = {
                headers: {'x-access-token': state.state.token}
            };
            axios.get('http://localhost:3000/ticket/' + form.selectedseat.value, options)
            .then(function(response) {
                if (response.data.response) {
                    toast.error("Seat already taken!")
                }else{
                    axios.post('http://localhost:3000/ticket',{
                        hallId: theater.hallId,
                        movieId: theater.movieId,
                        theaterId: theater.theaterId,
                        rowId: form.selectedseat.value.split('')[0],
                        seat: form.selectedseat.value.split('')[1],
                    }, options).then(function(result) {
                        toast.success("Seat bought!")
                    })
                }
            })
        }
        
        return { movie, commonRows, vipRows, selectedSeat, onSubmit}
    }
}
</script>

<style scoped>
.theater {
    width: 100%;
    padding: 20px 50px;
    display: block !important;
    margin: 0 auto;
}
.button {
    width: 100%;
    background-color: #59CB7F;
    border: 2px solid #51B973;
    border-radius: 5px;
    padding: 13px 0;
    color: white;
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer;
}
.seat-select {
    margin-top: 25px;
    background-color: #202020;
    padding: 10px;
    border-radius: 5px;
}
.seat-select ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    gap: 50px;
}
.seat-select li {
    display: inline;
    padding: 2px;
}
.seat-select input {
    visibility:hidden;
}
.seat-select label{
    position: relative;
}
.seat-select img{
    display: inline;
}
input:checked + label {
    background: blue;
}
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
.movie-content{
    margin-top: 25px;
    position: relative;
    color:white;
}
.movie-content .movie-banner{
    width: 350px;
    float: left;
    border-radius: 4px;
}
.movie-content .movie-desc{
    float: left;
    width: 60%;
}
.movie-content .movie-desc h1 {
    margin-bottom: 15px;
}
.movie-content .movie-desc p, h1{
    margin-left: 50px;
}
.movie-content .movie-desc p{
    padding-top: 8px;
    padding-bottom: 8px;
}
.movie-content .movie-desc .movie-text{
    border-bottom: 1px solid #303030;
}
</style>