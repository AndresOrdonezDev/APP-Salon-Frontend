import { createRouter, createWebHistory } from "vue-router";
import AuthAPI from "@/api/AuthAPI";
import AppointmentsLayoutVue from "@/views/appointments/AppointmentsLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminLayoutView.vue"),
      meta: { requiredAdmin: true },
      children: [
        {
          path: "",
          name: "appointment-list",
          component: () => import("../views/admin/AppointmentView.vue"),
        },
      ],
    },

    {
      path: "/",
      name: "appointments",
      component: AppointmentsLayoutVue,
      meta: { requiredAuth: true },
      children: [
        {
          path: "",
          name: "my-appointments",
          component: () =>
            import("../views/appointments/MyAppointmentsView.vue"),
        },
        {
          path: "nueva",
          component: () =>
            import("../views/appointments/NewAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "new-appointment",
              component: () => import("../views/appointments/ServicesView.vue"),
            },
            {
              path: "detalles",
              name: "appointment-details",
              component: () =>
                import("../views/appointments/AppointmentView.vue"),
            },
          ],
        },
        {
          path: ":id/editar",
          component: () =>
            import("../views/appointments/EditAppointmentLayout.vue"),
          children: [
            {
              path: "",
              name: "edit-appointment",
              component: () => import("../views/appointments/ServicesView.vue"),
            },
            {
              path: "detalles",
              name: "edit-appointment-details",
              component: () =>
                import("../views/appointments/AppointmentView.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/auth/AuthLayout.vue"),
      children: [
        {
          path: "registro",
          name: "register",
          component: () => import("../views/auth/RegisterView.vue"),
        },
        {
          path: "confirmar-cuenta/:token",
          name: "confirm-account",
          component: () => import("../views/auth/ConfirmAccountView.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/auth/LoginView.vue"),
        },
        {
          path: "olvide-clave",
          name: "forgot-password",
          component: () => import("../views/auth/ForgotPasswordView.vue"),
        },
        {
          path: "nueva-clave/:token",
          name: "new-password",
          component: () => import("../views/auth/NewPasswordView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiredAuth = to.matched.some((url) => url.meta.requiredAuth);
  if (requiredAuth) {
    try {
      const { data } = await AuthAPI.auth();

      if (data.admin) {
        next({ name: "admin" });
      } else {
        next();
      }
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});
router.beforeEach(async (to, from, next) => {
  const requiredAdmin = to.matched.some((url) => url.meta.requiredAdmin);
  if (requiredAdmin) {
    try {
      await AuthAPI.admin();
      next();
    } catch (error) {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
