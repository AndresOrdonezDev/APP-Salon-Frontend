<script setup>
import {onMounted} from 'vue'
import {useRoute} from "vue-router"
import {useAuthStore} from '../../stores/auth'
import {reset} from '@formkit/core'
const router = useRoute()
const store = useAuthStore()

onMounted(()=>{
    store.verifyTokenResetPassword(router.params)
})

const handleSubmit = async (formData)=>{
  const {token} = router.params
  store.updatePassword(token, formData)
  reset('newPassword')
}

</script>

<template>
   <div>
    <h1 class="text-white text-2xl uppercase font-bold text-center">
      Nueva contraseña
    </h1>
    <p
      class="text-white text-center font-bold border-b-2 border-white pb-3 mb-10"
    >
      Restablece tu contraseña para ingresar
    </p>
    <FormKit
      id="newPassword"
      type="form"
      :actions="false"
      incomplete-message="No se pudo iniciar, revisa los campos"
      @submit="handleSubmit"
    >
    <FormKit
        type="password"
        label="Contraseña"
        name="password"
        placeholder="Establece una contraseña de 8 caracteres"
        validation="required|length:8"
        :validation-messages="{
          required: 'Debes establecer una contraseña',
          length: 'La contraseña es muy corta',
        }"
      />
      <FormKit
        type="password"
        label="Confirmar Contraseña"
        name="password_confirm"
        placeholder="Repite tu contraseña para confirmar"
        validation="required|confirm"
        :validation-messages="{
          required: 'Debes confirmar tu contraseña',
          confirm: 'Las contraseñas no coinciden',
        }"
      />
      <FormKit type="submit">Guardar nueva contraseña</FormKit>
    </FormKit>
  </div>
</template>

