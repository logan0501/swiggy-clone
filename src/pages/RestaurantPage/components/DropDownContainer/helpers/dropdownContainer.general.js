export const showDropDownHandler = (prevvalue, newval) => {
  if (prevvalue.includes(newval)) {
    const newarray = [...prevvalue];
    newarray.splice(
      prevvalue.findIndex((item) => {
        return item === newval;
      }),
      1
    );

    return newarray;
  }
  return [...prevvalue, newval];
};
