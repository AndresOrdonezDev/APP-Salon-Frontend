<script setup>
import { useAppointmentsStore } from "../stores/appointments";
import { formatCurrency } from "@/helpers";

const store = useAppointmentsStore();

defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div 
    @click="store.onServiceSelected(service)"
    class="p-2 space-y-2 rounded-lg cursor-pointer"
    :class="store.isServiceSelected(service._id) ? 'bg-blue-500 text-white': 'bg-white'"
    >
    <p>{{ service.name }}</p>
    <p 
        class="text-lg font-black"
        :class="store.isServiceSelected(service._id) ? 'text-white': 'text-blue-600'"
    >
      {{ formatCurrency(service.price) }}
    </p>
  </div>
  
</template>


