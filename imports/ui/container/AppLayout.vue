<template>
    <div class="app-layout">
        <app-menu></app-menu>
        <v-container fluid="fluid">
            <form @submit.prevent="validateForm">
                <v-row row>
                    <v-col xs8 offset-xs2>
                        <h5>User Login</h5>
                        <v-text-field
                                v-model="form.email"
                                name="email"
                                label="Email"
                                hint="At least 8 characters"
                                append-icon="remove_red_eye"
                                :rules="rules.email"
                                v-validate="'required|email'"
                        ></v-text-field>

                    </v-col>
                    <v-col xs8 offset-xs2>
                        <v-text-field
                                v-model="form.password"
                                name="password"
                                label="Password"
                                type="password"
                                hint="At least 6 characters"
                                append-icon="remove_red_eye"
                                :rules="rules.password"
                                v-validate="'required|min:6'"
                        ></v-text-field>
                        <v-btn primary type="submit">Submit</v-btn>
                    </v-col>
                </v-row>
            </form>
        
        </v-container>
         <ul>
            <li v-for="table in tables">
                {{table.name}}
            </li>
         </ul>
    </div>
</template>


<script>
    import AppMenu from '/imports/ui/container/AppMenu.vue'
    import axios from 'axios';
    export default {
        components: {
            AppMenu
        },
        data(){
            return {
                users: [],
                user: null,
                tables: [],
                form: {
                    password: '',
                    email: '',
                },
                rules: {
                    password: [],
                    email: []
                }
            }
        },
        watch: {
            errors: {
                handler: function (val, oldVal) {
                    _.forEach(this.rules, (val, key) => {
                        this.rules[key] = [() => (this.errors.has(key) ? this.errors.first(key) : true)];
                    });
                },
                deep: true
            },
        },
        methods: {
            login(){
                axios.post('http://localhost:4000/methods/loginUser?', {email: this.form.email, password: this.form.password})
                    .then((response) => {
                       let user = response.data;
                       if(user.invalidUser) {
                           if(user.reason == 'invalidUser'){
                               this.rules.email = [() => user.msg];
                           }else{
                               this.rules.password = [() => user.msg];
                           }
                       }else{
                           console.log(user);
                       }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            validateForm() {
                this.$validator.validateAll()
                    .then(() => {
                        this.login();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        updated(){
            axios.post('http://localhost:4000/tables-api')
                .then((response) => {
                   this.tables = response.data.restaurant_tables
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
</script>