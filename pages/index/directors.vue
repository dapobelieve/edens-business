<template>
  <div>
    <template>
      <div class="card">
        <div class="card-body" style="padding: 2.25rem; padding-top: 2.125rem">
          <div class="d-xl-flex mb-md-4 bodrder">
            <div class="d-none d-xl-inline-flex mt-2">
              <div class="border-cadet-grey me-2">
                <span class="ed-user text-cadet-grey fs-4"></span>
              </div>
              <h5>Directors</h5>
            </div>
            <div class="ms-sm-5">
              <form class="search position-relative">
                <input name='search-records' type='search' autocomplete='randomstring' class="form-control" placeholder="Search Directors" v-model="search">
                <span class="ed-search cursor-pointer text-eden-mint position-absolute"></span>
              </form>
              <!-- <div class="search position-relative">
                <input class="form-control" placeholder="Search loan" v-model="search">
                <span class="ed-search cursor-pointer text-eden-mint position-absolute"></span>
              </div> -->
            </div>
            <div class="ms-auto">
              <TabComponent v-model="activeTab" :tabItems="tabs">
                <div v-for="(tab, tabIndex) in tabs" :slot="`tab-head-${tab}`" :key="tabIndex">{{tab}}</div>
              </TabComponent>
            </div>
          </div>

          <div class="border pb-5" style="border-radius: 8px">
            <table  class="table mb-0">
              <thead>
              <tr class="text-uppercase">
                <th scope="col" class="">
                  <span class="d-flex align-items-center">
                      <span class="me-2">NAME</span>
                      <span @click="sortBy('first_name')" class="cursor-pointer d-inline-flex flex-column">
                      <span class="arrow arrow-up"></span>
                      <span class="arrow arrow-down"></span>
                      </span>
                  </span>
                </th>
                <th scope="col">Email</th>
                <th scope="col">phone</th>
                <th scope="col">registration date</th>
                <th scope="col">status</th>
                <th></th>
              </tr>
              </thead>
              <tbody >
              <tr class="cursor-pointer">
                <td class="text-decoration-underline fw-bolder">
                 <div class="d-flex align-items-center">
                   <UserAvatar class="me-2" />
                   <span>Jessica Brownly</span>
                 </div>
                </td>
                <td>be@edens360.com</td>
                <td>+33 956 340 4057</td>
                <td>22/01/1984</td>
                <td>PENDING</td>
                <td class="">
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
              <!-- <tbody>
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
              </tbody> -->
              <!-- <tbody v-if="filteredRecords && filteredRecords.length == 0">
                  <tr>
                  <td  class="emptyTable" colSpan="100">
                      <div class="card border-0">
                          <div class="card-body d-flex flex-column" style="padding: 2.25rem; padding-top: 2.125rem">
                          <img class="mb-3" style="height: 4.4rem" src="~/assets/nothing.svg">
                          <div class="text-center mb-5">
                              <h6 class="mb-3">No Results found</h6>
                              <p class="text-black-50">We could not find any loan request matching your search. <br>Please try something else. </p>

                          </div>
                          </div>
                      </div>
                  </td>
              </tr>
              </tbody> -->
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tabs: ['Company Profile', 'Directors'],
      activeTab: "Directors",
      search: "",
      detailsModal: null,
      details: null
    }
  },
  watch: {
    activeTab(newVal) {
      if (newVal === 'Company Profile')
        this.$router.push({name: 'index-company-profile'})
    }
  },
  methods: {
    showBranchDetails(data) {
      this.details = data;
    },
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
