<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-29 10:23:11
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-19 16:21:16
-->
<template>
    <div class="app">
        <ToolBar :routerName='routerName'></ToolBar>
        <div class="main_container">
            <router-view/>
        </div>

    </div>
</template>
<script>
    import ToolBar from '@/components/toolBar';
    import requestApi from '@/api/index.js';

    export default {
        components: {ToolBar},
        data() {
            return {
                routerName: '',
                checked: '',
            }
        },
        mounted() {
            this.getParameterInfoFn()
        },
        watch: {
            $route: {
                handler() {
                    this.getParameterInfoFn()
                },
                deep: true,
            }
        },
        methods: {
            async getParameterInfoFn() {
                let res = await requestApi.parameterManage.getParameterInfo({
                    method: 'postquery',
                    repeat: true,
                    params: {id: this.$route.query.id}
                });
                if (res && res.name) {
                    this.routerName = res.name + " [" + res.code + "]"
                }
            },
            toLoginPage() {
                this.$router.push('/')
            },
            toHomePage() {
                this.$router.push('/index')
            }
        },
    }
</script>
<style lang="scss">
    @import './styles/App.scss';
</style>
<style lang="scss" scoped>
    .app {
        height: 100%;
        background: #f5f5f5;
        width: 100%;

        .main_container {
            height: calc(100% - 55px);
            width: calc(100% - 30px);
            position: relative;
            overflow: auto;
            padding: 15px;
            margin: 0 15px 15px 15px;
            opacity: 1;
            background: #ffffff;
            border-radius: 8px;
        }
    }
</style>