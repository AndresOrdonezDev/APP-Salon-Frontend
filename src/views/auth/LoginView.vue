<script setup>
import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();

const handleSubmit = async (formData) => {
  auth.login(formData);
};
</script>
<template>
  <div>
    <h1 class="text-white text-2xl uppercase font-bold text-center">
      Iniciar Sesión
    </h1>
    <p
      class="text-white text-center font-bold border-b-2 border-white pb-3 mb-10"
    >
      Ingresa tus credenciales
    </p>
    <FormKit
      id="loginForm"
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
      <FormKit
        type="password"
        label="Contraseña"
        name="password"
        placeholder="Establece una contraseña de 8 caracteres"
        validation="required"
        :validation-messages="{
          required: 'Debes ingresar la contraseña',
        }"
      />

      <FormKit type="submit">Ingresar</FormKit>
    </FormKit>
  </div>
</template>