<template>
  <div v-if="card" class="credit-card position-relative " :class="[color === 'light' ? 'credit-card-light' : '']">
    <!--    <template v-if="freeze">-->
    <!--      <div class="position-absolute" style="z-index: 5; left: 44%; top: 43%">-->
    <!--        <h6 class="text-white">FROZEN</h6>-->
    <!--      </div>-->
    <!--      <div class="freeze h-100 w-100 position-absolute border "></div>-->
    <!--    </template>-->
    <div  class="overlay h-100 text-white caption caption-2">
      <div class="d-flex mb-6 justify-content-between">
        <span class="card-text">Debit Card</span>
        <div class="d-flex align-items-center">
          <!--          <span class="ed-eden-tree fs-3 text-eden-mint me-1"></span>-->
          <!--          <span class="ed-eden text-white me-2"></span>-->

          <!--          <span  data-bs-display="static" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle ed-more-vertical icon-border fs-5 cursor-pointer"></span>-->
          <ul @click.stop=""  class="employee-menu dropdown-menu py-0 border-0" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item py-3">
              <span class="ed-eye text-eden-mint me-3 fw-bold"></span>
              <span class="body-1">View card details</span>
            </a></li>
            <li><a class="dropdown-item py-3" href="#">
              <span class="ed-pause text-eden-mint me-3 fw-bold"></span>
              <span class="body-1">Freeze card</span>
            </a></li>
            <li><a class="dropdown-item py-3" href="#">
              <span class="ed-edit-3 text-eden-mint me-3 fw-bold"></span>
              <span class="body-1">Change PIN</span>
            </a></li>
            <li>
              <a class="dropdown-item cursor-pointer py-3" >
                <span class="ed-trash text-bad-red me-3 fw-bold"></span>
                <span class="body-1">Delete card</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!--      <div>-->
      <!--        <div class="credit-card-number mb-2 card-text">-->
      <!--          <span class="me-1">XXXX</span>-->
      <!--          <span class="me-1">XXXX</span>-->
      <!--          <span class="me-1">XXXX</span>-->
      <!--          <span>{{ card.last_four }}</span>-->
      <!--        </div>-->
      <!--        <div class="d-flex justify-content-between align-items-center">-->
      <!--          <span class="body-1 card-text">{{ card.card_name }}</span>-->
      <!--          <img style="width: 50px" src="~/assets/mastercard.svg">-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
    },
    freeze: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "dark"
    }
  }
}
</script>

<style scoped lang="scss">
.credit-card {
  //border-radius: 12px;
  //box-shadow: 0px 0px 22px 6px rgba(0, 0, 0, 0.2);
  max-width: 408px;
  width: 700px;
  height: 300px;
  background-image: url("~/assets/images/new_card.png");
  //background-size: 450px;
  //background-position: -40px -75px;
  background-repeat: no-repeat;
  transition: all 10ms ease-in;
  &-light {
    background-image: url("../../assets/images/credit-card-light.svg");
    //transition: all 100ms ease-in;
    .card-text {
      color: var(--bs-jungle-green);
    }

    .ed-eden {
      color: var(--bs-jungle-green) !important;
      transition: all 40ms ease-in-out;
    }
  }
  img  {
    height: 100%;
    width: 100%;
    object-fit: cover;
    //transform: scale(1.2);
  }
  .overlay {
    border-radius: 12px;
  }
  .freeze {
    background: rgb(26 26 26 / 99%);;
    filter: blur(0.4rem);
  }

  &-number {
    font-size: 1rem;
  }

  .dropdown-menu {
    left: -200px;
    top: 33px;
    width: 255px !important;
  }
}
.light {

}

.employee-menu{
  left: 0 !important;
  margin-top: 22px !important;
  margin-left: 61px;
  min-width: 16rem;
  left: auto;
  top: auto;
}
</style>
