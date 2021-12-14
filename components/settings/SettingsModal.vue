<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header px-4">
          <h5 class="modal-title">Settings</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body mb-9">
          <div class="px-2" style="height: 24rem">
            <div class="d-flex">
              <div @click="menu=1" :class="[menu ===1 ? 'active' : '']" class="settings-menu me-3 body-1 caption-2 px-3 py-2 cursor-pointer">Notifications</div>
              <div @click="menu=2" :class="[menu ===2 ? 'active' : '']" class="settings-menu body-1 caption-2 px-3 py-2 cursor-pointer">Password</div>
            </div>
            <hr>
            <template  v-if="menu === 1">
              <keep-alive>
                <Notification :notification="user.user_settings" />
              </keep-alive>
            </template>
            <template v-else>
              <Password />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Notification from '~/components/settings/Notification'
import Password from '~/components/settings/Password'
export default {
  components: { Password, Notification },
  data () {
    return {
      menu: 1,
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser"
    })
  },
  mounted() {
    let modal = document.getElementById("settings-modal")
    modal.addEventListener('hidden.bs.modal', () => {
      this.fund.method = null
      this.showFundingOptions = true
    })

    this.$once('hook:destroyed', () => {
      window.removeEventListener('hidden.bs.modal', ()=> {})
    })
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
