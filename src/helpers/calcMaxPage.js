const calcMaxPage = (listLength, perPage) => {
  if (listLength <= perPage) return 0;

  const remainder = listLength % perPage;
  const quotient = listLength / perPage;

  if (remainder == 0) return quotient;
  else return Math.floor(quotient);
};

export default calcMaxPage;
