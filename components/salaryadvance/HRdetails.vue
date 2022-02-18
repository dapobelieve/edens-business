<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width: 379px">
      <div class="modal-content" >
        <div class="modal-header px-4">
          <h5 class="modal-title">HR Details</h5>
          <a type="button" class="ms-auto text-eden-mint d-inline-flex align-items-center justify-content-center rounded-circle" style="height: 32px; width: 32px; background: rgba(146, 204, 191, 0.1);" data-bs-dismiss="modal" aria-label="Close">
            <span class="ed-x fs-5"></span>
          </a>
        </div>
        <div v-if="details" class="modal-body">
        <!-- <div v-if="details" class="modal-body"> -->
            <div  class="text-center img-div-padding">
                <img class="avatar avatar-lg" src="https://res.cloudinary.com/rohing/image/upload/v1585572497/harley-davidson-1HZcJjdtc9g-unsplash_vwslej.jpg"><br/>
                <StatusLabel class="mt-sm-3" :text-color="statcolor" :color="statcolor" :text="getStatus">REGISTERED </StatusLabel>
            </div>
          <div class="px-3">
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">ID NUMBER</small>
              <span class="body-1 text-jungle-green">{{details.reference}}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">NAME</small>
              <span class="body-1 text-jungle-green">{{details.first_name + ' ' + details.last_name}}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">DATE JOINED</small>
              <span class="body-1 text-jungle-green">{{details.created_at | dateFormatter}}</span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">EMAIL ADDRESS</small>
              <span class="body-1 text-jungle-green">{{details.email}}</span>
            </div>
            <div class="d-flex justify-content-between mb-5" v-if="details.business_branch">
              <small class="text-black-50">BRANCH</small>
              <span class="body-1 ">
                {{details.business_branch.name}}
              </span>
            </div>
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">PHONE NUMBER</small>
              <span class="body-1 ">
                {{details.phone_number}}
              </span>
            </div>
            
            <div class="d-flex justify-content-between mb-5">
              <small class="text-black-50">STATUS</small>
              <span class="body-1 ">
                <!-- <StatusLabel class="pe-0" text="On leave" text-color="yellow" color="yellow" /> -->
                <div class="dropup">
                <StatusLabel class="pe-0 dropdown-toggle cursor-pointer" text-color="jungle-green body-1" :color="color" :text="getEmploymentStatus" data-bs-display="static" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> <span class="ed-chevron-down fs-7 fw-bold ms-sm-2 me-md-3"></span> </StatusLabel>
                  <ul @click.stop=""  class="status-menu dropdown-menu py-0 border-0" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item py-3">
                        <span style="height: 10px; width: 10px; display: inline-block;" class="rounded-circle me-3 bg-good-green"></span>
                        <span class="body-1">Registered</span>
                    </a></li>
                    <li ><a class="dropdown-item py-3" href="#">
                         <span style="height: 10px; width: 10px; display: inline-block;" class="rounded-circle me-3 bg-yellow"></span>
                        <span class="body-1">Frozen</span>
                    </a></li>
                    <li >
                        <a class="dropdown-item cursor-pointer py-3" >
                         <span style="height: 10px; width: 10px; display: inline-block;" class="rounded-circle me-3 bg-bad-red"></span>
                        <span class="body-1">Pending</span>
                        </a>
                    </li>
                  </ul>
                </div>
                
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      color:'',
      statcolor:''
    }
  },
  props: ['details'],
  methods: {
    dated(val) {
      return this.$dateFns.format(new Date(val), 'dd, LLL yyyy, K:mm b')
    },
    statusChange(data){
      const statusData = {
        status: data,
      }
      this.$emit('change-status', statusData, this.details)
    }
  },
  computed:{
    getEmploymentStatus(){
    //   if (this.details.employment_status){
        let status = 'Frozen'

        if(status.toLowerCase() === 'registered'){
          this.color = 'good-green'
          status='Active'
        }else if(status.toLowerCase() === 'frozen'){
          this.color = 'yellow'
          status='Frozen'
        }else{
          this.color='bad-red'
          status = 'Inactive'
        }
        return status 
    //   }
    },

    getStatus(){
      // if (this.details.status){
        let status = "REGISTERED"

        if(status.toLowerCase() === 'registered'){
          this.statcolor = 'good-green'
          status='REGISTERED'
        }else if(status.toLowerCase() === 'archived'){
          this.statcolor = 'yellow'
          status='Archived'
        }else{
          this.statcolor='bad-red'
          status = 'Unverfied'
        }
        return status 
      // }
    }
  }
  
}
</script>

<style lang="scss" scoped>
.img-div-padding{
    padding: 10px 0px 40px;
}

.status-menu{
  right: 0;
  margin-right: 70px;
  left: auto;
  margin-bottom: 0.5rem !important;
}
</style>
