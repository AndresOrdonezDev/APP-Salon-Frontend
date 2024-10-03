<script setup>
import { formatCurrency } from "@/helpers";
import { useAppointmentsStore } from "@/stores/appointments";
const store = useAppointmentsStore();

defineProps({
    service:{
        type:Object,
        required:true
    }
})
</script>
<template>
    <div class="text-white border p-3 mb-1 border-gray-600 rounded-lg flex justify-between items-center">
       <div>
        <p>{{ service.name }}</p>
        <p class="text-blue-400 font-bold">{{ formatCurrency(service.price) }}</p>
       </div>
       <div>
            <button @click="store.onServiceSelected(service)"  type="button" class="bg-red-600  px-2 py-0.5 rounded-lg hover:bg-red-700 transition text-sm">Eliminar</button>
       </div>
    </div>
</template>