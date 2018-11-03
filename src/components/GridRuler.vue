/**
* @file
* Contains implementation of Grid ruler component.
*/

<template>
  <div class="grid">
    <div
      class="grid__x"
      :style="{ width: `${rulerData.width}px` }">
      <div
        v-for="n in rulerXitems"
        :key="n"
        class="grid__x-item"
      >{{ n }}</div>
    </div>
    <div
        class="grid__y"
        :style="{ height: `${rulerData.height - 11}px` }">
      <div
        v-for="n in rulerYitems"
        :key="n"
        class="grid__y-item"
      >{{ n }}</div>
    </div>
  </div>
</template>

<script>
import { mainSize } from '../config/grid.config'

export default {
  data: function () {
    return {
    }
  },
  props: {
    // Main item data.
    rulerData: Object
  },
  computed: {
    /**
     * Count horizontal ruler grid items.
     */
    rulerXitems: function () {
      return Math.floor(this.rulerData.width / mainSize)
    },
    /**
     * Count vertical ruler grid items.
     */
    rulerYitems: function () {
      return Math.floor(this.rulerData.height / mainSize)
    }
  }
}
</script>

<style scoped lang="scss">
  .grid {
    color: #ffffff;

    &__x {
      position: absolute;
      height: 10px;
      background: #62adf4;
      top: 0;
      left: 11px;

      &-item {
        display: inline-block;
        width: 300px;
        text-align: center;
        vertical-align: top;
        font-size: 9px;
        line-height: 10px;
      }
    }

    &__y {
      position: absolute;
      width: 10px;
      background: #62adf4;
      top: 11px;
      left: 0;
      height: 300px;

      &-item {
        display: block;
        height: 300px;
        text-align: center;
        font-size: 9px;
        line-height: 300px;
      }
    }
  }
</style>
