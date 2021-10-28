<template>
	<div class="fTableWrapper searchTableWrapper" ref="fTableWrapper" :style="{height:fTableWrapperHeight}">
		<el-table :data="data instanceof Array ? data : data.records||[]" ref="table" class="mainTable" :height="tableHeight"  :row-key="getRowKeys" @setCurrentRow="setCurrentRow" @current-change="currentRowChange" highlight-current-row @row-click="checkRow" @selection-change="handleSelectionChange" @select="selectCheckBox" @select-all="selectAllCheckBox" :header-row-class-name="tableheaderRowClassName" tooltip-effect="dark" :row-class-name="tableRowClassName">
			<template v-for="(colConfig, index1) in tableConfig">
				<el-table-column v-if="colConfig.components" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '1'">
					<template slot-scope="scope">
						<component v-for="(component, index) in colConfig.components" :key="index" :is="component.component" :componentProps="component.componentProps" v-bind="component.componentProps" :handleClick="component.handleClick" :colConfig="colConfig" :row="scope.row" :tableData="data instanceof Array ? data : data.records"> </component>
					</template>
				</el-table-column>
				<el-table-column v-else-if="colConfig.component" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '2'">
					<template slot-scope="scope" v-if="colConfig.component">
						<component :is="colConfig.component" :componentProps="colConfig.componentProps" v-bind="colConfig.componentProps" :handleClick="colConfig.handleClick" :colConfig="colConfig" :row="scope.row" :tableData="data instanceof Array ? data : data.records"> </component>
					</template>
				</el-table-column>
				<slot v-else-if="colConfig.slot" :name="colConfig.slot"></slot>
				<el-table-column type="index" v-else-if="colConfig.type==='index'" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '3'">
				</el-table-column>
				<el-table-column v-else-if="colConfig.type==='selection'" :reserve-selection="true" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '4'">
				</el-table-column>
				<el-table-column v-else :show-overflow-tooltip="true"  v-bind="colConfig" :key="index1 + '5'" :reserve-selection="true">
					<span v-if="colConfig.formatter" slot-scope="{ row }"> {{colConfig.formatter(row,colConfig.prop,row[colConfig.prop])}}</span>
					<span  v-else-if="colConfig.buttons" slot-scope="{ row }"  >
                        <template v-for="btnItem in colConfig.buttons">
                            <el-button @click="eventEmit(colConfig,row[colConfig.prop],btnItem.event)" size="mini"  >{{btnItem.name}}</el-button>
                        </template>
                    </span>
					<span v-else-if="colConfig.prop.split('.').length===3" slot-scope="{ row }">{{row[colConfig.prop.split('.')[0]][colConfig.prop.split('.')[1]][colConfig.prop.split('.')[2]]?row[colConfig.prop.split('.')[0]][colConfig.prop.split('.')[1]][colConfig.prop.split('.')[2]]:"--"}}</span>
					<span v-else-if="colConfig.prop.split('.').length===2"  slot-scope="{ row }"> {{row[colConfig.prop.split('.')[0]][colConfig.prop.split('.')[1]]?row[colConfig.prop.split('.')[0]][colConfig.prop.split('.')[1]]:'--'}}</span>
					<span v-else-if="colConfig.prop.split('.').length===1" slot-scope='{row}'>{{row[colConfig.prop]?row[colConfig.prop]:'--'}}</span>
				</el-table-column>
			</template>
		</el-table>
		<!--总条数大于21调才显示翻页-->
		<el-pagination background v-if="hideOnSinglePage"  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.current" :page-sizes="[data.size]" :page-size="data.size" layout="total,prev, pager, next, jumper" :total="data.total"> </el-pagination>
	</div>
</template>
<script>
import { cloneDeep } from 'lodash';
export default {
	name: 'Ftable',
	props: ['tableConfig', 'data', 'height', 'offsetTop', 'page'],
	data() {
		return {
			tableHeight: 50,
			fTableWrapperHeight:'0px',
			hideOnSinglePage:false,
		};
	},
	watch: {
		data: function(newVal, oldVal) {
			// if (newVal.records.length != 0) {
			// 重新计算element表格组件布局
			setTimeout(() => {
				this.$refs.table.doLayout();
			}, 100);

			// }
		},
	},
	created() {

	},
	computed:{
		computeFtableHeight:function(){
			this.$nextTick(()=>{
				let parentHeight=this.$refs.fTableWrapper.parentNode.offsetHeight;
				return parentHeight-this.offsetTop
			})
			//计算fTableWrapper父元素的高度
			
		},
	},
	methods: {
		// 确定唯一的key值
		getRowKeys(row) {
			return row.id; // 每条数据的唯一识别值
		},
		handleSizeChange(size) {
			this.size = size;
			this.$emit('handleSizeChange', size);
		},
		handleCurrentChange(cur) {
			this.$emit('handleCurrentChange', cur);
		},
		tableheaderRowClassName({ row, rowIndex }) {
			return 'tab-header-row';
		},
		tableRowClassName({ row, rowIndex }) {
			row.index = rowIndex;
			return 'tab-row';
		},
		currentRowChange(row, oldRow) {
			this.$emit('currentRowChange', row, oldRow);
		},
		selectCheckBox(select, row) {
			this.$emit('selectCheckBox', cloneDeep(select), cloneDeep(row));
		},
		selectAllCheckBox(select) {
			this.$emit('selectAllCheckBox', cloneDeep(select));
		},
		checkRow(d, column, event) {
			this.selectData = d;
			this.$emit('listenToCheckedChange', cloneDeep(d), cloneDeep(column), cloneDeep(event));
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.$emit('listenToSelectionChange', val);
		},
		setCurrentRow(row) {
			this.$emit('setCurrentRow', cloneDeep(val));
		},
		getHeight(){
			let parentHeight=this.$refs.fTableWrapper.parentNode.offsetHeight;
			if(this.offsetTop===0||this.offsetTop){
				if(this.data.total&&this.data.size){ //总数和分页数有数据
					if(this.data.total/this.data.size>1){ //总页数大于1
					this.hideOnSinglePage=true;
						//有翻页在减48px
						this.tableHeight=(parentHeight-this.offsetTop-48)+'px';
						this.fTableWrapperHeight=parentHeight-this.offsetTop+'px';
					}else{
						this.hideOnSinglePage=false;
						this.fTableWrapperHeight=(parentHeight-this.offsetTop)+'px';
						this.tableHeight=this.fTableWrapperHeight;
					}
				}else{
					this.hideOnSinglePage=false;
					this.fTableWrapperHeight=(parentHeight-this.offsetTop)+'px';
					this.tableHeight=this.fTableWrapperHeight;
				}
			}else{
				this.hideOnSinglePage=false;
				this.fTableWrapperHeight='200px';
				this.tableHeight=this.fTableWrapperHeight;
			}
			// if(this.offsetTop===0||this.offsetTop){
			// 	if(this.data.total>20){
			// 	//有翻页在减48px
			// 	this.tableHeight=(parentHeight-this.offsetTop-48)+'px';
			// 	this.fTableWrapperHeight=parentHeight-this.offsetTop+'px';
			// }else{
			// 	this.fTableWrapperHeight=(parentHeight-this.offsetTop)+'px';
			// 	this.tableHeight=this.fTableWrapperHeight;
			// }
			// }else{
			// 	this.fTableWrapperHeight='200px';
			// 	this.tableHeight=this.fTableWrapperHeight;
			// }
			
		},
		resize() {
	
		},
        eventEmit(colConfig,value,btnEvent){
            this.$emit(colConfig.event, {type:colConfig.type,code:colConfig.prop,value,event:btnEvent})
        }
	},
	mounted() {
		this.$nextTick(function() {
			let height = 0;
			if (this.page && this.page === 'roles') {
				height = 100;
			}
			// 监听窗口大小变化
			// let self = this;
			//this.resizeCallback.push(this.resize);
			//let parentHeight=this.$refs.fTableWrapper.parentNode.offsetHeight;
			this.getHeight();
		});
	},
	updated(){
		this.$nextTick(()=>{
			this.getHeight();
		})
	},
	beforeDestroy() {
		//this.resizeCallback.pop();
	},
};
</script>

<style lang="scss" scoped>
</style>
