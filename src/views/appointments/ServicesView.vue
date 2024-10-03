<script setup>
    import ServicesItem from '@/components/ServicesItem.vue';
    import {useServicesStore} from '@/stores/services';
    
    const store = useServicesStore()
</script>
<template>
    <div>
        <h2 class="text-white text-xl uppercase font-semibold mt-7">servicios</h2>
        <p class="text-white text-lg mt-3">Elige al menos un servicio para tu cita</p>
        <div class="grid grid-cols-2 gap-5 mt-5">
            <ServicesItem
                v-for="service in store.services"
                :key="service._id"
                :service="service"
            />
        </div>
    </div>
</template>


