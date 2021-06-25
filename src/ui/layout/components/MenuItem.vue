<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-30 10:28:18
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-03-30 11:07:36
-->
<template>
   <div>
		<!-- <template v-if="hasOneShowingChild(item)">
            <el-menu-item>
                <icon-svg :icon-class="item.meta.icon" style="color:#00dcff"></icon-svg>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
		</template> -->
		<!-- <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
			<template slot="title">
				
			</template>
			<MenuItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu"></MenuItem>
		</el-submenu> -->
	</div>
</template>

<script>
import mapGetters from 'vuex'
export default {
    name:'MenuItem',
    props: ['item'],
    // computed:{
    //     ...mapGetters(['headerNavActive','permission_routes'])
    // },
    mounted(){
        console.log(this.item)
    },
    methods:{
        hasOneShowingChild(item){
            console.log(item);
            return true;
        }
    }
}
</script>

<style scoped lang='scss'>

</style>