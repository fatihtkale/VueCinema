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
            <form>
                <ul>
                    <li>
                        <input class="seat" type="radio" name="selected-seat" id="1">
                        <label for='1'><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input class="seat" type="radio" name="selected-seat" id="2">
                        <label for='2'><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input class="seat" type="radio" name="selected-seat" id="3">
                        <label for='3'><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                    <li>
                        <input class="seat" type="radio" name="selected-seat" id="4">
                        <label for='4'><img src="@/assets/seaticon.png" alt="seat_icon"></label>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios';
import { useStore } from 'vuex'
import dayjs from 'dayjs'

export default {
    name: 'movie',
    setup(){
        let movie = ref({});
        let hall = ref({});
        const route = useRoute()
        const state = useStore();

        const options = {
            headers: {'x-access-token': state.state.token}
        };

        onMounted(()=>{
            axios.get('http://localhost:3000/film/movie/' + route.params.id, options)
            .then(response => {
                movie.value = response.data.result;
                movie.value.movieNextShow = dayjs(movie.value.movieNextShow).date() + "/" + (dayjs(movie.value.movieNextShow).month().valueOf() + 1) + "/" + dayjs(movie.value.movieNextShow).year() + " " + dayjs(movie.value.movieNextShow).hour() + ":" + dayjs(movie.value.movieNextShow).minute()
                console.log(movie.value)
            }).catch(error => {
                console.log(error)
            })
            // Get Theater connected to movie
            axios.get('http://localhost:3000/theater', options)
            .then(response => {
                
            }).catch(error => {
                console.log(error)
            })
        })

        return { movie }
    }
}
</script>

<style scoped>
.seat-select {
    margin-top: 25px;
    background-color: #202020;
    padding: 10px;
    border-radius: 5px;
}
.seat-select ul {
    list-style-type: none;
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