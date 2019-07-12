const monName = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
];

export const toIsoDate = strDate => {
  let dateFormatted = strDate.split('/');
  dateFormatted = `${dateFormatted[1]}/${dateFormatted[0]}/${dateFormatted[2]}`;

  const dateObj = new Date(dateFormatted);
  if (isNaN(dateObj)) {
    return 'error';
  }
  const dateIso = dateObj.toISOString();

  return dateIso;
};

export const toBoletoDateFormat = isoDate => {
  const day = isoDate.substring(3, 5);
  const month = parseInt(isoDate.substring(0, 2));
  return `${day} de ${monName[month - 1]}`;
};

export const toCardValid = isoDate => {
  const month = isoDate.substring(3, 5);
  const year = isoDate.substring(8, 10);
  return `${month}/${year}`;
};

export const toBoletoDateFormatIso = isoDate => {
  const month = parseInt(isoDate.substring(3, 5));
  const day = isoDate.substring(0, 2);
  return `${day} de ${monName[month - 1]}`;
};

export const toBoletoPaidDateFormatIso = isoDate => {
  const month = parseInt(isoDate.substring(3, 5));
  const day = isoDate.substring(0, 2);
  return `${day} de ${monName[month - 1]} às ${isoDate.substring(11)}`;
};

export const toHours = isoDate => {
  const dateObj = new Date(isoDate);
  return `${`0${dateObj.getHours()}`.slice(
    -2
  )}:${`0${dateObj.getMinutes()}`.slice(-2)}`;
};

export const toBoletoDateFormatDateIso = isoDate => {
  const day = isoDate.substring(8, 10);
  const month = parseInt(isoDate.substring(5, 7));
  return `${day} de ${monName[month - 1]}`;
};

export const toBoletoPaidDateFormat = isoDate => {
  const dateObj = new Date(isoDate);
  return `${`0${dateObj.getUTCDate()}`.slice(-2)} de ${
    monName[dateObj.getMonth()]
  } às ${`0${dateObj.getHours()}`.slice(-2)}:${`0${dateObj.getMinutes()}`.slice(
    -2
  )}`;
};

export const toDateLocale = isoDate => {
  const dateObj = new Date(isoDate);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return dateObj.toLocaleDateString('pt-BR', options);
};
