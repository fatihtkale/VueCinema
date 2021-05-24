
<template>
    <div class="bruger-panel">
        <ul class="quick-list">
            <li class="quick-item">
                Opret hall
            </li>
            <li class="quick-item">
                Slet hall
            </li>
            <li class="quick-item">
                Rediger hall
            </li>
            <li class="quick-item">
                Se alle hall
            </li>
        </ul>
    </div>
    <div class="panel">
        
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.quick-list{
    list-style-type: none;
    float: left;
    border-right: 1px solid #303030;
}
.quick-item {
    cursor: pointer;
    background-color:#171717;
    color: white;
    padding: 10px;
    border-radius: 8px;
    margin: 20px;
}
</style>