function add(include, values) {
  let sum = 0
  for (const v of values) {
    if (include(v)) sum = sum + v
  }
  return sum
}
console.log(add((n) => n > 0, [3, 4, -2, -1, 7, '18']))
