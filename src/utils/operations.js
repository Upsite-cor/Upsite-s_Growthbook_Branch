const operations = {
    exactlyEqual: (val, gVal) => val === gVal,
    startsWith: (val, gVal) => val.startsWith(gVal),
    endsWith: (val, gVal) => val.endsWith(gVal),
    contains: (val, gVal) => val.includes(gVal),    
    regex: (val, gVal) => {
      try {
        return new RegExp(gVal).test(val);
      } catch (e) {
        return false;
      }
    }
  };

const compareValues = (value, givenValue, operation) =>{
    return operations[operation] ? operations[operation](value, givenValue) : false;
}

const compareArrays = (arr1, arr2) =>{
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export {compareValues,compareArrays}