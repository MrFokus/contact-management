<template>
    <tr class="contact text-lg p-2">
         <td class="name font-bold">{{ contact.name }}</td> 
         <td>тел. <a :href="'tel:'+contact.tel">{{ contact.tel }}</a></td>
         <td>Электронная почта: <a :href="'mailto:'+contact.mail">{{ contact.mail }}</a></td>
      <td class="action flex justify-end">
         <button @click="emit('delete',contact.id)" class="!flex-none clear bg-red-500 !text-white">Удалить</button>
         <button @click="emit('edit', contact.id)" class="!flex-none primary">Редактировать</button>
      </td>
    </tr>
</template>

<script setup lang="ts">
import type { TypeContact } from '~/types/contact';

const props = defineProps<{
   contact: TypeContact
}>()
const emit = defineEmits<{
   delete:[number],
   edit:[number]
}>()
</script>

<style scoped>
td {
  padding-top:10px;
  padding-bottom:10px;
  padding-right:10px;   
}

td:first-child {
  padding-left:20px;
  padding-right:0;
}
td:last-child {
  padding-left:0;
  padding-right:20px;
}
a{
   text-decoration: underline;
   color: var(--primary);
}
</style>