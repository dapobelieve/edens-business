<template>
  <div class="container-fluid">
    <div class="row">
      <div class="d-none d-xl-block col-xl-2 px-0 ">
        <div class="d-flex vh-100 position-fixed flex-column border" style="width: 16.7%">
          <div class="p-4"><Logo /></div>
          <hr>
          <div class="menu flex-grow-1">
            <nuxt-link :to="menu.path" v-for="(menu, menuIndex) in menus" :class="$route.path===menu.path ? 'menu-item-active' : ''" :key="menuIndex" class="menu-item py-3 text-black-50 d-flex align-items-center ps-4 cursor-pointer position-relative">
              <span :class="[menu.iconClass, $route.path===menu.path ? 'text-eden-green': '', menu.iconClass === 'ed-pie-chart' ? 'fs-5 ms-2' : 'fs-2']" class="me-3 "></span>
                <span :class="[$route.path===menu.path ? 'text-jungle-green' : '']" class="body-1 fw-bold">{{ menu.name }}</span>
            </nuxt-link>
          </div>
          <div v-if="user" class="dropup">
            <a href="#" data-bs-display="static" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle profile border py-3 d-flex align-items-center px-xxl-3">
              <img style="height: 36px; width: 36px" class="avatar flex-shrink-0 avatar-sm me-3" :src="img">
              <div class="flex-grow-1 overflow-hidden flex" ref="name-container">
                <h6 class="fs-8 text-jungle-green">{{ user.first_name }} {{ user.last_name }}</h6>
                <small class="fs-8 text-black-50">{{user.email}}</small>
              </div>
              <div class="">
                <div><span class="ed-chevron-down fs-4 text-eden-mint"></span></div>
              </div>
            </a>
            <ul @click.stop="" class="dropdown-menu py-0 border-0" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item py-3" @click.prevent="showProfileModal">
                <span class="ed-user text-eden-mint me-3 fw-bold"></span>
                <span class="body-1">Personal profile</span>
              </a></li>
              <li><a class="dropdown-item py-3" @click.prevent="$router.push({name: 'index-company-profile'})">
                <span class="ed-home text-eden-mint me-3 fw-bold"></span>
                <span class="body-1">Company profile</span>
              </a></li>
              <li><a class="dropdown-item py-3" @click.prevent="settingsModal.show()" href="#">
                <span class="ed-settings text-eden-mint me-3 fw-bold"></span>
                <span class="body-1">Settings</span>
              </a></li>
              <li>
                <a class="dropdown-item cursor-pointer py-3" @click.exact.prevent="logout">
                  <span class="ed-log-out text-bad-red me-3 fw-bold"></span>
                  <span class="body-1 text-bad-red">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-xl-10 px-0" style="background-color: #FAFAFA">
        <NuxtChild />
      </div>
    </div>
    <ProfileModal id="profileModal" />
    <SettingsModal id="settings-modal" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  middleware: ['auth'],
  data() {
    return {
      img: "https://res.cloudinary.com/rohing/image/upload/v1585572497/harley-davidson-1HZcJjdtc9g-unsplash_vwslej.jpg",
      menus: [
        {
          name: 'Wallet',
          path: '/',
          iconClass: 'ed-wallet'
        },
        {
          name: 'Bills Payment',
          path:  '/bills',
          iconClass: 'ed-bills-payments',
        },
        {
          name: 'Loans',
          path:  '/loans',
          iconClass: 'ed-loans',
        },
        {
          name: 'Branches',
          iconClass: 'ed-branch',
          path: '/branches'
        },
        {
          name: 'Notification',
          iconClass: 'ed-notification',
          path: '/notification'
        },
        // {
        //   name: 'Branches',
        //   iconClass: 'ed-branch',
        //   path: '/branches'
        // },

        // {
        //   name: 'Stakeholder',
        //   iconClass: 'ed-pie-chart',
        //   path: '/stakeholder'
        // },
        {
          name: 'Salary Advance',
          iconClass: 'ed-salary-advance',
          path: '/salary-advance'
        }
      ],
      settingsModal: null
    }
  },
  methods: {
    showProfileModal() {
      this.profileModal.show()
    },
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.replace('/account/login')
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser"
    }),
  },
  mounted() {
    const profileModal = document.getElementById('profileModal')
    this.profileModal = new bootstrap.Modal(profileModal)

    const _settingsModal = document.getElementById('settings-modal');
    this.settingsModal = new bootstrap.Modal(_settingsModal)
  }
}
</script>

<style scoped lang="scss">
.dropdown-menu {
  left: 12px;
  width: 255px !important;
}

.menu {
  .menu-item {
    transition: background-color 500ms ease-in-out;
    &:hover {
      background-color: rgba(146, 204, 191, 0.05);
    }

    &-active {
      &:before {
        content: '';
        top: 0;
        width: 4px;
        left: 0;
        height: 100%;
        position: absolute;
        background-color: var(--bs-blue-green);
      }
    }
  }
}

</style>
