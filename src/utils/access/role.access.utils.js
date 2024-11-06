export const getAccessByMenuKey = (key, roleAccess = []) => {
  const access = roleAccess.find((item) => {
    return item.menuKey === key;
  });

  return access;
};

export const convertToAccessAsObj = (access = []) => {
  const roleAccess = {};

  access.forEach((item) => {
    roleAccess[item.menuKey] = item;
  });
  console.log("convertToAccessAsObj, ", roleAccess);
  return roleAccess;
};
