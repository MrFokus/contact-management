<template>
  <div class="flex flex-col w-[320px] gap-4">
    <p class="text-lg font-bold">{{ title }}</p>
    <form @submit.prevent="submit" class="flex flex-col gap-3">
      <div class="input-container">
        <p>Имя</p>
        <input v-model="contactForm.name" autofocus type="text" placeholder="Введите имя" />
      </div>
      <div class="input-container">
        <p>Номер телефона</p>
        <input
          v-model="contactForm.tel"
          type="text"
          v-maska="'+# (###) ### ## ##'"
          placeholder="Введите номер телефона"
        />
      </div>
      <div class="input-container">
        <p>Почта</p>
        <input v-model="contactForm.mail" type="text" placeholder="Введите почту" />
      </div>
      <p class="text-red-500" v-if="error">{{ error }}</p>
      <hr />
      <div class="flex gap-2">
        <button class="clear" @click="emit('close')">Отмена</button>
        <button type="submit" class="primary">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { vMaska } from "maska/vue";
import type { TypeContact } from "~/types/contact";

const contactForm = defineModel<TypeContact>({
  required: false,
  default: {
    id: -1,
    name: "",
    tel: "",
    mail: "",
  },
});
const error = ref("");

const props = defineProps<{
  fnSubmit: Function;
  title: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

function submit() {
  if (isValidForm()) {
    props.fnSubmit(contactForm.value)
    emit('close')
  }
  else {
    setTimeout(() => {
      error.value = "";
    }, 3000);
  }
}

function isValidForm(): boolean {
  if (
    !contactForm.value.name ||
    !contactForm.value.tel ||
    !contactForm.value.mail
  ) {
    error.value = "Все поля должны быть заполнены";
    return false;
  }
  if (!validateMail(contactForm.value.mail)) {
    error.value = "Не верный адрес электронной почты";
    return false;
  }
  return true;
}

function validateMail(mail: string) {
  const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return EMAIL_REGEXP.test(mail);
}
</script>

<style scoped></style>
