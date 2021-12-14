<template>
  <div class="border px-3 py-2 d-inline-flex justify-content-between align-items-center rounded-2">
    <a @click.prevent="$emit('resend')" class="p-0 m-0 text-eden-mint fs-7 me-3 cursor-pointer">Resend OTP</a>
    <small class="fw-bold" style="max-width: 50px">{{timer}}</small>
  </div>
</template>

<script>
export default {
  props: {
    // in minutes
    time: {
      type: Number,
      default: 15
    },
  },
  data() {
    return {
      errorMessage: null,
      countdownId: null,
      timerId: null,
      currentTime: this.time * 60
    }
  },
  methods: {
    stopCountdown() {
      clearInterval(this.countdownId)
      this.currentTime = 0
    },
    startCountdown() {
      this.countdownId = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
  },
  watch: {
    seconds(val) {
      if(val === 0) {
        this.stopCountdown()
        this.$emit('timer-stopped')
      }
    }
  },
  computed: {
    seconds: {
      set(val) {
        this.currentTime = val
      },
      get() {
        return this.currentTime
      }
    },
    timer() {
      let min = Math.floor(this.seconds / 60);
      let sec = this.seconds % 60;

      min = min > 9 ? min : `0${min}`
      sec = sec > 9 ? sec : `0${sec}`

      return `${min} : ${sec}`
    }
  },
  mounted() {
    this.startCountdown()
  }
}
</script>

<style scoped>

</style>
