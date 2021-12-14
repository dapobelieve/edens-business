<template>
  <div class="mobile-nav d-xl-none py-2 bg-white border  position-fixed bottom-0 w-100">
    <div class="d-flex justify-content-around">
      <div v-for="menu in menus" class="mobile-nav-item d-inline-flex flex-column align-items-center text-black-50">
        <span :class="menu.iconClass" class="fs-5 mb-1"></span>
        <span class="caption-2">{{ menu.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          name: 'Loans',
          iconClass: 'ed-dollar-sign',
          active: true
        },
        {
          name: 'Wallet',
          iconClass: 'ed-square'
        },
        {
          name: 'Notification',
          iconClass: 'ed-bell'
        },
        {
          name: 'Profile',
          iconClass: 'ed-user'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-nav {
  height:  3.5rem;
}
</style>
