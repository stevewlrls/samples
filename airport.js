const planes = [
  { sign: 'GBAL', type: 'Lear' },
  { sign: 'AEHQ', type: 'B737' },
  { sign: 'DOZR', type: 'F70' },
  { sign: 'GQEA', type: 'F27' },
  { sign: 'DEWR', type: 'B737' },
  { sign: 'AYTT', type: 'C150' }
]

const types = {
  Lear: { engine: 'jet', pass: 8 },
  F27: { engine: 'prop', pass: 28 },
  F70: { engine: 'jet', pass: 70 },
  B737: { engine: 'jet', pass: 110 },
  C150: { engine: 'prop', pass: 1 }
}
