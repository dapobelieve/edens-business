
<template>
  <div>
    <div class="d-inline-flex align-items-center mb-4">
      <p class="caption m-0 me-3 fw-bold text-black-50" v-if="loan.loan">{{ loan.loan.reference.toUpperCase() }}</p>
      <StatusLabel :color="loan.loan.status == 'PENDING' ? 'yellow' : 'good-green'" :text-color="loan.loan.status == 'PENDING' ? 'yellow' : 'good-green'" :text="loan.loan.status" />
    </div>
    <div class="row gx-xl-6 " >
      <div class="col-lg-4 mb-3 mb-xl-0">
        <div class="card h-100">
          <div class="card-body px-4 pt-4">
            <div class="loan-info d-flex flex-column h-100 justify-content-between">
              <div class="loan-deta">
                <LoanLabel label-color="bg-blue-green" class="" >
                  <div class="label-text body-1 text-black-50">Loan Amount</div>
                </LoanLabel>
                <p class="mb-0 fw-bold">{{ amount | currency }}</p>
              </div>
              <div>
                <LoanLabel class="" label-color="bg-lavender-floral">
                  <div class="label-text body-1 text-black-50">Repayment duration</div></LoanLabel>
                <p class="mb-0 fw-bold">{{ loan.loan.duration }} Months</p>
              </div>
              <div>
                <LoanLabel class="" label-color="bg-inch-worm" text="Payback Plan">
                  <div class="label-text body-1 text-black-50">Repayment plan</div>
                </LoanLabel>
                <div class="d-flex align-items-center ">
                  <p class="fw-bold mb-0">{{ loan.loan.repayment_amount | currency }}</p><small>/month</small>
                </div>
              </div>
              <div>
                <div class="d-flex interest-section align-items-center">
                  <div class="d-flex align-items-center justify-content-center px-3 py-1">
                    <div class="me-3 rounded-circle d-inline-flex justify-content-center align-items-baseline"><span class="ed-percent fw-bold fs-7 text-eden-mint"></span></div>
                    <div class="text-jungle-green d-inline-flex align-items-baseline"><span class="me-2">Interest at</span> <small class="fw-bold fs-6">{{loan.loan.interest}}%</small></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-xl-4 mb-3 mb-xl-0">
        <div class="card h-100 ">
          <div class="card-body px-0 payback">
            <div class="d-flex px-4 align-items-start justify-content-between mb-2">
              <p class="fw-bolder text-black-50">Repayment</p>
              <StatusLabel color="yellow" :text="loan.loan.next_payment_days_left" />
            </div>
            <div class="text-center">
              <CircleProgress :percentage="Math.round(loan.loan.percentage_paid)" color="good-green" />
              <div class="mb-3">
                <div class="d-inline-flex align-items-end">
                  <h4 class="me-1">{{ amountLeft | currency }}</h4><small class="fs-8">left</small>
                </div>
              </div>
              <button class="mb-2 btn bg-good-green btn-sm text-white px-3">Next payment in <a href="#" class="ms-1 fw-bolder text-white text-decoration-underline">9 days</a></button>
              <hr/>
              <div>
                <div class="d-inline-flex py-2 text-eden-green">
                  View payment history
                  <span class="ed-chevron-right fs-4 text-eden-mint ms-2"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column payback">
            <div class="d-flex align-items-start justify-content-between mb-2">
              <p class="fw-bolder text-black-50">Credit Score</p>
              <StatusLabel color="lavender-floral" :text="`${loan.credit_score.number_of_repayments} payments`" />
            </div>
            <div class="text-center flex-grow-1">
              <CircleProgress :stroke-width="6" :percentage="loan.credit_score.percent" :radius="40" :width="130" />
            </div>
            <div class=" justify-content-center text-center d-flex">
              <p class="fs-8 text-black-50">Your score’s getting there, keep pushing! </p>🤗
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatusLabel from '~/components/StatusLabel'
export default {
  props: {
    loan:  {
      type: Object,
    }
  },
  components: { StatusLabel },
  methods: {

  },
  computed: {
    nextPaymentDate() {
     if(this.loan.loan)  return this.$dateFns.formatDistanceToNow(new Date('2021 10 22'), )
    },
    amount() {
      return parseFloat(this.loan.loan.amount)
    },
    amountLeft() {
      return parseFloat(this.loan.loan.amount_left)
    },
    paybackAmount() {
      return  parseFloat(this.loan.loan.amount/this.loan.loan.duration)
    }
  }
}
</script>
<style lang="scss" scoped>
.loan-info {
  >div:not(:last-child) {
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(0, 32, 38, 0.1);;
  }
}
.interest-section {
  > div {
    background: rgba(0, 32, 38, 0.02);
    border-radius: 8px;
    >div:first-child {
      height: 20px;
      width: 20px;
      border: 2px solid #92CCBF;
    }
  }
}
</style>
