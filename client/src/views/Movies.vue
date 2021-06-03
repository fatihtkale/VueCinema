<template>
<div>
	<div v-if="movies.length > 0">
		<div class="movies">
			<div class="movie" v-for="items in movies" :key="items.length">
				<div @click="goToMovie" :id="items.movieId">
					<img :src="items.movieBanner" alt="movie" :id="items.movieId">
					<div class="moviebottom" :id="items.movieId">
						<p style="margin-top:8px;" :id="items.movieId">{{items.movieTitle}}</p>
						<p style="margin-top:8px;color:#404040;" :id="items.movieId">{{items.movieReleaseYear}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<h1 style="text-align:center;color:white;margin-top:200px;">Ingen film.</h1>
	</div>
</div>

</template>

<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
	setup(){
		const state = useStore()
		const router = useRouter()
		let movies = ref([])
		
		onMounted(() => {
			if (state.state.token == "" || state.state.token.length == 0) 
				router.push("login")

			const options = {
				headers: {'x-access-token': state.state.token}
			};

			axios.get('http://localhost:3000/film', options)
			.then(response => {
				movies.value = response.data.result;
				console.log(movies);
			})
		})

		function goToMovie(e) {
			router.push(`/movie/${e.target.id}`)
			console.log(e.target.id);
		}

		return { movies, goToMovie}
	}
}
</script>

<style scoped>
.movies {
	display: flex;
	margin: 10px 50px;
	gap: 10px;
	flex-wrap: wrap;
	flex-direction: row;
}
.movie img {
	width: 230px;
	height: 350px;
	border-radius: 4px;
}
.movie{
	-webkit-box-shadow: 0px 5px 20px 6px rgba(0,0,0,0.5); 
    box-shadow: 0px 5px 20px 6px rgba(0,0,0,0.5);
    background-color: #202020;
    border: 1px solid #303030;
	border-radius: 4px;
	padding: 10px;
	color: white;
	box-sizing: border-box;
	transition: padding 0.2s;
	cursor: pointer;
}
.movie:hover {
	padding-top: 4px;
}
</style>