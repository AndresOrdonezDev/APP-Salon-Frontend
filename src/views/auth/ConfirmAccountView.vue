<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import {useAuthStore} from '../../stores/auth.js'

const auth = useAuthStore()
const route = useRoute();

onMounted(async () => {
  const { token } = route.params;
    auth.verifyAccount(token)
});
</script>
<template>
  <div class="text-white rounded-lg p-5 font-bold lg:mt-32" :class="auth.isVerified ? 'bg-blue-700' : 'bg-red-700 ' ">{{ auth.isVerified ? 'Gracias por confirmar' : 'El token ha espirado o no es una url original' }}</div>
</template>