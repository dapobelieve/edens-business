<template>
  <div class="modal fade" id="profileModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title">Profile</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div class="modal-body">
          <div class="profile">
            <div v-if="error" class="alert alert-danger mb-3 mt-3" role="alert">
              {{ error }}
            </div>
            <div class="d-flex justify-content-center">
              <div class="profile-avatar d-flex align-items-center justify-content-evenly">
                <template>
                  <template v-if="form.image">
                    <div style="background: rgba(146, 204, 191, 0.1);" class="border d-inline-flex p-1 rounded-circle border-0">
                      <img class="avatar avatar-lg" :src="img" alt="">
                    </div>
                  </template>
                  <template v-else>
                    <template v-if="image">
                      <div style="background: rgba(146, 204, 191, 0.1);" class="border d-inline-flex p-1 rounded-circle border-0">
                        <img class="avatar avatar-lg" :src="imageTempUrl" alt="">
                      </div>
                    </template>
                    <template v-else>
                      <div style="background: rgba(146, 204, 191, 0.1); height: 48px;  width: 48px" class="border bg-eden-green d-inline-flex align-items-center justify-content-center p-1 text-white rounded-circle fw-bold border-0">
                        {{imageTempUrl}}
                      </div>
                    </template>
                  </template>
                </template>
                <div class="">
                  <h6 class="fs-6 text-jungle-green">{{ form.first_name }} {{ form.last_name }}</h6>
                  <template>
                    <StatusLabel v-if="status" color="good-green" text-color="good-green" text="APPROVED" />
                    <StatusLabel v-else color="yellow" text-color="yellow" text="AWAITING APPROVAL" />
                  </template>
                </div>
                <div @click="selectImage" class="uploader bg-eden-mint d-flex cursor-pointer align-items-center justify-content-center rounded-circle">
                  <span class="ed-camera text-white"></span>
                </div>
              </div>
            </div>
            <div class="profile-form mt-5 px-3">
              <div class="row mb-4">
                <div class="col-auto">
                  <label for="fname" class="col-form-label body-1">First name</label>
                </div>
                <div class="col">
                  <input type="text" v-model="form.first_name" id="fname" class="form-control" aria-describedby="passwordHelpInline">
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <label for="lname" class="col-form-label body-1">Last name</label>
                </div>
                <div class="col">
                  <input type="text" v-model="form.last_name" id="lname" class="form-control" aria-describedby="passwordHelpInline">
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <label for="email" class="col-form-label body-1">Email Address</label>
                </div>
                <div class="col">
                  <input type="text" v-model="$v.form.email.$model" id="email" class="form-control" aria-describedby="">
                  <small class="fs-8 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <label for="dob" class="col-form-label body-1">Date of Birth</label>
                </div>
                <div class="col">
                  <DatepickerComponent v-model="$v.form.date_of_birth.$model" />
                  <small class="fs-8 text-bad-red" v-if="$v.form.date_of_birth.$error">{{dateErr}}</small>
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <label for="phone" class="col-form-label body-1">Phone Number</label>
                </div>
                <div class="col">
                  <label class="position-relative">
                    <input style="padding-left: 46px" type="text" v-model="$v.form.phone_number.$model" id="phone" class="form-control" aria-describedby="passwordHelpInline">
                    <small style="top: 18px; left: 13px; font-size: 0.875rem; font-weight: 500" class="position-absolute">+231</small>
                  </label>
                  <small class="fs-8 text-bad-red" v-if="$v.form.phone_number.$error">{{phoneErr}}</small>
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <label for="org" class="col-form-label body-1">Employer</label>
                </div>
                <div class="col" v-if="form.organization">
                  <input type="text" disabled :value="form.organization.name" id="org" class="form-control" aria-describedby="passwordHelpInline">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer px-4">
          <eden-button :loading="btn.loading" @click="updateProfile" :disabled="edited || btn.loading" type="button" class="btn btn-sm btn-jungle-green">Update Profile</eden-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric, email } from "vuelidate/lib/validators";
import { mapState, mapGetters } from "vuex"
import EdenButton from '~/components/EdenButton'
export default {
  components: { EdenButton },
  data () {
    return {
      error: null,
      form: {
        phone_number: null,
        email: null,
        date_of_birth: null,
      },
      userData: {},
      btn: {
        loading: false,
      },
      image: null,
      img: "https://res.cloudinary.com/rohing/image/upload/v1585572497/harley-davidson-1HZcJjdtc9g-unsplash_vwslej.jpg",
    }
  },
  validations:{
    form: {
      phone_number: { required, numeric },
      email: { required, email},
      date_of_birth: { required },
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
    status() {
      return this.form.status !== "UNVERIFIED"
    },
    phoneErr() {
      if (!this.$v.form.phone_number.required) return "Phone number is required";
      if (!this.$v.form.phone_number.numeric) return "Phone number should only contain numbers";
    },
    emailErr() {
      if (!this.$v.form.email.required) return "Email address is required";
      if (!this.$v.form.email.email) return "Invalid email address";
    },
    dateErr() {
      if (!this.$v.form.date_of_birth.required) return "Select your date of birth";
    },
    edited() {
      return (
        Object.entries(this.userData).toString() === Object.entries(this.form).toString() && !this.image
      )
    }
  },
  methods: {
    async updateProfile() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.btn.loading = true
        try {
          if(this.image) this.form = {...this.form, image: this.image}
          let res = await this.$store.dispatch('auth/update', {...this.form})
        }catch (e) {
          this.error = e.message
          this.btn.loading = false
        }
      }
    },
    close() {
      let modal = bootstrap.Modal.getInstance(document.getElementById('profileModal'))
      modal.hide()
    },
    selectImage() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'images/*')
      input.click()

      input.onchange = async () => {
        this.image = input.files[0]
      }
    },
  },
  mounted() {
    this.error = null
    this.form = Object.assign({}, this.$store.state.auth.user)
    this.userData = Object.assign({}, this.$store.state.auth.user)

    let modal = document.getElementById("profileModal")
    modal.addEventListener('hidden.bs.modal', () => {
      this.error = null
      this.showFundingOptions = true
    })

    this.$once('hook:destroyed', () => {
      window.removeEventListener('hidden.bs.modal', ()=> {})
    })
  }
}
</script>

<style lang="scss" scoped>
.profile {
  &-avatar {
    width: 100%;
    max-width: 400px;
  }
  &-form {
    .col-auto {
      width: 150px;
      @media screen and (max-width: 400px) {
        //width: 110px;
      }
    }
    .body-1 {
      color: rgba(0, 32, 38, 0.6);
    }
  }
  .uploader {
    height: 32px;
    width: 32px;
  }
}

</style>
