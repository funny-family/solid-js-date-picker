export var constructProps = <
  TIncomingProps extends Record<any, any>,
  TFilters extends Array<() => boolean>
>(
  incomingProps: TIncomingProps,
  filters: TFilters
) => {
  var result = new Array(filters.length + 1);

  for (const propName of Object.getOwnPropertyNames(incomingProps)) {
    //
  }

  // filters.forEach((filterFunction, index) => {
  //   var value = filterFunction()

  //   if (value) {
  //     result[index] = {};
  //   }
  // });

  return result;
};

/*
  var [] = constructProps(attrsAndProps, [
    () => {
      
    }
  ]);
*/
