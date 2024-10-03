<script setup>
import {useUserStore} from "../../stores/user"
import AdminAppointment from '../../components/AdminAppointment.vue'
const store = useUserStore()
</script>

<template>
    <div>
        <p class="text-white mt-5">Listado de las próximas citas pendientes</p>

        <p class="text-white text-center mt-5 text-2xl" v-if="store.loading">Cargando...</p>

        <div v-else>
            <p class="text-white text-center text-2xl mt-7" v-if="store.noAppointments">
                No hay citas pendientes
            </p>

            <div v-for="appointment in store.userAppointments" :key="appointment._id" class="grid grid-cols-1 gap-5 mt-10">
                <AdminAppointment :appointment="appointment"/>
            </div>
        </div>
    </div>

</template>


