<template>
    <!-- <div class='vLogin'>
        <h1>로그인</h1>
        <div>
            <h3>ID : </h3>
            <input type="text" v-model="inputId">
            <h3>PW : </h3>
            <input type="text" v-model="inputPw">
            <button @click="reqLogin" color="success">로그인</button>

        </div>
    </div> -->

    <v-card class="mx-auto" elevation="1" max-width="500">
        <!-- <v-card-title class="py-5 font-weight-black">로그인</v-card-title> -->

        <v-card-text>
            
            <v-text-field v-model="inputId" label="ID" type="text" variant="outlined" clearable ></v-text-field>

            <v-text-field v-model="inputPw" label="PW" type="password" variant="outlined" clearable></v-text-field>
                                    
            <v-btn :disabled="reqLoginFlag" :loading="reqLoginFlag" class="text-none mb-4" color="indigo-darken-3"
                size="x-large" variant="flat" block @click="reqLogin">로그인</v-btn>

            <v-btn class="text-none" color="grey-lighten-3" size="x-large" variant="flat" block>
                회원가입
            </v-btn>
        </v-card-text>
    </v-card>


</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'vLogin',

    setup() {

    },
    data() {
        return {
            inputId: null,
            inputPw: null,

            reqLoginFlag: false,
        }
    },
    methods: {

        ...mapActions(["login"]),

        reqLogin() {
            
            this.reqLoginFlag = true;
            
            this.login({ inputId: this.inputId, inputPw: this.inputPw })
            .then(res=>{
                console.log(`login success : ${res}`);                               
            })
            .catch(error =>{
                console.log(`login fail : ${error}`);               
            })
            .finally(()=>{
                this.reqLoginFlag = false;
            }); 

        },
    },
    created() {

    },
}

</script>

<style scoped></style>
