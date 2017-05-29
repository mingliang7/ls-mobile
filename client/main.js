import {ReactiveVar} from 'meteor/reactive-var';
import {Vue} from 'meteor/akryum:vue';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify/dist/vuetify.min.js';
import AppLayout from '/imports/ui/container/AppLayout.vue';
Vue.use(Vuetify);
Meteor.startup(function () {
    new Vue({
        render: h => h(AppLayout),
        components: AppLayout
    }).$mount('app');
});
