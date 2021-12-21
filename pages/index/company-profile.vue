<template>
  <div>
    <template>
      <div class="card">
        <div class="card-body p-3 p-lg-4" style="padding: 2.25rem; padding-top: 2.125rem">
          <div class="d-xl-flex mb-md-4">
            <div class="d-none d-xl-inline-flex mt-2">
              <h5>Company Profile</h5>
            </div>
            <div class="ms-auto">
              <TabComponent v-model="activeTab" :tabItems="tabs">
                <div v-for="(tab, tabIndex) in tabs" :slot="`tab-head-${tab}`" :key="tabIndex">{{tab}}</div>
              </TabComponent>
            </div>
          </div>
          <div class="border pb-5 p-2 p-lg-4 row" style="border-radius: 8px">
            <div class="col-lg-6 m-0 p-0">
              <form>
                <div class="mb-4">
                  <label class="eden-text-input">
                    <input class="form-control" placeholder="Company Name">
<!--                    <span v-if="$v.form.email.$error" class="ed-x"></span>-->
                  </label>
<!--                  <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>-->
                </div>
                <div class="mb-4">
                  <label class="eden-text-input">
                    <input class="form-control" placeholder="Email Address">
                    <!--                    <span v-if="$v.form.email.$error" class="ed-x"></span>-->
                  </label>
                  <!--                  <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>-->
                </div>
                <div class="mb-4">
                  <SelectComponent placeholder="Company Type" />
                </div>
                <div class="mb-4">
                  <label class="eden-text-input">
                    <input class="form-control" placeholder="2345K-JU83-73763">
                    <!--                    <span v-if="$v.form.email.$error" class="ed-x"></span>-->
                  </label>
                  <!--                  <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>-->
                </div>
                <div class="mb-4">
                  <label class="eden-text-input">
                    <input class="form-control" placeholder="2345K-JU83-73763">
                    <!--                    <span v-if="$v.form.email.$error" class="ed-x"></span>-->
                  </label>
                  <!--                  <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>-->
                </div>
                <div class="mb-4">
                  <label class="eden-text-input">
                    <input class="form-control" placeholder="2345K-JU83-73763">
                    <!--                    <span v-if="$v.form.email.$error" class="ed-x"></span>-->
                  </label>
                  <!--                  <small class="fs-7 text-bad-red" v-if="$v.form.email.$error">{{emailErr}}</small>-->
                </div>
                <div>
                  <div class="d-flex justify-content-between mb-3">
                    <span class="body-1 caption-2">Article of incorporation</span>
                    <span style="margin-right: 40px" class=" body-1 fw-normal text-black-50">PNG, JPEG, PDF</span>
                  </div>
                  <Uploader :queued="queued" @file-removed="" @upload-complete="" class="mb-5" file-type="valid_id" />
                </div>
                <div class="d-grid">
                  <button class="btn btn-jungle-green d-block">Save</button>
                </div>
              </form>
            </div>
<!--            <div class="col-lg-6"></div>-->
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      tabs: ['Company Profile', 'Directors'],
      activeTab: "Company Profile",
      form: {},
      queued: true
    }
  },
  watch: {
    activeTab(newVal) {
      if (newVal === 'Directors')
        this.$router.push({name: 'index-directors'})
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    showBranchDetails(data) {
      this.details = data;
    },
  },
}

</script>

<style lang="scss" scoped>
.search {
  width: 327px;
  input {
    height: 36px;
    font-weight: 400;
    font-size: 14px;
    padding-left: 12px;
  }
  span {
    right: 9px;
    top: 9px;
  }
}

.icon-border{
  background-color: rgba(0, 32, 38, 0.02) ;
  border-radius: 8px;
  padding:6px 5px;
  font-weight: 600;
}

.arrow {
  border: solid #99A6A8;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 1.5px;
  vertical-align: middle;
  &-down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  &-up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
}
.name-decoration{
  text-decoration: underline;
  font-weight: 500;
}
.additional-padding{
  padding: 1rem 0rem;
}

.image-padding{
  padding: 0.7rem 0rem 0.7rem 1.4rem;
}

.emptyTable{
  text-align: center;
  border-bottom: none !important;
  padding-top: 73px !important;
  border-bottom-width: 0px;
}

.employee-menu{
  right: 0;
  margin-top: 16px;
  margin-right: 56px;
  min-width: 16rem;
  left: auto;
  top: auto;
}
</style>
