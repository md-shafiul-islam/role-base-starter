export const getStakeholderBySearchInput = (value, stakeholders, setStakeholders) => {
  const values = value?.split(" ");
  const items = stakeholders && stakeholders.filter((item) => {
    if (Array.isArray(values)) {
      if (values.includes(item.name) ||
        values.includes(item.phoneNo) ||
        values.includes(item.address1)) {
        return item;
      }
    }
  });
  if (Array.isArray(items)) {
    if (items.length > 0) {
      setStakeholders(items);
    } else {
      setStakeholders(stakeholders);
    }
  } else {
    setStakeholders(stakeholders);
  }
}