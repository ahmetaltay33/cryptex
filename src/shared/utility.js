export const getFormData = (form) => {
  const formData = new FormData(form);
  let object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  return object;
};