/**
 * Soma kcal e proteína dos itens marcados como consumidos.
 * @param {Array<{checked:boolean, kcal:number, protein:number}>} items
 * @returns {{ kcal: number, protein: number }}
 */
export function sumConsumed(items) {
  return items.reduce(
    (acc, i) => {
      if (i.checked) {
        acc.kcal += i.kcal
        acc.protein += i.protein
      }
      return acc
    },
    { kcal: 0, protein: 0 }
  )
}

/**
 * Consumo total do dia agregando todos os itens de todas as classes.
 */
export function sumConsumedAll(classes) {
  return classes.reduce(
    (acc, c) => {
      const s = sumConsumed(c.items)
      acc.kcal += s.kcal
      acc.protein += s.protein
      return acc
    },
    { kcal: 0, protein: 0 }
  )
}
