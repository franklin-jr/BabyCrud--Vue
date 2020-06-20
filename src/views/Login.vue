<template>
  <v-app >
    <v-content>
      <v-container
        class="fill-height fundoLogin"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card style="border-radius: 30px;" class="elevation-12 card">
              <div style="height: 30px"></div>

                <v-img
                  :src="require('@/assets/logo_login.png')"
                  width="250"
                  class="mx-auto"
                ></v-img>

              <v-card-text>

                <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  prepend-inner-icon="person" 
                  rounded
                  dense
                  outlined
                  v-model="email" 
                  :rules="[rules.required, rules.email]" 
                  label="E-mail">
                </v-text-field>

                <v-text-field
                  v-on:keyup.enter="signUser"
                  v-model="password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  outlined
                  dense
                  rounded
                  :rules="[rules.required]"
                  :type="show1 ? 'text' : 'password'"
                  label="Senha"
                  prepend-inner-icon="lock"
                  @click:append="show1 = !show1"
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  :loading="loading"
                  class="mt-4"
                  @click="signUser"
                  rounded
                  block
                  color="primary"
                >Entrar</v-btn>



                Não tem cadastro?

              </v-form>

              <!--  <div
                  class="caption text-center mt-4 white--text"
                >Copyright © {{getCurrentYear()}} Excalibur System. All rights reserved</div> -->

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  
  data: () => ({
    show1: false,
    valid: true,
    password: '',
    email: '',
    rules: {
      required: value => !!value || 'Campo obrigatório!',
      min: v => v.length >= 8 || 'Mínimo de 6 caracteres',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail inválido'
      }
    }
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    signUser () {
      //this.$router.push('/home')
       if (this.$refs.form.validate()) {
        this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password
        })
      }
    },
  }
}
</script>

<style scopped>
.logo {
  width: 50%;
  margin: auto;
}

.fundoLogin{
    height: 100%;
    width: 100%;
    background-image: url(../assets/fundo_login.png);
    background-size: cover;
    position: absolute;
}


</style>