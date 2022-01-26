<template>
  <div class="modal-content">
    <div class="modal-header px-4">
      <h5 class="modal-title">Enter Pin</h5>
      <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
        <span class="ed-x fs-5"></span>
      </a>
    </div>
    <div class="modal-body">
      <div class="px-2 my-3 d-flex mb-6" style="">
        <div class="pin-container d-flex justify-content-around w-100">
          <div><input v-model="form.pin1" autofocus ref="pin" type="password" min="0" max="9" required class="form-control pin-box" placeholder="0"></div>
          <div><input v-model="form.pin2" ref="pin" type="password" min="0" max="9" required class="form-control pin-box" placeholder="0"></div>
          <div><input v-model="form.pin3" ref="pin" type="password" min="0" max="9" required class="form-control pin-box" placeholder="0"></div>
          <div><input v-model="form.pin4" ref="pin" type="password" min="0" max="9" required class="form-control pin-box" placeholder="0"></div>
        </div>
      </div>
    </div>
    <div class="modal-footer px-4 mb-3 justify-content-between">
      <button @click.prevent="$emit('back')" class="btn btn-sm btn-outline-eden-mint text-eden-green">
        <span class="ed-arrow-left text-eden-mint "></span>Back
      </button>
      <eden-button :loading="btn.loading" :disabled="btn.loading" @click="verifyPin" type="button" class="btn btn-sm btn-jungle-green px-5 ">Confirm</eden-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      btn: {loading: false},
      form: {
        description: null,
        pin:null,
        pin1:null,
        pin2: null,
        pin3: null,
        pin4: null
      }
    }
  },
  methods: {
    verifyPin() {
      this.form.pin = this.form.pin1 + this.form.pin2 + this.form.pin3 + this.form.pin4
      this.btn.loading = true
      setTimeout(() => {
        this.btn.loading = false
        this.$emit('success', this.form.pin)
      }, 3000)
    }
  },
  mounted() {
    this.btn.loading = false
    this.$nextTick(() => {
      const pins = document.querySelectorAll('.pin-box')
      pins.forEach((pin, idx) => {
        pin.addEventListener('keydown', (e) => {
          if(e.key >=0 && e.key <=9) {
            pins[idx].value = ''
            if([...pins][idx+1]) {
              setTimeout(() => pins[idx+1].focus(), 10)
            }
          }else if(e.key === 'Backspace') {
            if([...pins][idx-1]) {
              setTimeout(() => pins[idx-1].focus(), 10)
            }
          }
        })
      })
    })
    this.modalDialog = document.getElementsByClassName('send-money')
    this.modalDialog[0].setAttribute('style', "max-width: 360px")
  },
  destroyed() {
    this.modalDialog[0].setAttribute('style', "max-width: 477px")
  }
}
</script>

<style scoped lang="scss">
.pin-box {
  text-align: center;
  height: 60px;
  width: 60px;
  font-weight: 500;
  font-size: 24px;
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:valid {
    border-color: var(--bs-eden-green);
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.25);
  }
}
</style>
