<template>
    <main class="py-6 px-[calc((100%-1370px)/2)] m-auto">
        <header class="flex justify-between sticky top-0 right-0 left-0 bg-bg-page py-4">
            <button @click="addContact" class="flex px-4 py-2 primary !flex-none w-fit">Добавить контакт</button>
            <Search @search="search = $event"/>
        </header>
        <ContactList :search="search"/>
    </main>
</template>

<script setup lang="ts">
import Search from '~/components/UI/Search.vue';
import ContactList from '~/components/widget/ContactList.vue';

const router = useRouter()
const search = ref<string>("")
function addContact(){
    router.push('?createContact')
}
</script>

<style scoped>

</style>