import { c as useAuthStore, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, computed, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthorization } from './authorization-DPJpR6G0.mjs';
import { storeToRefs } from 'pinia';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'deep-pick-omit';
import 'yup';
import 'axios';
import 'vue-sonner';

const useMenu = () => {
  const menus = ref([{
    title: "",
    path: "",
    slug: "",
    permissions: [],
    subMenu: [{
      title: "Dashboard",
      icon: "LayoutDashboardIcon",
      slug: "dashboard",
      path: "/dashboard",
      permissions: "*"
    }]
  }, {
    title: "Users",
    path: "",
    slug: "users",
    permissions: [],
    subMenu: [{
      title: "Users",
      icon: "Users",
      slug: "users",
      path: "/dashboard/users",
      permissions: "manage_user"
    }, {
      title: "Events",
      icon: "Calendar1",
      slug: "events",
      path: "/dashboard/events",
      permissions: "manage_event"
    }, {
      title: "Roles",
      icon: "ShieldCheck",
      slug: "roles",
      path: "/dashboard/roles",
      permissions: "manage_role"
    }, {
      title: "Permissions",
      icon: "ShieldUser",
      slug: "permissions",
      path: "/dashboard/permissions",
      permissions: "manage_permission"
    }]
  }, {
    title: "Miscellanous",
    path: "",
    slug: "extras",
    permissions: "",
    role: "Admin",
    subMenu: [{
      title: "Countries",
      path: "/dashboard/countries",
      slug: "countries",
      icon: "Flag",
      permissions: ""
    }, {
      title: "Genders",
      path: "/dashboard/gender",
      slug: "gender",
      icon: "VenusAndMars",
      permissions: ""
    }, {
      title: "Age category",
      path: "/dashboard/age_category",
      slug: "age_category",
      icon: "Baby",
      permissions: ""
    }, {
      title: "T-Shirt sizes",
      path: "/dashboard/tshirt_sizes",
      slug: "age_category",
      icon: "Shirt",
      permissions: ""
    }]
  }, {
    title: "Settings",
    path: "",
    slug: "settings",
    permissions: [],
    subMenu: [{
      title: "Change password",
      path: "/dashboard/change_password",
      slug: "change_password",
      icon: "KeyRound",
      role: "Admin",
      permissions: "*"
    }, {
      title: "Personal details",
      path: "/dashboard/personal_details",
      slug: "personal_details",
      icon: "UserPen",
      role: "Admin",
      permissions: "*"
    }, {
      title: "Company",
      path: "/dashboard/company",
      slug: "company",
      icon: "Building",
      permissions: "manage_company"
    }, {
      title: "Health Check",
      path: "/dashboard/health_check",
      slug: "health_check",
      icon: "HandHeart",
      role: "Admin",
      permissions: "manage_company"
    }]
  }]);
  const { can } = useAuthorization();
  const { user } = storeToRefs(useAuthStore());
  const menuList = computed(
    () => menus.value.map((menu) => {
      var _a, _b, _c;
      return menu.role ? menu.role == ((_b = (_a = user.value) == null ? void 0 : _a.role) == null ? void 0 : _b.name) ? menu : null : menu.permissions.length > 0 ? can(menu.permissions) ? menu : null : {
        ...menu,
        subMenu: (_c = menu.subMenu) == null ? void 0 : _c.map((submenu) => can(submenu.permissions) ? { ...submenu } : null).filter((submenu) => submenu != null)
      };
    }).filter(
      (menu) => menu == null ? false : menu.subMenu && menu.subMenu.length > 0
    )
  );
  return { menuList };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "_sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    useMenu();
    const { logout } = useAuthStore();
    const { isLoading } = storeToRefs(useAuthStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin/_sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_sidebar-B87qqouj.mjs.map
