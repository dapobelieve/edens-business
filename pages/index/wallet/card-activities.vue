<template>
  <div class="card">
    <div class="card-body px-5 pt-5">
      <div class="mb-3">
        <div @click="$router.go(-1)" class="cursor-pointer d-inline-flex align-items-center"><span class="ed-arrow-left-circle fs-3 text-eden-mint"></span> <small class="text-jungle-green fs-7 ms-1">Back</small></div>
      </div>
      <div class="d-flex align-items-center mb-4">
        <h5>Card Activities</h5>
        <div class="ms-auto">
          <div class="search position-relative">
            <input v-model="quickSearchQuery" class="form-control" placeholder="Search">
            <span class="ed-search cursor-pointer text-eden-mint position-absolute"></span>
          </div>
        </div>
      </div>
      <template>
        <div v-if="filteredRecords && filteredRecords.length > 0" class="border pb-5" style="border-radius: 8px">
          <table  class="table mb-0">
            <thead>
            <tr>
              <th scope="col">
         <span class="d-flex align-items-center">
            <span class="me-2">TYPE</span>
            <span @click="sortBy('type')" class="cursor-pointer d-inline-flex flex-column">
              <span class="arrow arrow-up"></span>
              <span class="arrow arrow-down"></span>
            </span>
         </span>
              </th>
              <th scope="col">CATEGORY</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">
              <span class="d-flex align-items-center">
                <span class="me-2">DATE</span>
                <span @click="sortBy('created_at')" class="cursor-pointer d-inline-flex flex-column">
                  <span class="arrow arrow-up"></span>
                  <span class="arrow arrow-down"></span>
                </span>
             </span>
              </th>
              <th scope="col">REFERENCE NO</th>
              <th scope="col">DESCRIPTION</th>

              <th scope="col">STATUS</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, dataIndex) in filteredRecords" :key="dataIndex">
              <td>{{data.type}}</td>
              <td>{{data.category}}</td>
              <td>{{data.amount | currency}}</td>
              <td v-if="data && data.created_at">{{dated(data.created_at)}}</td>
              <td>{{data.reference.toUpperCase()}}</td>
              <td>{{data.description}}</td>
              <td><StatusLabel color="good-green" :text="data.status" text-color="good-green" /></td>
            </tr>
            </tbody>
          </table>
        </div>
        <table v-else class="table mb-0">
          <thead>
          <tr>
            <th scope="col">
         <span class="d-flex align-items-center">
            <span class="me-2">TYPE</span>
            <span @click="sortBy('type')" class="cursor-pointer d-inline-flex flex-column">
              <span class="arrow arrow-up"></span>
              <span class="arrow arrow-down"></span>
            </span>
         </span>
            </th>
            <th scope="col">CATEGORY</th>
            <th scope="col">AMOUNT</th>
            <th scope="col">
              <span class="d-flex align-items-center">
                <span class="me-2">DATE</span>
                <span @click="sortBy('created_at')" class="cursor-pointer d-inline-flex flex-column">
                  <span class="arrow arrow-up"></span>
                  <span class="arrow arrow-down"></span>
                </span>
             </span>
            </th>
            <th scope="col">REFERENCE NO</th>
            <th scope="col">DESCRIPTION</th>

            <th scope="col">STATUS</th>
          </tr>
          </thead>
          <tbody >
          <tr>
            <td  class="emptyTable" colSpan="100">
              <div class="card border-0">
                <div class="card-body d-flex flex-column" style="padding: 2.25rem; padding-top: 2.125rem">
                  <img class="mb-3" style="height: 4.4rem" src="~/assets/images/nothing.svg">
                  <div class="text-center mb-5">
                    <h6 class="mb-3 ">Nothing to see here</h6>
                    <p class="text-black-50">No Records found</p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </template>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _orderby from "lodash.orderby"
export default {
  data() {
    return {
      quickSearchQuery: "",
      sort: {
        key: 'type',
        order: 'asc'
      }
    }
  },
  computed: {
    ...mapGetters({
      trx: "wallet/walletTrxn"
    }),
    filteredRecords() {
      if(this.trx && this.trx.length > 0) {
        let records = this.trx;

        records = records.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(this.quickSearchQuery.toLowerCase()) > -1
          })
        })

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

        return records
      }
    }
  },
  methods: {
    sortBy(column) {
      this.sort.key = column;
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },
    dated(val) {
      return this.$dateFns.format(new Date(val), 'dd, LLL yyyy, K:mm b')
    }
  },
  async beforeMount() {
    await this.$store.dispatch('wallet/getTransactions')
  }
}
</script>

<style scoped lang="scss">
.search {
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
.emptyTable{
  text-align: center;
  border-bottom: none !important;
  padding-top: 73px !important;
  border-bottom-width: 0px;
}
</style>
