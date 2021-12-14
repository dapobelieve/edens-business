<template>
<!--  <div class="tab-componsdsent border m-0 p-0">-->
    <ul class="tabs-list d-inline-flex justify-content-evenly bg-platinum p-1 rounded-pill">
      <li @click="switchTab(tab)" v-for="(tab, tabIndex) in tabItems" :key="tabIndex" >
        <div :class="{ 'active-tab': tab === activeTab }" class="px-3 py-2 text-black-50 text-center tab-head-item rounded-pill cursor-pointer" :ref="`tab-${tab}`">
          <slot :name="getHeadSlot(tab)">{{ tab }}</slot>
        </div>
      </li>
    </ul>
<!--    <div class="tab-body mt-8">-->
<!--      <slot :name="getPanelSlot"></slot>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
export default {
  model: {
    prop: "activeTab",
    event: "active-tab",
  },
  props: {
    activeTab: {
      type: String,
      required: true,
    },
    tabItems: {
      type: Array,
      required: true,
      validator(value) {
        return typeof value === "object" && Array.isArray(value);
      },
      default() {
        return ["Current loan", "Completed loans"];
      },
    },
  },
  computed: {
    getPanelSlot() {
      return `tab-body-${this.activeTab}`;
    },
    active() {
      return `text-bad-red`;
    },
  },
  methods: {
    // ToDo: Implement logic for justification of tab elements {left, center, right}
    getHeadSlot(tab) {
      return `tab-head-${tab}`;
    },
    switchTab(tab) {
      this.$emit("active-tab", tab);
    },
  },
}
</script>
<style lang="scss" scoped>
.tab-head-item {
  font-weight: 500;
  font-size: 12px;
}

.active-tab {
  background-color: var(--bs-jungle-green);
  color: #fff !important;
  transition: background-color 80ms cubic-bezier(.61,.58,.72,.73);
}
ul {
  li {
    list-style: none;
  }
}
</style>
