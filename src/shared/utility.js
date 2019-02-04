export const getFormData = (form) => {
  const formData = new FormData(form);
  let object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  return object;
};

export const generateIdFieldFetchedData = (data) => {
  const newData = [];
  for (let key in data) {
    newData.push({
      ...data[key],
      Id: key
    });
  }
  return newData;
};