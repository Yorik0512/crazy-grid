/**
 * @file
 * Contains implementation of Vuex storage mutations.
 */

/**
 * Set items to store.
 * @param {Object} state
 *   Vuex state.
 * @param {Object} itemsData
 *   Object of items data.
 */
export const ADD_ITEMS = (state, itemsData) => {
  let newData = {}
  itemsData.map((item) => {
    newData[item.id] = item
  })
  state.itemsData = { ...state.itemsData, ...newData }
}

/**
 * Update item in store.
 * @param {Object} state
 *   Vuex state.
 * @param {Object} itemData
 *   Object of changed item data.
 */
export const UPDATE_ITEM = (state, itemData) => {
  state.itemsData[itemData.id] = itemData
  console.log(state.itemsData[itemData.id])
}
