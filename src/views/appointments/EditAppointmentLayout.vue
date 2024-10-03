<script setup>
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {useAppointmentsStore} from '../../stores/appointments.js'


const appointments = useAppointmentsStore()

const route = useRoute()

const {id} = route.params

onMounted(async ()=>{
    try {
      await appointments.getAppointmentById(id)
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <div>
        <nav class="my-5 flex gap-3">
            <RouterLink
                :to="{name: 'edit-appointment'}"
                class="flex-1 text-center p-2 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
                :class="route.name === 'edit-appointment' ? 'bg-blue-600 text-white' : 'bg-white'"
            >
                Servicios
            </RouterLink>
            <RouterLink
                :to="{name: 'edit-appointment-details'}"
                class="flex-1 text-center p-2 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
                :class="route.name === 'edit-appointment-details' ? 'bg-blue-600 text-white' : 'bg-white'"
            >
                Cita y Resumen
            </RouterLink>
        </nav>
        <RouterView/>
    </div>
</template>
