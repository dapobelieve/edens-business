<template>
  <div class="row">
    <div class="col">
      <div class="mb-3" v-if="loansObj && loansObj.loans">
        <LoanLabel label-color="bg-yellow">
          <div class="d-inline-flex align-items-center">
            <h4 class="me-2">Loan History</h4><small class="text-black-50 fs-8">({{loansObj.loans.length}})</small>
          </div>
        </LoanLabel>
      </div>
      <div v-if="loansObj && loansObj.loans" class="border" style="border-radius: 8px">
        <table class="table mb-0">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">AMOUNT</th>
            <th scope="col">DURATION</th>
            <th scope="col">PLAN</th>
            <th scope="col">APPROVED</th>
            <th scope="col">INTEREST</th>
            <th scope="col">STATUS</th>
          </tr>
          </thead>
          <tbody>
            <tr class="cursor-pointer" @click="showDetails(data)" v-for="data in loansObj.loans" :key="data.reference">
              <td>{{data.reference.toUpperCase()}}</td>
              <td>{{ data.amount | currency }}</td>
              <td>{{data.duration}} months</td>
              <td>{{parseFloat(data.amount/data.duration) | currency}}/m</td>
              <td>{{data.created_at | dateFormatter}}</td>
              <td>10%</td>
              <td>
                <StatusLabel :color="data.status == 'PENDING' ? 'yellow' : 'good-green'" :text-color="data.status == 'PENDING' ? 'yellow' : 'good-green'" :text="data.status" />
              </td>
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
                  <p class="text-black-50">You haven't requested for any loans</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <LoanDetails :record="activeRecord" id="loan-details-modal" />
  </div>
</template>

<script>
import StatusLabel from '~/components/StatusLabel'
import TransactionDetailsModal from '~/components/wallet/TransactionDetailsModal'
import LoanDetails from '~/components/loans/LoanDetails'
export default {
  data() {
    return {
      trxModal: null,
      activeRecord: null,
    }
  },
  components: { LoanDetails, StatusLabel },
  props:["loansObj"],
  methods: {
    showDetails(data) {
      this.activeRecord = data;
      this.$nextTick(() => {
        this.trxModal.show()
      })
    },
  },
  mounted() {
    let _trxModal  = document.getElementById('loan-details-modal');
    this.trxModal = new bootstrap.Modal(_trxModal);
  }
}
</script>

<style lang="scss" scoped>
.table {
  tr {
    th:last-child, td:last-child {
      text-align: center !important;
    }
  }
}
</style>
