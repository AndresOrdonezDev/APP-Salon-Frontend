<script setup>
import { useAuthStore } from "../../stores/auth";

const auth = useAuthStore();

const handleSubmit = async ({ password_confirm, ...formData }) => {
  auth.createUser(formData);

};

</script>
<template>
  <div>
    <h1 class="text-white text-2xl uppercase font-bold text-center">
      Registro
    </h1>
    <p
      class="text-white text-center font-bold border-b-2 border-white pb-3 mb-10"
    >
      Crea una cuenta en AppSalón
    </p>
    <FormKit
      id="registerForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa los campos"
      @submit="handleSubmit"
    >
      <FormKit
        type="text"
        label="Nombre"
        name="name"
        placeholder="Ingresa tu nombre"
        validation="required|length:3"
        :validation-messages="{
          required: 'El nombre es obligatorio',
          length: 'El nombre es muy corto',
        }"
      />
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
      <FormKit type="submit">Crear Cuenta</FormKit>
    </FormKit>
  </div>
</template>