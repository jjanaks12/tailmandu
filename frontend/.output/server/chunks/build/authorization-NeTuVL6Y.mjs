import { b as useAuthStore } from './server.mjs';
import { storeToRefs } from 'pinia';

const useAuthorization = () => {
  const { user, permissions } = storeToRefs(useAuthStore());
  const can = (permission, role = null) => {
    var _a, _b;
    if (role != null)
      return role == ((_b = (_a = user.value) == null ? void 0 : _a.role) == null ? void 0 : _b.name);
    if (Array.isArray(permission)) {
      let isTrue = false;
      for (const p of permission) {
        isTrue = isTrue || checkPermission(p);
      }
      return isTrue;
    } else {
      return checkPermission(permission);
    }
  };
  const checkPermission = (permission) => {
    const [access, resource] = permission.split("_");
    return access === "*" ? true : access === "manage" ? permissions.value.filter((permission2) => permission2.includes(resource)).length === 4 : permissions.value.includes(permission);
  };
  return { can };
};

export { useAuthorization as u };
//# sourceMappingURL=authorization-NeTuVL6Y.mjs.map
