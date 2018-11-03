/**
* @file
* Contains implementation of Grid item component.
*/

<template>
  <div class="grid-item" v-bind:style="{ width: `${itemRatioWidth}px`, height: `${itemRatioHeight}px` }">
    <div class="grid-item__checkbox">
      <input type="checkbox"
             :id="`checkbox-item-${itemData.id}`"
             v-model="checkboxValue"/>
      <label :for="`checkbox-item-${itemData.id}`">Checkbox</label>
    </div>
    <div class="grid-item__input">
      <label :for="`input-item-${itemData.id}`">Input:</label>
      <input type="number"
             :id="`input-item-${itemData.id}`"
             v-model="inputValue"
             step="1"
             :disabled="checkboxValue === true"/>
    </div>
    <template v-if="itemsIsChanged">
      <button v-on:click="saveData">Save</button>
    </template>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // Input field value.
      inputValue: this.itemData.inputValue,
      // Checkbox field value.
      checkboxValue: this.itemData.checkboxValue,
      // Flag of one from inputs was changed.
      itemsIsChanged: false
    }
  },
  props: {
    // Item width.
    itemRatioWidth: Number,
    // Item height.
    itemRatioHeight: Number,
    // Main item data.
    itemData: Object
  },
  watch: {
    /**
     * Watch input field value on change.
     */
    inputValue: function () {
      this.changedFlag(true)
    },
    /**
     * Watch checkbox field value on change.
     */
    checkboxValue: function () {
      this.changedFlag(true)
    }
  },
  methods: {
    /**
     * Change flag value handler.
     * @param {Boolean} status
     *   Status of flag.
     */
    changedFlag: function (status) {
      this.itemsIsChanged = status
    },
    /**
     * Save data handler handler.
     */
    saveData: function () {
      const data = {
        ...this.itemData,
        inputValue: +this.inputValue,
        checkboxValue: this.checkboxValue
      }
      this.changedFlag(false)
      // Dispatch to store current item data.
      this.$store.dispatch('updateItem', data)
    }
  }
}
</script>

<style scoped lang="scss">
  .grid-item {
    border: 1px solid #0667ee;
    margin: -1px 0 0 -1px;

    &__checkbox {
      padding: 0;
    }

    &__input {
      padding: 0;
    }
  }
</style>
