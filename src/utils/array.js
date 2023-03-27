// Function to add a value to an array if it doesn't already exist
const addUniqueValueToArray = (array, value) => {
    if (array.indexOf(value) === -1) {
      array.push(value);
    }
    return array;
  }
  
  // Function to remove a value from an array if it exists
const removeValueFromArray = (array, value) => {
    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }
  
export  { addUniqueValueToArray, removeValueFromArray };