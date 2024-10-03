import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AppointmentsAPI from "@/api/AppointmentsAPI";

export const useUserStore = defineStore("user", () => {
  const userAppointments = ref([]);
  const loading = ref(true);
  
  const getUserAppointments = async (userId) => {
    try {
      const { data } = await AppointmentsAPI.getUserAppointments(userId);
      userAppointments.value = data.reverse();
    } catch (error) {
      console.log(error);
    }finally{
      loading.value = false
    }
  };

  const noAppointments = computed(() => userAppointments.value.length === 0);

  return {
    getUserAppointments,
    userAppointments,
    noAppointments,
    loading
  };
});
