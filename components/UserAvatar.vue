<template>
  <div>
    <template v-if="userData.image">
      <div style="background: rgba(146, 204, 191, 0.1);" class="border d-inline-flex p-1 rounded-circle border-0">
        <img class="avatar avatar-lg" :src="userData.image" alt="">
      </div>
    </template>
    <template v-else>
      <div style="background: rgba(146, 204, 191, 0.1); height: 48px;  width: 48px" class="border bg-eden-green d-inline-flex align-items-center justify-content-center p-1 text-white rounded-circle fw-bold border-0">
        {{imageTempUrl}}
      </div>
    </template>
  </div>
</template>


<script>
//add pros for sizing
export default {
  data() {
    return {
      userData: {}
    }
  },
  computed: {
    imageTempUrl() {
      if (this.image) {
        return URL.createObjectURL(this.image)
      } else {
        if (this.userData.first_name)
          return `${this.userData.first_name.charAt(0).toUpperCase()}`
      }
    },
  },
  mounted() {
    this.userData = Object.assign({}, this.$store.state.auth.user)
  }
}
</script>

<style scoped>

</style>
