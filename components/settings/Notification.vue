<template>
  <div>
    <div class="mb-5">
      <p class="mb-1 caption-2">Notification Settings</p>
      <small  class="text-black-50 body-1 fw-normal">How would you like to receive notifications?</small>
    </div>

    <div @click="updatedNotification.push_notification = !notification.push_notification" class="settings-item cursor-pointer mb-5 d-flex align-items-start ">
      <div :class="[notification.push_notification ? 'check-active' : '']" class="check me-3 d-flex align-items-center justify-content-center rounded-circle">
        <span class="ed-check text-white fw-bold fs-7"></span>
      </div>
      <div>
        <p class="mb-0 body-1 caption-2 text-jungle-green">Push Notifications</p>
        <small class="text-black-50 fs-8">Receive notifications on your Edens360 app.</small>
      </div>
    </div>
    <div @click="updatedNotification.sms_notification = !notification.sms_notification" class="settings-item cursor-pointer mb-5 d-flex align-items-start ">
      <div :class="[notification.sms_notification ? 'check-active' : '']" class="check me-3 d-flex align-items-center justify-content-center rounded-circle">
        <span class="ed-check text-white fw-bold fs-7"></span>
      </div>
      <div>
        <p class="mb-0 body-1 caption-2 text-jungle-green">SMS notifications</p>
        <small class="text-black-50 fs-8">Receive notifications on your mobile phone number.</small>
      </div>
    </div>
    <div @click="updatedNotification.email_notification = !notification.email_notification" class="settings-item cursor-pointer d-flex align-items-start ">
      <div :class="[notification.email_notification ? 'check-active' : '']" class="check me-3 d-flex align-items-center justify-content-center rounded-circle">
        <span class="ed-check text-white fw-bold fs-7"></span>
      </div>
      <div>
        <p class="mb-0 body-1 caption-2 text-jungle-green">Email notifications</p>
        <small class="text-black-50 fs-8">Receive notifications on your email address.</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      updatedNotification: {
        push_notification: false,
        sms_notification: true,
        email_notification: false,
      }
    }
  },
  watch: {
    'updatedNotification': {
      deep: true,
      async handler(newVal, oldVal) {
        await this.updateSettings()
      }
    },
  },
  methods: {
    async updateSettings() {
      try {
        await this.$store.dispatch("auth/settings", {...this.updatedNotification})
      }catch (e) {
      
      }
    }
  },
  mounted() {
    this.updatedNotification = {...this.notification}
  }
}
</script>

<style lang="scss" scoped>
.settings-item {
  .check {
    height: 20px;
    width: 20px;
    border: 2px solid var(--bs-eden-mint);

    &.check-active {
      background: var(--bs-eden-mint);
      transition: background-color 200ms ease-in;
      span {
        color: #fff;
      }
    }
  }
}
.settings-menu {
  border-radius: 8px;
}
.active {
  border: 1px solid rgba(0, 32, 38, 0.1);
}
</style>
