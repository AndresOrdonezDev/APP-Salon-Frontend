import api from "@/lib/axios";

export default {
  register(data) {
    return api.post("/auth/register", data);
  },

  verifyAccount(token) {
    return api.get(`/auth/verify/${token}`);
  },

  login(data) {
    return api.post("/auth/login", data);
  },

  forgotPassword(data){
    return api.post("/auth/forgot-password", data)
  },

  verifyTokenResetPassword(token){
    return api.get(`/auth/forgot-password/${token}`)
  },
  updatePassword(token,data){
    return api.post(`/auth/forgot-password/${token}`,data)
  },
  admin(){
    return api.get('/auth/admin')
  },

  auth() {
    return api.get("/auth/user");
  },
};


