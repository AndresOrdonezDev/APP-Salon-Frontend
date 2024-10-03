import { defineStore } from "pinia";
import {useRouter} from 'vue-router'
import { inject, ref, onMounted, computed } from "vue";
import { reset } from "@formkit/vue";
import AuthAPI from "../api/AuthAPI.js";
import {useUserStore} from './user.js'

export const useAuthStore = defineStore("auth", () => {
  const userStore = useUserStore()
  const router = useRouter()
  const toast = inject("toast");
  const isVerified = ref(false)
  const user = ref({})

  onMounted(async ()=>{
    const token = localStorage.getItem('Token-AppSalon')
    if(token){
      getDataUser()
    }
  })
  
  const getDataUser = async ()=>{
    try {
      const {data} = await AuthAPI.auth()
      user.value = data
      await userStore.getUserAppointments(user.value._id)
      
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  
  const userName = computed(()=> user.value.name)

  const createUser = async (formData) => {
    try {
      const { data } = await AuthAPI.register(formData);
      toast.open({
        message: data.msg,
        type: "success",
      });
      reset("registerForm");
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: "error",
      });
    }
  };

  const verifyAccount = async (token) => {
    try {
      const { data } = await AuthAPI.verifyAccount(token);
      toast.open({
        message: data.msg,
        type: "success",
      });
      isVerified.value = true
      setTimeout(()=>{
        router.push({name:'login'})
      },3000)
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: "error",
      });
    }
  };

  const login = async (formData) =>{
    
    try {
      const {data} = await AuthAPI.login(formData)
      toast.open({
        message: data.msg,
        type: "success",
      });
      localStorage.setItem('Token-AppSalon',data.token)
      getDataUser()
      router.push({name:'my-appointments'})
      
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: "error",
      });
    }
  }

  function logout(){
    localStorage.removeItem('Token-AppSalon')
    router.push({name:'login'})
  }

  const forgotPassword = async (formData)=>{
    try {
      const {data} = await AuthAPI.forgotPassword(formData)
      toast.open({
        message: data.msg,
        type:"success"
      })
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type:"error"
      })
    }
    
  }

  const verifyTokenResetPassword = async ({token}) =>{
    try {
      const {data} = await AuthAPI.verifyTokenResetPassword(token)
      toast.open({
        message:data.msg,
        type:"success"
      })
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type:"error"
      })

      router.push({name:'login'})
    }
  }

  const updatePassword = async (token, password)=>{
    try {
      const {data} = await AuthAPI.updatePassword(token,password)
      toast.open({
        message:data.msg,
        type:"success"
      })
      router.push({name:"login"})
    } catch (error) {
      toast.open({
        message:error.response.data.msg,
        type:"error"
      })
    }
  }
  
  return {
    getDataUser,
    createUser,
    verifyAccount,
    login,
    logout,
    forgotPassword,
    verifyTokenResetPassword,
    updatePassword,
    userName,
    isVerified
  };
});
