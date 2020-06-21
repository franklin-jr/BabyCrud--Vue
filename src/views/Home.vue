<template>
  <v-container fluid>
    <template v-if="authenticated">
      <v-navigation-drawer
        v-model="drawer"
        app
        fixed
        dark
      >

<!-- src= "http://www.jteixeira.com.br/wp-content/uploads/2017/06/fundo-escuro.jpg"  --> 


  <v-divider class="mb-5"></v-divider>

    <v-list>
      <v-list-group
        value="true"
        active-class="white--text"
      >   
        <template v-slot:activator>
          <v-list-item-title>
            
             <v-avatar class="mr-3">
              <img
                :src="require('@/assets/user.png')"
                alt="John"
              >
            </v-avatar>
            {{user.nome}}
           <!--  <div class="caption mt-2 mb-4 text-center white--text">{{user.email}}</div> -->
          </v-list-item-title>
        </template>

        <v-row class="justify-center ">

          <v-col class="text-center"  cols="4">
            <v-btn  @click="$store.dispatch('signOut')" text icon color="white">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-col>

          <v-col class="text-center" cols="4">
            <v-btn text icon color="white">
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-col>

          <v-col class="text-center" cols="4">
            <v-btn text icon color="white">
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </v-col>

        </v-row>
   
      </v-list-group>
    </v-list>
      
   <v-divider class="mb-5"></v-divider>
  
        <v-list rounded nav>
    
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.route"
          active-class="indigo darken-4 white--text"
          dense
        >


          <v-list-item-avatar>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>

          
      </v-navigation-drawer>

      <v-app-bar app class="elevation-0" fixed color="white">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
 

        <v-toolbar-title  class="capition font-weight-black text-center indigo--text ml-4">
            {{empresa.nomeFantasia}}
        </v-toolbar-title>
        
    
        <div class="flex-grow-1"></div>

  </v-app-bar>


    <v-content>
      <v-container
        fluid
        fill-height
        :class="['overflow-y-auto', {'pa-11': !this.$vuetify.breakpoint.xs }]"
        id="scroll-target"
        style="max-height: calc(100%)"
      >


          <v-fade-transition>
            <router-view></router-view>
          </v-fade-transition> 

      </v-container>


    </v-content>
    </template>


     <template v-else-if="!loading">
         <v-layout fill-height align-center justify-center column>
          <v-flex
            shrink
            class="title pb-11 grey--text text-center"
          >
          
           <v-icon size="100">mdi-alert-octagon</v-icon>
         <div> Ops! </div>
         <div class="body-2"> Parece que você não tem permissão para acessar esta página.</div>
          
          </v-flex>

      </v-layout>
    </template>


    <template v-else>
      <v-layout fill-height align-center justify-center column>
        <v-flex
          shrink
          class="headline pb-11 primary--text text-center"
        >Aguarde um pouco enquanto carregamos alguns dados</v-flex>
        <v-flex shrink>
          <v-progress-circular indeterminate color="primary" size="300"></v-progress-circular>
        </v-flex>
      </v-layout>
    </template> 

    
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      hoje: new Date(),
      drawer: true,
      items: [
        { title: 'Caixa', icon: 'mdi-arrow-collapse', route: '/home' },
        { title: 'Venda', icon: 'mdi-basket', route: '/venda' },
        { title: 'Recebimento', icon: 'mdi-square-inc-cash', route: '/recebimento' },
        { title: 'Clientes', icon: 'mdi-account-star', route: '/clientes' },
        { title: 'Produtos', icon: 'mdi-store', route: '/produtos' },
        { title: 'Funcionários', icon: 'mdi-account-multiple', route: '/funcionarios' },
        { title: 'Rotas', icon: 'mdi-bike-fast', route: '/rotas' },
       
      ],
       admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings'],
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],
    }
  },
  mounted () {

  },
  watch: {
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    },
    authenticated () {
      return !!this.user
    },
    empresa () {
     return this.$store.getters.empresaSelect
    }
  },
  methods: {
  }
}
</script>

<style  scoped>
.fundo{
  background: -moz-linear-gradient(45deg, rgba(21,64,151,1) 0%, rgba(0,0,0,1) 100%);
  background: -webkit-linear-gradient(45deg, rgba(21,64,151,1) 0%, rgba(0,0,0,1) 100%);
  background: -o-linear-gradient(45deg, rgba(21,64,151,1) 0%, rgba(0,0,0,1) 100%);
  background: -ms-linear-gradient(45deg, rgba(21,64,151,1) 0%, rgba(0,0,0,1) 100%);
  background: linear-gradient(45deg, rgba(21,64,151,1) 0%, rgba(0,0,0,1) 100%);
}
</style>
