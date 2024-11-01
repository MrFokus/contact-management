<template>
        <div v-if="queryName in route?.query" class="outside bg-outside fixed w-full h-full inset-0"></div>
        <dialog open class="bg-bg-content flex-col p-4 fixed m-auto inset-0 w-fit h-fit rounded-lg" v-if="queryName in route?.query" v-on-click-outside="removeOpenModalParam">
            <slot :hideModal="removeOpenModalParam"/>
        </dialog>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
const route = useRoute()
const router = useRouter()
const props = defineProps<{
    queryName:string
}>()

function removeOpenModalParam() {
  const { query } = route
  const newQuery = { ...query }
  delete newQuery[props.queryName]
  router.replace({ query: newQuery })
}
</script>

<style scoped>

</style>