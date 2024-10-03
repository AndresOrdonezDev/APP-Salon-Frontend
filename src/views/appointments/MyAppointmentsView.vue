<script setup>
import { useUserStore } from "../../stores/user";
import Appointment from "../../components/Appointment.vue";
const store = useUserStore();
</script>
<template>
  <div>
    <h2 class="text-white text-xl uppercase font-semibold mt-7">mis citas</h2>
    <p v-if="!store.noAppointments" class="text-white text-lg mt-3">
      Administrar y consultar próximas citas
    </p>

    <div
      v-if="store.noAppointments"
      class="text-xl text-white mt-10 text-center font-bold"
    >
      <p v-if="store.loading">Cargando...</p>
      <p v-else>No hay citas citas pendientes</p>
    </div>
    
    <div class="grid gap-2.5 mt-10 mb-10">
      <Appointment
        v-for="appointment in store.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>


