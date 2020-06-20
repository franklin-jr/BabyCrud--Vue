<template>
  <v-app>
    <v-fade-transition>
      <router-view></router-view>
    </v-fade-transition>
        <v-snackbar :timeout="4000" :vertical="true"  v-model="snackbar.active">
         <span class="white--text"> {{errorMessage}} </span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="snackbar.active = false">
            <v-icon color="white">close</v-icon>
          </v-btn>
        </v-snackbar>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
     snackbar: {
        active: false
      }
    
  }),
   watch: {
    errorMessage (val) {
      if (val) {
        this.snackbar.active = true
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
    }
  }
};
</script>
