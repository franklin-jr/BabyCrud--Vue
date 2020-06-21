<template>
  <v-app>
    <v-fade-transition>
      <router-view></router-view>
    </v-fade-transition>
        <v-snackbar color="red" :timeout="4000" :vertical="true"  v-model="snackbarErro.active">
         <span class="white--text"> {{errorMessage.message}} </span>
        </v-snackbar>

        <v-snackbar top color="green" :timeout="4000" :vertical="true"  v-model="snackbarSuccess.active">
            <span class="white--text"> {{successMessage.message}} </span>
        </v-snackbar>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
    snackbarErro: {
        active: false
    },
    snackbarSuccess: {
        active: false
    }
    
  }),
  mounted () {
      if (this.authenticated === false && this.$route.path !== '/') {
        this.$router.push('/')
      }

  },
   watch: {
    errorMessage (val) {
      if (val.ativo) {
        this.snackbarErro.active = true
        setTimeout(() => {
          this.$store.commit('setErrorMessage', {ativo: false, message: null})
        }, 4000);
      }
    },
    successMessage (val) {
      if (val.ativo) {
        this.snackbarSuccess.active = true
        setTimeout(() => {
          this.$store.commit('setSuccessMessage', {ativo: false, message: null})
        }, 4000);
      }
    },
    user (val) {
      if (val) {
        this.$router.push(this.lastPage ? this.lastPage : '/home')
      } else {
        this.$router.push('/')
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    errorMessage () {
      return this.$store.getters.errorMessage
    },
    successMessage () {
      return this.$store.getters.successMessage
    },
    authenticated () {
      return !!this.user
    },
  }
};
</script>
