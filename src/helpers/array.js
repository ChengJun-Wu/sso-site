function arrayColumn (array, column) {
  const arr = []
  array.forEach(item => {
    arr.push(item[column])
  })
  return arr
}

function arrayDiff (arr1, arr2) {
  arr1.concat(arr2).filter(function (v) {
    return arr1.indexOf(v) === -1 || arr2.indexOf(v) === -1
  })
}

function inArray (item, array) {
  return (new Set(array)).has(item)
}
export {
  arrayColumn,
  arrayDiff,
  inArray
}
