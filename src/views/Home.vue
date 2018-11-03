/**
* @file
* Contains implementation of Home component.
*/

<template>
  <div
          :id="containerId"
          class="home"
          v-bind:style="{ width: `${documentWidth}px` }">
    <div class="home__item-list">
      <grid-ruler :rulerData="{width: documentWidth, height: documentHeight}"/>
      <grid-item
              v-for="(value, key) in itemsData"
              :key="key"
              :itemData="value"
              :itemRatioWidth="itemRatioWidth"
              :itemRatioHeight="itemRatioHeight"/>
    </div>
  </div>
</template>

<script>
import GridItem from '@/components/GridItem'
import GridRuler from '@/components/GridRuler'
import GridGeneratorService from '@/services/gridGenerator.service'
import _ from 'lodash'
import { mainSize, gridTimeout, oneQueueGeneratedItems } from '../config/grid.config'

// Max size of scroll height or width of browser.
const maxHeightWidth = 40000 * mainSize

export default {
  data: function () {
    return {
      itemRatioWidth: mainSize,
      itemRatioHeight: mainSize,
      documentWidth: window.innerWidth + mainSize,
      documentHeight: document.documentElement.offsetWidth,
      containerId: 'home',
      scrollDelta: 0
    }
  },
  computed: {
    itemsData: function () {
      // Get items data from global store.
      return this.$store.getters.getItemsData
    }
  },
  mounted () {
    // Init grid items.
    GridGeneratorService.addGrid(gridTimeout, oneQueueGeneratedItems, 0).then(data => {
      // Dispatch to global store grid items data.
      this.$store.dispatch('addItems', data)
    })
    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    /**
     * Scroll handler.
     */
    handleScroll: _.debounce(function () {
      this.scrollDelta = ++this.scrollDelta
      const scrollHeight = document.documentElement.scrollHeight
      const scrollWidth = document.documentElement.scrollWidth
      const scrollTop = document.documentElement.scrollTop
      const scrollLeft = document.documentElement.scrollLeft
      const offsetHeight = window.innerHeight
      const offsetWidth = document.documentElement.offsetWidth

      // Count endpoint of scroll by Y axis.
      const scrollY = scrollHeight - (scrollTop + offsetHeight)
      // Count endpoint of scroll by X axis.
      const scrollX = scrollWidth - scrollLeft - offsetWidth

      if (scrollX < 1 && scrollWidth < maxHeightWidth) {
        this.documentWidth = this.documentWidth + (mainSize * 3)
        // Add grid items.
        GridGeneratorService.addGrid(gridTimeout, oneQueueGeneratedItems, this.scrollDelta).then(data => {
          // Dispatch to global store grid items data.
          this.$store.dispatch('addItems', data)
        })
      } else if (scrollY < 1) {
        this.documentHeight = scrollHeight
        // Add grid items.
        GridGeneratorService.addGrid(gridTimeout, oneQueueGeneratedItems, this.scrollDelta).then(data => {
          // Dispatch to global store grid items data.
          this.$store.dispatch('addItems', data)
        })
      }
    }, 500)
  },
  components: {
    GridRuler,
    GridItem
  }
}
</script>

<style lang="scss">
  .home {
    overflow: scroll;
    padding: 12px 0 0 12px;
    font-family: Arial;

    &__item-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
