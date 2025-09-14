import { b as useAuthStore } from './server.mjs';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

const useMenu = () => {
  const menus = ref([{
    title: "Home",
    path: "/",
    icon: "Home",
    slug: "home",
    permissions: "*"
  }, {
    title: "About us",
    path: "/about_us",
    slug: "about_us",
    icon: "Library",
    permissions: "*"
  }, {
    title: "Our trails",
    path: "/our_trails",
    slug: "our_trails",
    icon: "Waypoints",
    permissions: "*"
  }, {
    title: "Races",
    path: "/races",
    slug: "races",
    icon: "FlagTriangleRight",
    permissions: "*"
  }, {
    title: "TM clicks",
    path: "/tm_clicks",
    slug: "tm_clicks",
    icon: "Images",
    permissions: "*"
  }, {
    title: "Contact us",
    path: "/contact_us",
    slug: "contact_us",
    icon: "Contact",
    permissions: "*"
  }]);
  const { isLoggedin } = storeToRefs(useAuthStore());
  const menuList = computed(
    () => !isLoggedin.value ? [...menus.value, {
      title: "Login",
      path: "/login",
      slug: "login",
      icon: "LogIn",
      permissions: "*"
    }, {
      title: "Register",
      path: "/register",
      slug: "register",
      icon: "FilePlus",
      permissions: "*"
    }] : [...menus.value, {
      title: "Dashboard",
      path: "/dashboard",
      slug: "dashboard",
      icon: "LayoutDashboard",
      permissions: "*"
    }]
  );
  return { menuList };
};

export { useMenu as u };
//# sourceMappingURL=defaultMenus-YRPr8t5u.mjs.map
