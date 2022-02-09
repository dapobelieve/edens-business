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
              <h5>Branches</h5>
            </div>
            <div class="ms-sm-5">
              <form class="search position-relative">
                <input name='search-records' type='search' autocomplete='randomstring' class="form-control" placeholder="Search branches" v-model="search">
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
                    <span @click="sortBy('name')" class="cursor-pointer d-inline-flex flex-column">
                    <span class="arrow arrow-up"></span>
                    <span class="arrow arrow-down"></span>
                    </span>
                </span>
                </th>
                <th scope="col">ADDRESS</th>
                <th></th>

              </tr>
              </thead>
              <tbody v-if="branches && branches.length > 0" >
              <tr v-for="(data, dataIndex) in filteredRecords" :key="dataIndex">
                <td class="image-padding"><img class="avatar avatar-sm" src="https://res.cloudinary.com/rohing/image/upload/v1585572497/harley-davidson-1HZcJjdtc9g-unsplash_vwslej.jpg"></td>
                <td class="additional-padding name-decoration">{{data.name}}</td>
                <td>{{data.address}}</td>
                <td class="additional-padding">
                  <span  data-bs-display="static" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle ed-more-vertical icon-border fs-5 cursor-pointer"></span>
                  <ul @click.stop=""  class="employee-menu dropdown-menu py-0 border-0" aria-labelledby="dropdownMenuButton1">
                    <li @click="showBranchDetails('data')"><a class="dropdown-item py-3">
                      <span class="ed-eye text-eden-mint me-3 fw-bold"></span>
                      <span class="body-1">View details</span>
                    </a></li>
                    <li><a class="dropdown-item py-3" href="#">
                      <span class="ed-edit text-eden-mint me-3 fw-bold"></span>
                      <span class="body-1">Edit details</span>
                    </a></li>
                    <li>
                      <a class="dropdown-item cursor-pointer py-3" >
                        <span class="ed-trash text-bad-red me-3 fw-bold"></span>
                        <span class="body-1">Remove Branch</span>
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
                              <p class="text-black-50">You’re yet to create a new branch.
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
                              <p class="text-black-50">We could not find any branch request matching your search. <br>Please try something else. </p>

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

    <!-- <HRdetails :details="details" id="hr-details-modal" /> -->
  </div>
</template>

<script>
import HRdetails from '~/components/salaryadvance/HRdetails.vue'
import { mapGetters } from 'vuex'
import _orderby from "lodash.orderby"


export default {
  components:{
    HRdetails,
  },
  data() {
    return {
      search: "",
      detailsModal: null,
      details: null,
      sort: {
        key: 'name',
        order: 'asc'
      },
    }
  },

  methods: {
    showBranchDetails(data) {
      this.details = data;
    },

    sortBy(column) {
      this.sort.key = column;
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },
  },

    computed: {
    ...mapGetters({
      branches: 'branch/branchList'
    }),

    filteredRecords() {
      if(this.branches && this.branches.length > 0) {
        let records = this.branches;

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
              record.name.toLowerCase().includes(this.search.toLowerCase()) ||
              record.address.toLowerCase().includes(this.search.toLowerCase())
            )
          })
        }

        return records
      }
    }
  },

  async beforeMount() {
    this.user = Object.assign({}, this.$store.state.auth.user)
    try {
      await this.$store.dispatch('branch/getBranches', this.user.reference)
    }catch (e) {
      console.log(e)
    }
  }

//    mounted() {
//     let _detailsModal  = document.getElementById('hr-details-modal');
//     this.detailsModal = new bootstrap.Modal(_detailsModal);
//   }
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
