<template>
	<div class="fTableWrapper searchTableWrapper" ref="fTableWrapper" :style="{height:fTableWrapperHeight}">
		<el-table :data="data instanceof Array ? cloneData : data.records||[]" ref="table" class="mainTable" :height="tableHeight"  :row-key="getRowKeys" @setCurrentRow="setCurrentRow" @current-change="currentRowChange" highlight-current-row @row-click="checkRow" @selection-change="handleSelectionChange" @select="selectCheckBox" @select-all="selectAllCheckBox" :header-row-class-name="tableheaderRowClassName" tooltip-effect="dark" :row-class-name="tableRowClassName">
			<template v-for="(colConfig, index1) in tableConfig">
				<el-table-column v-if="colConfig.components" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '1'">
					<template slot-scope="scope">
						<component v-for="(component, index) in colConfig.components" :key="index" :is="component.component" :componentProps="component.componentProps" v-bind="component.componentProps" :handleClick="component.handleClick" :colConfig="colConfig" :row="scope.row" :tableData="data instanceof Array ? cloneData : data.records"> </component>
					</template>
				</el-table-column>
				<el-table-column v-else-if="colConfig.component" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '2'">
					<template slot-scope="scope" v-if="colConfig.component">
						<component :is="colConfig.component" :componentProps="colConfig.componentProps" v-bind="colConfig.componentProps" :handleClick="colConfig.handleClick" :colConfig="colConfig" :row="scope.row" :tableData="data instanceof Array ? cloneData : data.records"> </component>
					</template>
				</el-table-column>
				<slot v-else-if="colConfig.slot" :name="colConfig.slot"></slot>
				<el-table-column type="index" v-else-if="colConfig.type==='index'" :show-overflow-tooltip="true" v-bind="colConfig" width="50px" :key="index1 + '3'">
                    <template slot-scope="{row,$index}">
                        {{showinput?row._showinput_?'': $index:$index+1 }}
                    </template>

				</el-table-column>
				<el-table-column v-else-if="colConfig.type==='selection'" :reserve-selection="true" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '4'">
				</el-table-column>
				<el-table-column v-else :show-overflow-tooltip="true"  v-bind="colConfig" :key="index1 + '5'" :reserve-selection="true">
				    <template slot-scope="{row,$index}">

                        <span class="spaninput" v-if="row._showinput_&&$index===0"  >
                            <el-input @change="searchData('input',row,colConfig.type)"  v-if="colConfig.type=='text'||!colConfig.type||colConfig.type=='bool'"     v-model="rowObj[colConfig.prop]" clearable></el-input>
                         </span>
                        <span  v-else-if="colConfig.type=='bool'"    >

                                {{getBooleanText(row[colConfig.prop])}}

                        </span>
                        <span v-else-if="colConfig.formatter"  > {{colConfig.formatter(row,colConfig.prop,row[colConfig.prop])}}</span>
                        <span  v-else-if="colConfig.buttons"    >
                            <template v-for="btnItem in colConfig.buttons">
                                <el-button @click="eventEmit(colConfig,row[colConfig.prop],btnItem.event,$index,row)" size="mini"  >{{btnItem.name}}</el-button>
                            </template>
                        </span>

                        <span v-else-if="colConfig.prop.split('.').length===3"  >{{row[colConfig.prop.split('.')[0]][colConfig.prop.split('.')[1]][colConfig.prop.split('.')[2]]?row[colConfig.prop.split('.')[0]][colConfig.prop.split('.')[1]][colConfig.prop.split('.')[2]]:"--"}}</span>
                        <span v-else-if="colConfig.prop.split('.').length===2"   > {{row[colConfig.prop.split('.')[0]][colConfig.prop.split('.')[1]]?row[colConfig.prop.split('.')[0]][colConfig.prop.split('.')[1]]:'--'}}</span>
                        <span v-else-if="colConfig.prop.split('.').length===1"  >{{row[colConfig.prop]?row[colConfig.prop]:'--'}}</span>

                    </template>
                </el-table-column>
			</template>
		</el-table>
		<!--总条数大于21调才显示翻页-->
		<el-pagination background v-if="hideOnSinglePage"  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.current" :page-sizes="[data.size]" :page-size="data.size" layout="total,prev, pager, next, jumper" :total="data.total"> </el-pagination>
	</div>
</template>
<script>
import { cloneDeep ,map} from 'lodash';
export default {
	name: 'Ftable',
	props: ['tableConfig', 'data', 'height', 'offsetTop', 'page'],
	data() {
		return {
            rowObj:{},
            propArr:[],
            cloneData:[],
            searchObj:{},
			tableHeight: 50,
			fTableWrapperHeight:'0px',
			hideOnSinglePage:false,
            showinput:false
		};
	},
	watch: {
		data: function(newVal, oldVal) {
            this.showinput=false
            this.rowObj={}
            if(this.dataType){
                this.cloneData=[...this.data]
            }else{
                // this.cloneData=this.data
                setTimeout(() => {
                    this.$refs.table.doLayout();
                }, 100);
            }
		},
        cloneData: function(newVal, oldVal) {
            setTimeout(() => {
                this.$refs.table.doLayout();
            }, 100);
        },

	},
	created() {
	},

	computed:{
        getBooleanText(){
            return (val)=>{
                let obj={true:'真',false:'假'}
                return obj[val]||''
            }
        },
        dataType(){
          return Array.isArray(this.data)
        },
        getForData(){
            if(this.showinput){
                let arr=[...this.cloneData]
                arr.shift()
                return arr
            }
            return this.cloneData
        },
        getCloneData(){
            return (arr)=>{
                console.log(this.cloneData.slice(0, 1));
                this.showinput? arr.unshift({_showinput_:true}):''
                return arr
            }
        },
		computeFtableHeight:function(){
			this.$nextTick(()=>{
				let parentHeight=this.$refs.fTableWrapper.parentNode.offsetHeight;
				return parentHeight-this.offsetTop
			})
			//计算fTableWrapper父元素的高度
			
		},
	},
	methods: {

        showForm(){
             if(!this.dataType){
                this.$message.info('暂不支持 分页 搜索')
                return
            }
            this.showinput=!this.showinput
            this.showinput?this.cloneData.unshift({_showinput_:true})
                :this.cloneData.shift()

        },
        searchData(type,data,configType){
            if(!this.dataType){
                this.$message.info('暂不支持 分页 搜索')
                return
            }
            console.log(type, data);

            if(type=='fuzzy'){
                //参数定义 高级搜索
                this.filterAllFuzzy(data,configType)
            }else if(type=='input'){
                // 列表列搜索
               this.fileterProp(configType)
            } else{
                //参数定义 高级搜索  数据不一样 单独处理
                this.otherSearch(data,configType)
            }
        },
        filterAllFuzzy(value,type){
            if(!value){
                this.cloneData=this.getCloneData([...this.data])
                return
            }
            let obj={'false':'假','true':"真"}
            let arr=[]
            map(this.data,(k)=>{
               let blo= this.propArr.some((k1)=>{
                   let s=k[k1.prop]
                    if(k1.type=='bool'){
                       s=obj[s]||''
                   }
                    return s&&s.includes(value)
                })
                blo&&arr.push(k)
            })
            this.cloneData=this.getCloneData(arr)
        },
        fileterProp(type){
            let arr=[]
            let obj={'false':'假','true':"真"}
             map(this.data,(k)=>{
                let blo=true
                map(this.rowObj,(value,key)=>{
                    let s=k[key]
                    if(!value){
                        return
                    }
                    if(type=='bool'){
                        s=obj[s]||''
                    }
                    if(!s||(s&&!s.includes(value))){
                       blo=false
                   }
                })
                blo&&arr.push(k)
            })
            this.cloneData=this.getCloneData(arr)
        },
        otherSearch(value){
             if(!value){
                this.cloneData=this.getCloneData([...this.data])
                return
            }
            let arr=[]
            let obj={'false':'假','true':"真"}

            map(this.data,(k)=>{
                 let blo= this.tableConfig.some((kc)=>{
                     if(kc.prop){
                         if(kc.filterList__){
                             //列表 字段展示 经过转换的
                            let code=k[kc.prop]
                            let val=''
                            kc.filterList__().filter(k=>{
                                k.code==code?(val=k.name):''
                                return k.code==code
                            })
                             // console.log(1,val);
                             return val.includes(value)
                        }
                         // console.log(k[kc.prop]);
                         return k[kc.prop]&&k[kc.prop].includes(value)
                    }
                    return false
                })
                blo&&arr.push(k)
            })
            this.cloneData=this.getCloneData(arr)
        },
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
        eventEmit(colConfig,value,btnEvent,index,row){
            console.log(row);
            this.$emit(colConfig.event, {
                type:colConfig.type,code:colConfig.prop,value,event:btnEvent,index,row,
                contrastLayer:colConfig.contrastLayer,contrastLayerAtr:colConfig.contrastLayerAtr,
            })
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
            map(this.tableConfig,(k)=>{
                (k.type=='text'||k.type=='bool')&& this.propArr.push(k)
            })
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
/deep/ .cell{
    height: 50px!important;
    line-height: 50px;
}
.spaninput{
    display: inline-block;
    height: 30px;
     width: 100%;
    .el-input{
        width: 100%;
        height: 30px;
    }
}

  /deep/ td,
  /deep/ th {
      padding: 0px 0!important;
    border-left: 1px solid #c7ccd2;
}
/deep/ th {
    border-top: 1px solid #c7ccd2;
}
/deep/ .tab-header-row{
    th{
        background: #57636F;

    }
    .cell{
        color: #fff;
    }
}

 /deep/ tr{
    th:last-child,
    td:last-child {
        border-right: 1px solid #c7ccd2;
    }
}


</style>
