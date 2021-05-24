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

        <div class="admin-wrapper">
            <div v-if="selectedWindow.length != 0" class="admin-panel">
                <Bruger v-if="selectedWindow === 'bruger'"/>
                <Film v-if="selectedWindow === 'film'"/>
                <Theater v-if="selectedWindow === 'theater'"/>
                <Halls v-if="selectedWindow === 'halls'"/>
                <Seats v-if="selectedWindow === 'seat'"/>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
/* Admin panel views */
import Bruger from "../components/admin/Brugere"
import Film from "../components/admin/Film"
import Theater from "../components/admin/Theater"
import Halls from "../components/admin/Halls"
import Seats from "../components/admin/Seats"
export default {
    name: "Admin",
    setup(){
        var selectedWindow = ref("");

        return { selectedWindow }
    },
    components: {
        Bruger,
        Film,
        Theater,
        Halls,
        Seats
    }
}
</script>

<style scoped>
.admin-wrapper{
    display: flex;
    justify-content: center;
}
.admin-panel{
    position: relative;
    width: 80%;
    margin-top: 50px;
    -webkit-box-shadow: 0px 5px 20px 6px rgba(0,0,0,0.5); 
    box-shadow: 0px 5px 20px 6px rgba(0,0,0,0.5);
    background-color: #202020;
    border: 1px solid #303030;
    border-radius: 4px;
}
.admin{
    width: 100%;
}
.radio-knappe{
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
.button-group {
    -webkit-box-shadow: 0px 5px 20px 6px rgba(0,0,0,0.5); 
    box-shadow: 0px 5px 20px 6px rgba(0,0,0,0.5);
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