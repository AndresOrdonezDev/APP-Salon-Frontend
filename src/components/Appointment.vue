<script setup>
import { displayedDate, formatCurrency } from "../helpers";
import {useAppointmentsStore} from '../stores/appointments'

const appointmentStore = useAppointmentsStore()

defineProps({
  appointment: {
    type: Object,
  },
});
</script>
<template>
  <div class="bg-white space-y-3 rounded-lg p-2">
    <p class="font-bold text-blue-500">
      Fecha:
      <span class="text-gray-600">{{ displayedDate(appointment.date) }}</span>
      Hora: <span class="text-gray-600">{{ appointment.time }}</span>
    </p>
    <p class="text-gray-800">Servicio de la cita:</p>
    <div v-for="service in appointment.services" :key="service._id">
      <p>{{ service.name }}</p>
      <p class="text-blue-600">{{ formatCurrency(service.price) }}</p>
    </div>

    <p class="font-black text-right">
      Total a pagar:
      <span class="text-blue-600">{{
        formatCurrency(appointment.totalAmount)
      }}</span>
    </p>

    <div class="flex gap-2 items-center">
      <RouterLink
        :to="{ name: 'edit-appointment', params: { id: appointment._id } }"
        class="bg-slate-600 rounded-lg p-2 text-white uppercase font-black flex-1 lg:flex-none"
      >
        Editar Cita
      </RouterLink>
      <button
        @click="appointmentStore.deleteAppointment(appointment._id)"
        class="bg-red-600 rounded-lg p-2 text-white uppercase font-black flex-1 lg:flex-none"
      >
        Cancelar Cita
      </button>
    </div>
  </div>
</template>