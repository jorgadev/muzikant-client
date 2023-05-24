export const areStringsSimilar = (str1, str2) => {
  str1 = str1.toLowerCase().replace(/[.,/!$%()xčćžđš]/g, (match) => {
    switch (match) {
      case "x":
        return "ks";
      case "č":
      case "ć":
        return "c";
      case "ž":
        return "z";
      case "đ":
        return "d";
      case "š":
        return "s";
      default:
        return "";
    }
  });
  str2 = str2.toLowerCase().replace(/[.,/!$%()xčćžđš]/g, (match) => {
    switch (match) {
      case "x":
        return "ks";
      case "č":
      case "ć":
        return "c";
      case "ž":
        return "z";
      case "đ":
        return "d";
      case "š":
        return "s";
      default:
        return "";
    }
  });

  return str1.trim() === str2.trim();
};

export const calculatePrize = (time, prize) => {
  let factor = 1;
  if (time < 60000) {
    factor = 3;
  } else if (time < 90000) {
    factor = 2;
  } else if (time < 120000) {
    factor = 1.5;
  } else if (time < 180000) {
    factor = 1.25;
  }
  return prize * 10 * factor;
};

export const sortByKey = (array, key) => {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};
