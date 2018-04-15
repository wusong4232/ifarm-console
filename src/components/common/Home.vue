<template>
    <div class="wrapper" v-if="alertInfo">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <header-tab></header-tab>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
    <v-alert v-else></v-alert>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import headerTab from './headerTab.vue';
    import vAlert from "./alert.vue";
    export default {
        components:{
            vHead, vSidebar,headerTab,vAlert
        },
        computed:{
            alertInfo:function () {
                return Boolean(this.$cookie.get("userName"))||false;
            }
        }
    }
</script>
