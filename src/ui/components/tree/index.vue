<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-03-31 14:08:41
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-07-20 17:07:25
-->
<template>
	<div id="tree">
		<!-- <div class="elinput" v-if="isShow.input">
			<el-input maxlength="50" class="input" prefix-icon="el-icon-search"  ref="input" placeholder="输入关键字进行搜索" v-model="filterText"> </el-input>
		</div> -->
		<el-tree
            :data="treeData"
            ref="tree"
            node-key="id"
            :highlight-current="highlightCurrent"
            default-expand-all
            @node-drop="handleDrop"
            :expand-on-click-node='false'
            :props="defaultProps"
            :draggable='config.draggable'
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @current-change="handleSelectChange"
            >
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="label ellipsisLineOne" :title="node.label">{{ `${node.label}` }}</span>
                <el-popover
                        placement="bottom"
                        width="70"
                        popper-class='layerManage_popover'
                        trigger="hover"
                        v-if="config.operation"
                        >
                        <div class="popover_content" style="text-align: center; margin: 0">
                            <div class="popover_opera edit" @click='handleClickAddClass(data)'><icon-svg icon-class="edit_icon" style="color:#00dcff;margin-right:10px"></icon-svg>新增</div>
                            <!-- <div class="popover_opera edit"  @click='handleClickEditClass(data)'><icon-svg icon-class="edit_icon" style="color:#00dcff;margin-right:10px"></icon-svg>编辑</div> -->
                            <div class="popover_opera delate" @click='handleClickDelateClass(data)'><icon-svg icon-class="delate_icon" style="color:#00dcff;margin-right:10px"></icon-svg>删除</div>
                        </div>
                        <span slot="reference" class="operation_icon">
                            <p class="point" style="margin-bottom: 4px;"></p>
                            <p class="point" ></p>
                        </span>
                    </el-popover>
			        </span>
      </el-tree>
		<!--弹窗 -->
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
 props:['treeData','config'],
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
   handleClickAddClass(data){
     this.$emit('getCurrentNode',data,'add');
   },
   handleClickEditClass(data){
     this.$emit('getCurrentNode',data,'edit')
   },
   handleClickDelateClass(data){
     this.$emit('getCurrentNode',data,'delete')
   },
   handleSelectChange(data, node){
     this.$emit('handleSelect', data);
   },
    handleDrop(draggingNode, dropNode, dropType, ev) {
        this.$emit('moveCategories',draggingNode,dropNode,dropType)
        //console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        //  if(draggingNode.level===2&&dropNode.level===1){
        //    return true
        //  }
        //   if(draggingNode.level===2&&dropNode.level===2){
        //    return false
        //  }
        //   if(draggingNode.level===1&&dropNode.level===1&&draggingNode.childNodes.length===0){
        //    return true
        //  }
        //  return false;
        return true;
      },
      allowDrag(draggingNode) {
        return true;
      }
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
    // .operation{
    //     display: inline-block;
    //     width: 80px;
    // }
}
#tree{
    /deep/.el-tree>div{
        border: 1px solid #c7ccd2;
        border-radius: 6px;
        margin-bottom: 10px;
        
        
      }
      /deep/.el-tree>div>div:last-child{
        border-bottom:none
      }
      /deep/.el-tree>div>div>div:last-child{
        border-bottom:none
      }
      /deep/.el-tree-node__content{
          height: 50px;
      }
      /deep/.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
        background: #E1EBFC;
      }
      // /deep/.expanded{
      //   color: #3876E6;
      //   font-size: 16px;
      // }
      /deep/.el-tree-node__expand-icon{
          color: #3876E6;
        font-size: 16px;
      }
      /deep/.is-leaf.el-tree-node__expand-icon{
        color: transparent;
        cursor: default;
      }
}

.popover_content{
    .popover_opera{
        cursor: pointer;
    }
    .popover_opera:hover{
        color:  #3187ee;
        background: #E1EBFC;
    }
    .edit{
        margin-bottom: 10px;
    }
}
.operation_icon{
    cursor: pointer;
    width: 12px;
    height: 100%;
  
    text-align: center;
    display: flex !important;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content:center;
    .point{
        width:4px;
        height:4px;
        background: #c7ccd2;
        border-radius: 50%;
       
    }
}
</style>