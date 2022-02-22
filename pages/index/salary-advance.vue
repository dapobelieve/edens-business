<template>
  <div>
    <template>
      <div class="card">
        <div class="card-body" style="padding: 2.25rem; padding-top: 2.125rem">
          <div class="d-xl-flex mb-md-4">
            <div class="d-none d-xl-inline-flex mt-2">
              <div class="border-cadet-grey me-2">
                <span class="ed-user text-cadet-grey fs-4"></span>
              </div>
              <h5>HR Member</h5>
            </div>
            <div class="ms-sm-5">
              <form class="search position-relative">
                <input name='search-records' type='search' autocomplete='randomstring' class="form-control" placeholder="Search HR Members" v-model="search">
                <span class="ed-search cursor-pointer text-eden-mint position-absolute"></span>
              </form>
              <!-- <div class="search position-relative">
                <input class="form-control" placeholder="Search loan" v-model="search">
                <span class="ed-search cursor-pointer text-eden-mint position-absolute"></span>
              </div> -->
            </div>
          </div>

          <div class="border pb-5" style="border-radius: 8px">
            <table  class="table mb-0">
              <thead>
              <tr>
                <th ></th>
                <th scope="col" class="additional-padding">
                <span class="d-flex align-items-center">
                    <span class="me-2">NAME</span>
                    <span @click="sortBy('first_name')" class="cursor-pointer d-inline-flex flex-column">
                    <span class="arrow arrow-up"></span>
                    <span class="arrow arrow-down"></span>
                    </span>
                </span>
                </th>
                <th scope="col">EMAIL</th>
                <th scope="col">PHONE</th>
                <th scope="col">REGISTRATION DATE</th>
                <th scope="col">STATUS</th>
                <th></th>

              </tr>
              </thead>
              <tbody  v-if="membersList && membersList.length > 0">
              <tr v-for="(data, dataIndex) in filteredRecords" :key="dataIndex" class="cursor-pointer">
                <td class="image-padding"><img class="avatar avatar-sm" src="https://res.cloudinary.com/rohing/image/upload/v1585572497/harley-davidson-1HZcJjdtc9g-unsplash_vwslej.jpg"></td>
                <td class="additional-padding">{{data.first_name + ' ' + data.last_name}}</td>
                <td class=" name-decoration">{{data.email}}</td>
                <td>{{data.phone_number}}</td>
                <td v-if="data && data.created_at">{{dated(data.created_at)}}</td> <td v-else>24/09/2010</td>
                <td>{{data.business_status}}</td>
                <td class="additional-padding">
                  <span  data-bs-display="static" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle ed-more-vertical icon-border fs-5 cursor-pointer"></span>
                  <ul @click.stop=""  class="employee-menu dropdown-menu py-0 border-0" aria-labelledby="dropdownMenuButton1">
                    <li @click="showHRDetails(data)"><a class="dropdown-item py-3">
                      <span class="ed-eye text-eden-mint me-3 fw-bold"></span>
                      <span class="body-1">View details</span>
                    </a></li>
                    <li v-if="data.business_status.toLowerCase() === 'active'" @click="showUpdateConfirm(data, 'Freeze')"><a class="dropdown-item py-3" href="#">
                      <span class="ed-pause text-eden-mint me-3 fw-bold"></span>
                      <span class="body-1">Freeze Member</span>
                    </a></li>
                    <li v-else-if="data.business_status.toLowerCase() === 'frozen'" @click="showUpdateConfirm(data, 'Unfreeze')"><a class="dropdown-item py-3" href="#">
                      <span class="ed-play text-eden-mint me-3 fw-bold"></span>
                      <span class="body-1">Unfreeze Member</span>
                    </a></li>
                    <li @click="showUpdateConfirm(data, 'Delete')">
                      <a class="dropdown-item cursor-pointer py-3" >
                        <span class="ed-trash text-bad-red me-3 fw-bold"></span>
                        <span class="body-1">Remove Member</span>
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
              </tbody>
              <tbody v-else>
                  <tr>
                  <td  class="emptyTable" colSpan="100">
                      <div class="card border-0">
                          <div class="card-body d-flex flex-column" style="padding: 2.25rem; padding-top: 2.125rem">
                          <img class="mb-3" style="height: 4.4rem" src="~/assets/nothing.svg">
                          <div class="text-center mb-5">
                              <h6 class="mb-3">Nothing to see here</h6>
                              <p class="text-black-50">You’re yet to invite your HR members.
                              </p>
                          </div>
                          </div>
                      </div>
                  </td>
              </tr>
              </tbody>
              <tbody v-if="filteredRecords && filteredRecords.length == 0">
                  <tr>
                  <td  class="emptyTable" colSpan="100">
                      <div class="card border-0">
                          <div class="card-body d-flex flex-column" style="padding: 2.25rem; padding-top: 2.125rem">
                          <img class="mb-3" style="height: 4.4rem" src="~/assets/nothing.svg">
                          <div class="text-center mb-5">
                              <h6 class="mb-3">No Results found</h6>
                              <p class="text-black-50">We could not find any HR member matching your search. <br>Please try something else. </p>

                          </div>
                          </div>
                      </div>
                  </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- <LoanDetails :details="loanDetails" id="loan-details-modal" /> -->
        </div>
      </div>
    </template>

    <HRdetails :details="details" id="hr-details-modal" />
    <HRStatusConfirm :details="details" :action="action" @cancel-button="cancelModal" @update-status="updateStatus" :loading="loading" id="status-confirm-modal" />
  </div>
</template>

<script>
import HRdetails from '~/components/salaryadvance/HRdetails.vue'
import HRStatusConfirm from '~/components/salaryadvance/HRStatusConfirm.vue'
import { mapGetters } from 'vuex'
import _orderby from "lodash.orderby"

export default {
  components:{
    HRdetails,
    HRStatusConfirm
  },
  data() {
    return {
      search: "",
      detailsModal: null,
      statusModal: null,
      details: null,
      action: null,
      loading: false,
      sort: {
        key: 'name',
        order: 'asc'
      },
    }
  },

  methods: {
    showHRDetails(data) {
      this.details = data;
      this.$nextTick(() => {
        this.detailsModal.show()
      })
    },

    showUpdateConfirm(data, action) {
      this.details = data;
      this.action = action
      this.$nextTick(() => {
        this.statusModal.show()
      })
    },

    cancelModal (){
      this.$nextTick(() => {
        this.statusModal.hide()
      })
    },

    async updateStatus(ref, data){
      this.loading = true;
       try {
        let res = await this.$axios.$patch(`business/members/${ref.reference}/status`, data)
        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })
        this.$store.commit('auth/setStates', {toast: {show: true,
            data: {
              header: 'HR Status Updated!',
              body: `You have updated ${ref.first_name + ' ' + ref.last_name}\'s status and they have been notified`
            }}})
        toast.show()
      }
      catch (e) {
        let toast = new bootstrap.Toast(document.getElementById('liveToast'), {
          delay: 7000,
          animation: true,
        })
        this.$store.commit('auth/setStates', {toast: {show: true,
            data: {
              header: 'Ooops!',
              body: `${e.message}`
            }}})
        toast.show()
        this.error = e.message
      }
      finally {
        this.loading = false
        this.statusModal.hide()
        await this.$store.dispatch('salary-advance/getMembers', 'HR')
  
      }
    },

    dated(val) {
      return this.$dateFns.format(new Date(val), 'dd/ LL/yyyy')
    },

    sortBy(column) {
      this.sort.key = column;
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },
  },

   mounted() {
    let _detailsModal  = document.getElementById('hr-details-modal');
    this.detailsModal = new bootstrap.Modal(_detailsModal);
    let _statusModal  = document.getElementById('status-confirm-modal');
    this.statusModal = new bootstrap.Modal(_statusModal);
  },

      computed: {
    ...mapGetters({
      membersList: 'salary-advance/businessMembers'
    }),

    filteredRecords() {
      if(this.membersList && this.membersList.length > 0) {
        let records = this.membersList;

        if(this.sort.key) {
          records = _orderby(records, (i) => {
            let value = i[this.sort.key]

            if(!isNaN(Date.parse(value))) {
              return Date.parse(value)
            }

            if(!isNaN(parseFloat(value))) {
              return parseFloat(value)
            }

            return String(i[this.sort.key]).toLowerCase()
          }, this.sort.order)
        }
        if(this.search){
          records = records.filter(record =>{
            return (
              record.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
              record.last_name.toLowerCase().includes(this.search.toLowerCase()) ||
              record.email.toLowerCase().includes(this.search.toLowerCase())
            )
          })
        }

        return records
      }
    }
  },

  async beforeMount() {
    this.user = Object.assign({}, this.$store.state.auth.user)
    let role = "HR"
    try {
      await this.$store.dispatch('salary-advance/getMembers', role)
    }catch (e) {
      console.log(e)
    }
  }
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
