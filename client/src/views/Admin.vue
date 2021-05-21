<template>
    <div class="admin">
        <div class="radio-knappe">
            <div class="button-group" data-toggle="buttons">
                <label class="button">
                    <input v-model="selectedWindow" type="radio" name="options" id="option1" value="bruger">
                    <span>Brugere</span>
                </label>
                <label class="button">
                    <input v-model="selectedWindow" type="radio" name="options" id="option2" value="film"> 
                    <span>Film</span>
                </label>
                <label class="button">
                    <input v-model="selectedWindow" type="radio" name="options" id="option3" value="halls"> 
                    <span>Halls</span>
                </label>
                <label class="button">
                    <input v-model="selectedWindow" type="radio" name="options" id="option3" value="theater"> 
                    <span>Theaters</span>
                </label>
                <label class="button">
                    <input v-model="selectedWindow" type="radio" name="options" id="option3" value="seat"> 
                    <span>Seats</span>
                </label>
            </div>
        </div>
        {{selectedWindow}}
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: "Admin",
    setup(){
        var selectedWindow = ref("");

        return { selectedWindow }
    }
}
</script>

<style scoped>
.admin{
    width: 100%;
}
.radio-knappe{
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
.button-group {
    background-color: #202020;
    border: 1px solid #303030;
    border-radius: 8px;
}
.button {
    color: white;
    display: inline-block;
    cursor: pointer;
    border-right: 1px solid #303030;
    width: 100px;
    text-align: center;
}
.button:last-child {
    border:none;
}
.active {
    background-color: #303030;
}
.button input {
    appearance: none;
}
.button span {
    padding: 10px;
    width: 100%;
    display: inline-block;
}
.button input:checked + span {
    font-weight: bold;
    background-color: #303030;
} 
</style>