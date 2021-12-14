<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-4 col-md-5 col-sm-7 offset-sm-3 offset-xl-0 offset-md-4">
        <NuxtChild />
      </div>
      <div class="col-xl-8 d-xl-block d-none vh-100 ps-0 bg-color text-center">
        <div>
          <h1 class="text-jungle-green fs-45 mt-6 mb-5">Pay, send and borrow instantly</h1>
          <div>
            <img src='../assets/background.png' alt="background" class="w-90">
          </div>
          <!-- <div class="banner p-0 d-flex justify-content-center align-items-start"></div> -->
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['registration']
}
</script>
<style lang="scss" scoped>
.eden-shadow {
  box-shadow: 0px 6px 8px 6px rgba(146, 204, 191, 0.24);
}
.heading {
  font-size: 50px;
}

.bg-color{
  background: #F7FBFA;
}
* {
  //border: 1px solid red;
}

.fs-45{
  font-size: 45px;
}

.w-90{
  width: 90%;
}
.banner {
  height: 100%;
  background-size: cover;
  // background-repeat: round;
  background-repeat: no-repeat;
  background-image: url('./assets/background.png');
  background-position: center center;
}

</style>
