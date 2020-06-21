<template>
    <v-content class="background align-top">
      <v-container  fill-height fluid>

                <v-btn class="mt-7 mb-3" fab color="red" x-small top right absolute @click="fechar()">
                    <v-icon color="white">mdi-close</v-icon>
                </v-btn> 
                
                <v-container class="mt-6">
                    <div class="titleFont">Registrando Baby</div>



                <v-stepper class="step" v-model="e1">

                    <v-stepper-items >
                        <v-stepper-content step="1">
                            <v-form ref="form1" v-model="valid" lazy-validation>
                                <div class="ml-2 subTitleFont">Nome:</div>
                                <v-text-field
                                    rounded
                                    dense
                                    solo
                                    v-model="user.nome"
                                    :rules="[rules.required]"
                                    required
                                    label="Nome">
                                    
                                </v-text-field>

                                <div class="ml-2 subTitleFont">Email:</div>
                                <v-text-field
                                    rounded
                                    dense
                                    solo
                                    v-model="user.email"
                                    :rules="[rules.required, rules.email]"
                                    required 
                                    label="email">
                                </v-text-field>

                                <div class="text-right">
                                    <v-btn
                                    @click="validate()"
                                    rounded
                                    small
                                    :disabled="!valid"
                                    color="primary"
                                    >Avançar</v-btn>
                                </div>
                            </v-form>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-form ref="form2" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12" sm="4">
                                        <div class="ml-2 subTitleFont">Cep:</div>
                                        <v-text-field
                                            rounded
                                            dense
                                            solo
                                            @keyup="getInfoCep"
                                            v-mask="'#####-###'"
                                            v-model="user.endereco.cep"
                                            :rules="[rules.required]"
                                            label="Cep">
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="8">
                                        <div class="ml-2 subTitleFont">Rua:</div>
                                        <v-text-field
                                            rounded
                                            dense
                                            solo
                                            v-model="user.endereco.rua"
                                            :rules="[rules.required]"
                                            label="Rua">
                                        </v-text-field>

                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <div class="ml-2 subTitleFont">Bairro:</div>
                                        <v-text-field
                                            rounded
                                            dense
                                            solo
                                            v-model="user.endereco.bairro"
                                            :rules="[rules.required]"
                                            label="Bairro">
                                        </v-text-field>

                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <div class="ml-2 subTitleFont">Cidade:</div>
                                        <v-text-field
                                            rounded
                                            dense
                                            solo
                                            v-model="user.endereco.cidade" 
                                            :rules="[rules.required]"
                                            label="Cidade">
                                        </v-text-field>
                                    </v-col> 
                                            
                                </v-row>
                                <v-row class="pa-3 justify-space-between">  
                                    <v-btn
                                    @click="voltar(1)"
                                    rounded
                                    small
                                    dark
                                    color="grey"
                                    >Voltar</v-btn>

                                    
                                    <v-btn
                                    @click="validate()"
                                    :disabled="!valid"
                                    rounded
                                    small
                                    color="primary"
                                    >Avançar</v-btn>
                                </v-row>
                            </v-form>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                             <v-form ref="form3" v-model="valid" lazy-validation>
                                <div class="ml-2 subTitleFont">Senha:</div>
                                <v-text-field
                                    rounded
                                    dense
                                    solo
                                    type="password"
                                    v-model="user.password" 
                                    :rules="[rules.required]"
                                    required
                                    label="Senha">
                                </v-text-field>

                                <div class="ml-2 subTitleFont">Repita a senha:</div>
                                <v-text-field
                                    rounded
                                    dense
                                    solo
                                    type="password"
                                    v-model="confPassword"
                                    :rules="[rules.required]"
                                    required
                                    label="Digite a senha novamente">
                                </v-text-field>

                               <v-row class="pa-3 justify-space-between">  
                                <v-btn
                                @click="e1=2"
                                rounded
                                small
                                dark
                                color="grey"
                                >Voltar</v-btn>

                                
                                <v-btn
                                    @click="saveUser"
                                    :loading="loadingbtn"
                                    :disabled="disablebtn"
                                    rounded
                                    small
                                    color="primary"
                                >
                                salvar
                                    <template v-slot:loader>
                                    <span class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                    </span>
                                    </template>
                                </v-btn>
                            </v-row>
                            </v-form>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>






        </v-container>

  </v-container>
</v-content>
</template>

<script>
import { cepDao } from '@/service'
export default {
  data() {
    return {
        loadingbtn: false,
        disablebtn: false,
        confPassword: '',
        user: {
            nome: '',
            email: '',
            password: '',
            endereco: {
                cep: '',
                rua: '',
                bairro: '',
                cidade: ''
            }
        },
        e1: 1,
        dialog: false,
        valid: true,
        rules: {
            required: value => !!value || 'Campo obrigatório!',
            min: v => v.length >= 8 || 'Mínimo de 6 caracteres',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'E-mail inválido'
            }
        }
    };
  },
  mounted() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    voltar(num) {
        this.valid = true
        this.e1 = num
    },
    validate () {
      
        switch(this.e1){
            case 1:
                if(this.$refs.form1.validate())
                    this.e1 = 2
                break
            case 2:
                if(this.$refs.form2.validate())
                    this.e1 = 3
                break
            default:
                break

        }
        
            
    },
    fechar () {
        this.$refs.form1.reset()
        this.$refs.form2.reset()
        this.$refs.form3.reset()
        this.e1 = 1
        this.$emit('fechar')   
    },
    getInfoCep () {
        if(this.user.endereco.cep != null && this.user.endereco.cep.length === 9)
            cepDao.getInfo(this.user.endereco.cep).then(response => {
            return response.json()
            }).then(json => {
                this.user.endereco.rua = json.logradouro
                this.user.endereco.bairro = json.bairro
                this.user.endereco.cidade = json.localidade
                this.user.endereco.estado = json.uf
                
            })
    },
    saveUser() {
        if(this.user.password === this.confPassword){
            if (this.$refs.form3.validate()) {
                console.log('====aki-----')
                this.loadingbtn = true
                this.disablebtn = true
                this.$store
                .dispatch('saveUser', this.user)
                .then(() => {
                    this.loadingbtn = false
                    this.disablebtn = false
                    //this.$store.dispatch('loadclientesG', 1)
                    this.fechar()
                })
                .catch(() => {
                    this.loadingbtn = false
                    this.disablebtn = false
                })
            }
        } else {
            this.$store.commit('setErrorMessage', {ativo: true, message: 'As senhas não conferem'})
        }
        
    }
  }
};
</script>

<style scoped>
/*====================Caso queira utilizar google fonts=====================*/
/* @import url('https://fonts.googleapis.com/css?family=Indie+Flower'); */

@font-face {
    font-family: Juice;
    src: url(../assets/fonts/Orange_Juice.ttf)
}

.background {
    background: -moz-linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(223,255,252,1) 47%, rgba(19,250,230,1) 100%);
    background: -webkit-linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(223,255,252,1) 47%, rgba(19,250,230,1) 100%);
    background: -o-linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(223,255,252,1) 47%, rgba(19,250,230,1) 100%);
    background: -ms-linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(223,255,252,1) 47%, rgba(19,250,230,1) 100%);
    background: linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(223,255,252,1) 47%, rgba(19,250,230,1) 100%);
}

.titleFont {
    font-family: 'Juice', sans-serif;
    color: #5188e2;
    font-size: 40px;
}

.subTitleFont {
    
    color:#5188e2;
    font-size: 12px;
}

.step{
    border: 0;
    background-color: transparent;
}

  
.slide-fade-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.5, 1);
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateX(30px);
  opacity: 0;
}


.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>