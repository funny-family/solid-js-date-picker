export var monthShortNameIdList_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export var monthAt = (monthId: number, monthShortNameIdList: string[]) => {
  switch (monthId) {
    case 0: {
      return monthShortNameIdList[0];
    }

    case 1: {
      return monthShortNameIdList[1];
    }

    case 2: {
      return monthShortNameIdList[2];
    }

    case 3: {
      return monthShortNameIdList[3];
    }

    case 4: {
      return monthShortNameIdList[4];
    }

    case 5: {
      return monthShortNameIdList[5];
    }

    case 6: {
      return monthShortNameIdList[6];
    }

    case 7: {
      return monthShortNameIdList[7];
    }

    case 8: {
      return monthShortNameIdList[8];
    }

    case 9: {
      return monthShortNameIdList[9];
    }

    case 10: {
      return monthShortNameIdList[10];
    }

    case 11: {
      return monthShortNameIdList[11];
    }

    default:
      throw new Error(`Unknown month index: ${monthId}`);
  }
};

export var isWeekend = (dayOfTheMonthIndex: number) => {
  if (
    dayOfTheMonthIndex === 5 ||
    dayOfTheMonthIndex === 6 ||
    dayOfTheMonthIndex === 12 ||
    dayOfTheMonthIndex === 13 ||
    dayOfTheMonthIndex === 19 ||
    dayOfTheMonthIndex === 20 ||
    dayOfTheMonthIndex === 26 ||
    dayOfTheMonthIndex === 27 ||
    dayOfTheMonthIndex === 33 ||
    dayOfTheMonthIndex === 34 ||
    dayOfTheMonthIndex === 40 ||
    dayOfTheMonthIndex === 41
  ) {
    return true;
  }

  return false;
};

export var isDatesEqual = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export var createMonthsWindowControl = (specifiedDate: Date) => {
  var monthWindowLength = 42 as const;
  var monthWindowLastIndex = monthWindowLength - 1;
  var monthsWindow = new Array(
    Array.from({ length: monthWindowLength }, () => {
      return 0;
    }),
    Array.from({ length: monthWindowLength }, () => {
      return 0;
    }),
    Array.from({ length: monthWindowLength }, () => {
      return 0;
    })
  );
  var previousMonthMetadata = {
    previousMonthStartIndex: 0,
    previousMonthEndIndex: 0,
    currentMonthStartIndex: 0,
    currentMonthEndIndex: 0,
    nextMonthStartIndex: 0,
    nextMonthEndIndex: 0,
  };
  var currentMonthMetadata = {
    previousMonthStartIndex: 0,
    previousMonthEndIndex: 0,
    currentMonthStartIndex: 0,
    currentMonthEndIndex: 0,
    nextMonthStartIndex: 0,
    nextMonthEndIndex: 0,
  };
  var nextMonthMetadata = {
    previousMonthStartIndex: 0,
    previousMonthEndIndex: 0,
    currentMonthStartIndex: 0,
    currentMonthEndIndex: 0,
    nextMonthStartIndex: 0,
    nextMonthEndIndex: 0,
  };

  // var calculateMouthWindow = () => {
  //   for (var index = 0; index < array.length; index++) {
  //     var day = array[index];
  //   }

  //   //
  // };

  var calculateMouthsWindow = (milliseconds: number) => {
    var previousMonthDays = monthsWindow[0];
    var currentMonthDays = monthsWindow[1];
    var nextMonthDays = monthsWindow[2];

    for (var i = 0; i < monthWindowLength; i++) {
      // const day = array[i];
      // if ()

      // --------------- previous month ---------------
      var dayOfTheMonth = previousMonthDays[i];
      // prettier-ignore
      if ((dayOfTheMonth > previousMonthDays[monthWindowLastIndex - i])) {
        //
      }
      // --------------- previous month ---------------

      // --------------- current month ---------------
      // var dayOfTheMonth = currentMonthDays[i];
      // // prettier-ignore
      // if ((dayOfTheMonth > currentMonthDays[monthWindowLastIndex - i]) && dayOfTheMonth !== 1) {
      //   //
      // }
      // --------------- current month ---------------

      // --------------- current month ---------------
      console.log();
      // --------------- current month ---------------
    }

    return specifiedDate.setDate(milliseconds);
  };

  return {
    specifiedDate,
    monthWindowLength,
    monthsWindow,
    previousMonthMetadata: previousMonthMetadata as Readonly<
      typeof previousMonthMetadata
    >,
    currentMonthMetadata: currentMonthMetadata as Readonly<
      typeof currentMonthMetadata
    >,
    nextMonthMetadata: nextMonthMetadata as Readonly<typeof nextMonthMetadata>,
    // calculateMouthWindow,
    calculateMouthsWindow,
  };
};
