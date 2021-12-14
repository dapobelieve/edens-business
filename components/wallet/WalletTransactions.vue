<template>
  <div class="border pb-5">
    <table v-if="trx && trx.length > 0" class="table mb-0">
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
        <th scope="col">STATUS</th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer text-black fw-bolder" @click="showDetails(data)" v-for="(data, dataIndex) in filteredRecords.slice(0, 9)" :key="dataIndex">
        <td>
          <span :class="[data.type === 'Credit' ? 'bg-good-green' : 'bg-bad-red']" class="fw-bold rounded d-inline-flex justify-content-center align-items-center text-white" style="height: 10px; width: 10px" >
            <span class="fs-8" :class="[data.type === 'Credit' ? 'ed-plus' : 'ed-minus']"></span>
          </span>
          {{data.type}}</td>
        <td>{{data.category}}</td>
        <td>{{data.amount | currency}}</td>
        <td v-if="data && data.created_at">{{dated(data.created_at)}}</td>
        <td>
          <StatusLabel color="good-green" :text="data.status" text-color="good-green" /></td>
      </tr>
      </tbody>
    </table>
    <table style="height: 400px" v-else class="table mb-0">
      <thead>
      <tr>
        <th  scope="">TYPE</th>
        <th scope="">CATEGORY</th>
        <th scope="col">AMOUNT</th>
        <th scope="col">DATE</th>
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
    <TransactionDetailsModal :record="activeRecord" id="trx-modal" />
  </div>
</template>

<script>
import _orderby from "lodash.orderby"
import { mapGetters } from "vuex"
import TransactionDetailsModal from '~/components/wallet/TransactionDetailsModal'
export default {
  components: { TransactionDetailsModal },
  data() {
    return {
      trxModal: null,
      activeRecord: null,
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
    showDetails(data) {
      this.activeRecord = data;
      this.trxModal.show()
    },
    sortBy(column) {
      this.sort.key = column;
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },
    dated(val) {
      return this.$dateFns.format(new Date(val), 'dd, LLL yyyy, K:mm b')
    }
  },
  mounted() {
    let _trxModal  = document.getElementById('trx-modal');
    this.trxModal = new bootstrap.Modal(_trxModal);
  }
}
</script>

<style lang="scss" scoped>
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
