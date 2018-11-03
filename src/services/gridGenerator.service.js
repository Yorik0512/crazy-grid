/**
 * GridGenerator provides methods to generate grid items.
 */
class GridGenerator {
  /**
   * Items generator.
   * @param {number} quantity
   *  Quantity of items.
   * @param {number} delta
   *  Delta of items.
   */
  itemsGenerator (quantity, delta) {
    delta = (delta * quantity)
    let data = []
    for (let i = 1; i <= quantity; i++) {
      const id = delta + i
      if (id <= (40000 * 40000)) {
        data.push({
          id,
          checkboxValue: true,
          inputValue: 3333
        })
      }
    }
    return data
  }
  /**
   * Add grid.
   * @param {number} ms
   *  Current word.
   * @param {number} quantity
   *  Quantity of items.
   * @param {number} delta
   *  Delta of items.
   */
  addGrid (ms, quantity, delta) {
    const items = this.itemsGenerator(quantity, delta)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(items)
      }, ms)
    })
  }
}

/**
 * Init SynonymService object.
 */
const GridGeneratorService = new GridGenerator()

/**
 * Export SynonymService object.
 */
export default GridGeneratorService
