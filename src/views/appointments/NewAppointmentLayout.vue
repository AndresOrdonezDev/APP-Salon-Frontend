<script setup>
import {onMounted} from "vue";
import {useAppointmentsStore} from '@/stores/appointments'
import {useRoute} from 'vue-router'
const route = useRoute()


const appointments = useAppointmentsStore()

onMounted(()=>{
  appointments.resetAppointment()
})
</script>

<template>
    <div>
        <nav class="my-5 flex gap-3">
            <RouterLink
                :to="{name: 'new-appointment'}"
                class="flex-1 text-center p-2 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
                :class="route.name === 'new-appointment' ? 'bg-blue-600 text-white' : 'bg-white'"
            >
                Servicios
            </RouterLink>
            <RouterLink
                :to="{name: 'appointment-details'}"
                class="flex-1 text-center p-2 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
                :class="route.name === 'appointment-details' ? 'bg-blue-600 text-white' : 'bg-white'"
            >
                Cita y Resumen
            </RouterLink>
        </nav>
        <RouterView/>
    </div>
</template>

