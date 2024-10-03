import { ref, computed, onMounted, inject, watch } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import appointmentsAPI from "../api/AppointmentsAPI.js";
import { convertToISO, convertToDDMMYYYY } from "../helpers/index.js";
import { useAuthStore } from "./auth.js";

export const useAppointmentsStore = defineStore("appointments", () => {
  const appointmentId = ref("");
  const services = ref([]);
  const date = ref("");
  const time = ref("");
  const hours = ref([]);
  const appointmentsByDate = ref([]);
  const toast = inject("toast");
  const router = useRouter();
  const useAuth = useAuthStore();

  onMounted(() => {
    const startHour = 8;
    const endHour = 18;
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ":00");
    }
  });

  watch(date, async () => {
    getAppointmentsByDate();
  });

  async function getAppointmentsByDate() {
    if (date.value === "") return;
    const { data } = await appointmentsAPI.getDateByDate(date.value);

    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        (appointment) => appointment._id !== appointmentId.value
      );
      time.value = data.filter(
        (appointment) => appointment._id === appointmentId.value
      )[0].time;
    } else {
      appointmentsByDate.value = data;
    }
  }

  const getAppointmentById = async (id) => {
    try {
      const { data } = await appointmentsAPI.getAppointment(id);
      services.value = data.services;
      date.value = convertToDDMMYYYY(data.date);
      time.value = data.time;
      appointmentId.value = data._id;
      getAppointmentsByDate();
    } catch (error) {
      router.push({ name: "my-appointments" });
    }
  };

  function onServiceSelected(service) {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id
      )
    ) {
      return (services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id
      ));
    } else {
      if (services.value.length == 2) {
        return alert("Puedes escoger máximo 2 servicios por cada cita");
      } else {
        services.value.push(service);
        return;
      }
    }
  }

  async function saveAppointment() {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    };

    if (!appointmentId.value) {
      try {
        const { data } = await appointmentsAPI.createAppointment(appointment);
        toast.open({
          message: data.msg,
          type: "success",
        });
        router.push({ name: "my-appointments" });
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: "error",
        });
      }
    } else {
      try {
        const { data } = await appointmentsAPI.updateAppointment(
          appointmentId.value,
          appointment
        );
        toast.open({
          message: data.msg,
          type: "success",
        });
        router.push({ name: "my-appointments" });
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: "error",
        });
      }
    }
    useAuth.getDataUser();
    resetAppointment();
  }

  async function deleteAppointment(id) {
    if (!id) return;

    try {
      if (confirm("¿Deseas eliminar esta cita?")) {
        const { data } = await appointmentsAPI.deleteAppointment(id);
        
        toast.open({
          message: data.msg,
          type: "success",
        });
        router.push({ name: "my-appointments" });
        useAuth.getDataUser();
      }
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: "error",
      });
    }
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const totalAmount = computed(() =>
    services.value.reduce((total, service) => (total += service.price), 0)
  );

  const isValidReservation = computed(() => {
    const isValid =
      services.value.length && date.value.length && time.value.length;
    return isValid === 0;
  });

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour
      );
    };
  });

  const resetAppointment = () => {
    appointmentId.value = "";
    services.value = [];
    date.value = "";
    time.value = "";
  };

  return {
    onServiceSelected,
    saveAppointment,
    getAppointmentById,
    resetAppointment,
    deleteAppointment,
    isServiceSelected,
    isValidReservation,
    services,
    totalAmount,
    date,
    hours,
    time,
    disableTime,
  };
});
