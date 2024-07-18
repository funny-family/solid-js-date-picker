export var parseDateFormat = (dateFormatString: string) => {
  const dateFormatStringLength = dateFormatString.length;
  var v: {
    splitter: string;
    splitted: {
      position: number;
      value: string;
    }[];
  } = {
    splitter: '',
    splitted: new Array(),
  };

  for (var i = 0; i < dateFormatStringLength; i++) {
    var value = dateFormatString[i];

    if (
      value === 'd' ||
      value === 'D' ||
      value === 'm' ||
      value === 'M' ||
      value === 'y' ||
      value === 'Y'
    ) {
      v.splitted.push({
        position: i,
        value,
      });
    }
  }

  return v;
};
