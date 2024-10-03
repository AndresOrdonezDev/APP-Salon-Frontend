<script setup>
import {useAuthStore} from '../../stores/auth'
import {reset} from '@formkit/core'

const store = useAuthStore()
const handleSubmit = async (formData)=>{
  await store.forgotPassword(formData)
  reset('forgotPassword')
}

</script>


<template>
  <div>
    <h1 class="text-white text-2xl uppercase font-bold text-center">
      Recuperar contraseña
    </h1>
    <p
      class="text-white text-center font-bold border-b-2 border-white pb-3 mb-10"
    >
      Ingresa tu correo asociado a la cuenta registrada
    </p>

    <FormKit
      id="forgotPassword"
      type="form"
      :actions="false"
      incomplete-message="No se pudo iniciar, revisa los campos"
      @submit="handleSubmit"
    >
      <FormKit
        type="email"
        label="Correo"
        name="email"
        placeholder="Ingresa dirección de correo"
        validation="required|email"
        :validation-messages="{
          required: 'El correo es obligatorio',
          email: 'Ingresa un correo válido',
        }"
      />
      <FormKit type="submit">Enviar instrucciones</FormKit>
    </FormKit>
  </div>
</template>
