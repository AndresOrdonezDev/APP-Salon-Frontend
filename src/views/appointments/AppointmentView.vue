<script setup>
import { ref } from "vue";
import calendar from "vue-tailwind-datepicker";
import SelectedServices from "@/components/SelectedServices.vue";
import { useAppointmentsStore } from "@/stores/appointments";
import { formatCurrency } from "@/helpers";

const store = useAppointmentsStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMMM",
});



const disableDate = (date) =>{
  //the property [0] refers to Sunday, 
  // if you want to disabled other day 
  //you should include on array example: [0,6] refers to sunday and saturday
  const today = new Date()
  
  return date < today || date.getMonth() > today.getMonth() || [0].includes(date.getDay())
}

</script>
<template>
  <div>
    <p
      v-if="store.totalAmount === 0"
      class="text-white text-center text-xl mt-20"
    >
      No hay servicios <span class="text-blue-200">seleccionados</span>
    </p>
    <div v-else>
      <h2 class="text-white text-xl uppercase font-semibold mt-7">
        Detalles de tu cita y resumen
      </h2>
      <p class="text-white text-lg mt-3">
        Verifica la información para confirmar
      </p>

      <h3 class="text-white text-xl text-center mt-6">Servicios</h3>

      <div class="grid gap-2 mt-5">
        <SelectedServices
          v-for="service in store.services"
          :key="service._id"
          :service="service"
        />
        <p class="text-right text-white lg:text-xl">
          Total a pagar:
          <span class="font-bold">{{ formatCurrency(store.totalAmount) }}</span>
        </p>
      </div>
      <div class="space-y-8 mt-10">
        <h3 class="lg:text-xl font-bold text-white">Fecha y Hora</h3>

        <!-- time and date section  -->
        <div class="lg:flex gap-5 items-start">

          <!-- calendar -->
          <div class="w-full lg:w-96 flex justify-center rounded-lg">
            <calendar
              :disable-date="disableDate"
              disable-in-range
              i18n="es-mx"
              as-single
              no-input
              :formatter="formatter"
              v-model="store.date"
            />
          </div>
          <!-- end of calendar -->

          <!-- time and hour -->
          <div
           v-if="store.date"
            class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0"
          >
            <button
              v-for="hour in store.hours"
              
              :key="hour"
              class="block p-1 rounded-lg disabled:opacity-10"
              :class="
                store.time === hour
                  ? 'text-white bg-blue-500'
                  : 'bg-white font-bold text-blue-700'
              "
              @click="store.time = hour"
              :disabled="store.disableTime(hour)"
              
            >
            {{ hour }}
            </button>
          </div>
          <!-- end of time end hour -->

        </div>
        <!-- end of time and date section -->

         <!-- bconfirm reservation button -->
         <div class="flex justify-end">
            <button
              class="w-full md:w-auto bg-blue-500 p-2 rounded-lg text-white font-bold"
              :disabled="store.isValidReservation "
              :class="store.isValidReservation ? 'opacity-50' : 'opacity-100'"
              @click="store.saveAppointment"
            >
              Confirmar Reservación
            </button>
          </div>
          <!-- end of confirm reservation button-->
      </div>
    </div>
  </div>
</template>