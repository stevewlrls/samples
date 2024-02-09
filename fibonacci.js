const m = new Array()
function F(n) {
  if (m[n]) return m[n]
  return (m[n] = n > 1 ? F(n - 1) + F(n - 2) : 1)
}

console.log(F(10))
console.log(m)
