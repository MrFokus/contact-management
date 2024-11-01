<template>
    <form class="flex w-[40%] gap-4" @submit.prevent="emit('search', searchValue)">
        <input class="primary w-full" @input="inputChange($event.target.value)" placeholder="Введите имя контакта для поиска" v-model="searchValue" type="text">
        <button class="primary !flex-none">Поиск</button>
    </form>
</template>

<script setup lang="ts">
const searchValue = ref<string>("")
const emit = defineEmits<{
    search:[string]
}>()
function inputChange(value:string){
    if(!value){
        emit('search','')
    }
}
</script>

<style scoped>

</style>