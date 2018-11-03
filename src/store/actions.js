/**
 * @file
 * Contains implementation of Vuex storage actions.
 */

/**
 * Add items.
 * @param {Object} itemsData
 *   Object of items.
 */
export const addItems = ({ commit }, itemsData) => {
  commit('ADD_ITEMS', itemsData)
}

/**
 * Update item in store.
 * @param {Object} itemData
 *   Object of changed item.
 */
export const updateItem = ({ commit }, itemData) => {
  commit('UPDATE_ITEM', itemData)
}
