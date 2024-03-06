/**
 * @module fibonacci.js
 *
 * Contains sample code to calculate an arbitrary Fibonacci Number,
 *    F(n) = F(n-1) + F(n-2)
 * where n is a positive integer and F(0) = F(1) = 1.
 *
 * Uses recursion, along with a 'memory' array (m) to store intermediate
 * results so that they don't need to be recalculated, once found.
 */

const m = new Array()
function F(n) {
  if (n < 2) return 1
  if (m[n]) return m[n]
  return F(n - 1) + F(n - 2)
}

console.log(F(10))
console.log(m)
