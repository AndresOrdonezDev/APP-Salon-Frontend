import api from "../lib/axios.js";

export default {
  createAppointment(data) {
    return api.post("/appointments", data);
  },
  getDateByDate(date){
    return api.get(`/appointments?date=${date}`)
  },
  getUserAppointments(userId){
    return api.get(`/user/${userId}/appointments`)
  },
  getAppointment(id){
    return api.get(`/appointments/${id}`)
  },
  updateAppointment(id, data){
    return api.put(`/appointments/${id}`, data)
  },
  deleteAppointment(id){
    return api.delete(`/appointments/${id}`)
  }
};
