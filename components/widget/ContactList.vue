<template>
  <table class="bg-bg-content rounded-lg p-2 mt-2 w-full">
    <Contact
      @delete="deleteContact"
      @edit="editContactRoute"
      v-for="contact in contacts"
      :contact="contact"
      :key="contact.id"
      class="contact"
    />
    <p class="text-xl text-center p-10" v-if="!contacts.length">
        Контактов пока что нет.<br> Создайте их через кнопку "Добавть контакт"
    </p>
</table>
  <ModalBase v-slot="{ hideModal }" query-name="createContact">
    <ContentModalContact
      :fn-submit="createContact"
      @close="hideModal()"
      title="Создание контакта"
    />
  </ModalBase>
  <ModalBase v-slot="{ hideModal }" query-name="editContact">
    <ContentModalContact
      :fn-submit="editContact"
      v-model="editContactValue"
      @close="hideModal()"
      title="Редактировние контакта"
    />
  </ModalBase>
</template>

<script setup lang="ts">
import type { TypeContact } from "~/types/contact";
import ContentModalContact from "../features/ContentModalContact.vue";
import Contact from "../UI/Contact.vue";
import ModalBase from "../UI/ModalBase.vue";

const contacts = ref<TypeContact[]>([]);
const editContactValue = ref<TypeContact>();
const editContactIndex = ref<number | null>(null);
const route = useRoute();
const router = useRouter();

const props = defineProps<{
    search?:string
}>()
onMounted(async () => {
  if (!localStorage.getItem("contacts")) {
    const response = await $fetch<TypeContact[]>("/contacts.json");
    localStorage.setItem("contacts", JSON.stringify(response));
    localStorage.setItem("countId", JSON.stringify(response.length));
  }
  contacts.value = getContacts();
});

function getNewId() {
  let id = localStorage.getItem("countId");
  if (id) {
    setStorage(+id + 1, "countId");
    return +id + 1;
  }
  return 0;
}

function getContacts(): TypeContact[] | [] {
  if (localStorage.getItem("contacts"))
    return JSON.parse(localStorage.getItem("contacts") ?? "");
  else return [];
}

function setStorage(param: unknown, name: string) {
  localStorage.setItem(name, JSON.stringify(param));
}

function createContact(contact: TypeContact) {
  contact.id = getNewId();
  contacts.value?.push(contact);
  setStorage(contacts.value, "contacts");
}
function editContact() {
  if (editContactIndex.value !== null) {
    contacts.value[editContactIndex.value] = editContactValue.value;
    setStorage(contacts.value, "contacts");
  }
}
function editContactRoute(id: number) {
  if (id >= 0) {
    router.push(`?editContact=${id}`);
  }
}
function deleteContact(id: number) {
  const index = contacts.value.findIndex((c) => c.id == id);
  if (index!==-1) {
    contacts.value.splice(index, 1);
    setStorage(contacts.value, "contacts");
  }
}
watch(
  () => [route.query, contacts.value],
  () => {
    if (route.query.editContact) {
      editContactIndex.value = contacts.value.findIndex(
        (c) => c.id == +route.query.editContact
      );
      editContactValue.value = structuredClone(
        toRaw(contacts.value[editContactIndex.value])
      );
    }
  },
  { immediate: true }
);
watch(()=>props.search,()=>{
    if(props.search){
        contacts.value = getContacts().filter(c=>{
            return c.name.toLowerCase().includes(props.search?.toLowerCase())
        })
    }
    else{
        contacts.value = getContacts()
    }
})
</script>

<style scoped>
.contact{
   border-bottom: 2px solid #f3f4f6;
}
.contact:last-child{
    border-bottom: none;
}
</style>
