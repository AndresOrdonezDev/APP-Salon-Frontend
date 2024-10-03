<script setup>

import {useAuthStore} from '@/stores/auth'

import { RouterLink } from "vue-router";
const auth = useAuthStore()



</script>
<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-2xl lg:text-5xl font-black text-white">App Salón</h1>
      <div class="flex flex-col space-y-5">
        <div class="flex gap-2 items-center">
          <p class="text-white text-right">Hola: {{auth.userName ? auth.userName :'User'}}</p>

          <button
            type="button"
            class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg transition"
            @click="auth.logout"
          >
            Cerrar Sesión
          </button>
        </div>

        <nav class="flex gap-2 items-center justify-end">
          <RouterLink
            :to="{ name: 'my-appointments' }"
            class="text-gray-100 uppercase p-3 text-xs font-black rounded-lg"
          >
            Mis citas
          </RouterLink>
          <RouterLink
           
            :to="{ name: 'new-appointment' }"
            class="text-gray-100 uppercase p-3 text-xs font-black rounded-lg bg-blue-600"
          >
            Nueva cita
          </RouterLink>
        </nav>
      </div>
    </div>
    <main>
      <RouterView />
    </main>
  </div>
</template>


