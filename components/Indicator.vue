<template>
  <div class="tabs d-flex">
    <Tab :half="half" :active="activeTab"  :index="tabIndex+1" v-for="(tab, tabIndex) in tabs" :key="tabIndex" />
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Number,
      default: 5
    },
    half: {
      type: Number,
      default: 0
    },
    activeTab: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss">
.tabs {
  .tab {
    height: 4px;
    overflow: hidden;
    width: 2.25rem;
    border-radius: 4px;
    background-color: rgba(146, 204, 191, 0.4);
    transition: background-color 100ms ease-out;

    &-active {
      background-color: var(--bs-eden-mint);
    }
  }

  .tab:last-child {
    margin: 0
  }
}
.inner {
  height: 5px;
}
</style>
