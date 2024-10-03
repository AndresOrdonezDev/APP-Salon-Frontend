<script setup>
import {useAuthStore} from '@/stores/auth'

const auth = useAuthStore()
</script>


<template>
  <div>
    <div class="flex justify-between">
      <div>
        <h1 class="text-2xl lg:text-5xl font-black text-white">App Salón</h1>
        <h2 class="text-sm lg:text-xl font-black text-white">
          Panel de Administración
        </h2>
      </div>

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

      </div>
    </div>
    <main class="space-y-6">
      <RouterView />
    </main>
  </div>
</template>