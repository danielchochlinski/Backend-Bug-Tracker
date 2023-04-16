export const dynamicUpdate = (data: any, update: Partial<any>) => {
  for (const key of Object.keys(data)) {
    if (data[key] !== "") {
      update[key] = data[key];
    }
  }
};
