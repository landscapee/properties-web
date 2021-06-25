<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-31 14:08:41
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-09 17:03:05
-->
<template>
	<div id="tree">
		<el-tree
            :data="treeData"
            ref="tree"
            node-key="id"
            :highlight-current="highlightCurrent"
            default-expand-all
            :expand-on-click-node='false'
            :props="defaultProps"
            @current-change="handleSelectChange"
            >
      </el-tree>
	</div>
</template>

<script>
export default {
 name:"Tree",
 data(){
     return {
      highlightCurrent:true,
      visible:false,
      defaultProps: {
          children: 'children',
          label: 'name'
        }
    }
 },
 props:['treeData'],
 watch:{
   treeData(val) {
        if (val && val.length) {
            this.$nextTick(() => {
                if (!val || !val.length || !val[0].id) {
                    return;
                }
                if (this.selectedId) {
                    this.$refs.tree.setCurrentKey(this.selectedId);
                }
                if (!this.selectedId || !this.$refs.tree.getCurrentNode()) {
                    this.$refs.tree.setCurrentKey(val[0].id);
                    this.selectedId = val[0].id;
                }
                this.$emit('handleSelect', this.$refs.tree.getCurrentNode());
            });
        }
    },
 },
 methods:{
   handleSelectChange(data, node){
     this.$emit('handleSelect', data);
   },
 }

};
</script>

<style lang="scss" scoped>
.custom-tree-node{
    width: calc(100% - 28px);
    display: flex;
    justify-content: space-around;
    .label{
        vertical-align: middle;
        display: inline-block;
        width: calc(100% - 35px);
        color: #333333;
        font-size: 16px;
    }
}
</style>