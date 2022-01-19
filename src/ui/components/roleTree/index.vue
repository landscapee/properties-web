<template lang="html">
	<el-dialog :close-on-click-modal="false" class="users-dialog" :title="title" center append-to-body :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
		<el-row>
			<el-col :span="12">
				<div>
					<el-card class="box-card" shadow="never" border-radius="2px">
						<div style="height:300px" v-loading="dataloading" >
							<Tree  :data="data" ref="tree" @handleSelect="getListById" :expand-on-click-node="false" :isShow="isShow" :checkedArrIdArr="['first']"   :defaultUnCheck="true"  > </Tree>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :span="12">
				<div>
					<el-card class="box-card" shadow="never" border-radius="2px">
						<el-scrollbar style="height:310px">
							<div v-show="personList.length == 0">该部门暂无人员</div>
							<div class="elinput" v-show="personList.length > 0" style="width:100%">
								<el-input class="input"  ref="input" placeholder="输入关键字进行搜索" @input="filterTextC" v-model="filterText"> </el-input>
							</div>
							<el-checkbox v-show="personList.length > 0" v-model="selectAll" @change="handleSelectAll">全选</el-checkbox>
							<div class="item" v-for="(item, index) in personList" :key="item.id">
								<div class="item-time">
									<el-checkbox v-model="userSelect" @change="userSelectC"   :label="item">{{item.name}}</el-checkbox>
								</div>
							</div>
						</el-scrollbar>
					</el-card>
				</div></el-col
			>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div>
					<el-card class="box-card" shadow="never" border-radius="2px">
						<div>已选择({{ userSelect.length }})：<el-button style="float:right" size="mini" @click="handleClear">清空</el-button></div>
						<el-scrollbar style="height:120px ">
							<el-tag :key="tag.id" v-for="(tag,index) in userSelect" closable :disable-transitions="false" @close="handleRemove(tag.id,index)">
								{{ tag.name }}
							</el-tag>
						</el-scrollbar>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24"></el-col>
		</el-row>
		<div class="Qfooter" style="margin-top: 15px">
			<el-button @click="handleClose">取消</el-button>
			<el-button type="primary" @click="handleSave">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import request from '@/utils/request'; // get token from cookie
    import Tree from '../Tree1/index';
    import { formatTreeData } from '@/common/tools.js';
    import { extend, get, cloneDeep, filter, some, flow, concat, map } from 'lodash';
    export default {
        name: 'Users',
        data() {
            return {
                dataloading:true,
                filterText:'',
                personNodeIdObj:{},
                userSelect:[],
                title: '',
                isShow: {input:true},
                first: true,
                selectAll: false,
                dialogVisible: false,
                personList: [],
                deptList: [],
                data: [],
                selectNode: {},
                type:"",
                OrgUser:[],
                OrgUserObj:{},
                orgObj:{
                    ORG:'orgId',
                    DEPT:'deptId',
                    GROUP:'groupId',
                }
            };
        },
        props:{
            dataRequire: {
                type: Boolean,
                default: false
            }
        },
        watch: {

        },


        methods: {
            filterTextC(val){
                if (!val){
                    this.personList= this.personNodeIdObj[this.selectNode.id]
                    return false
                }
                this.personList=[]
                this.personNodeIdObj[this.selectNode.id].map((k,l)=>{
                    k.name.indexOf(val) !== -1? this.personList.push(k):''
                })
            },
            isAllSelect(){
                let flag=true
                this.personList.map((k,l)=>{
                    const idx = this.userSelect.findIndex((d) => d.code === k.code);
                    if( idx==-1){
                        flag=false
                    }
                })
                return flag
            },
            userSelectC(){
                this.selectAll = this.isAllSelect();
            },
            handleClear() {
                this.userSelect = [];
                this.selectAll = false;

            },
            handleRemove(id,index) {
                this.userSelect.splice(index,1)
                this.selectAll = this.isAllSelect();
            },

            getAllUserByOrgId(node ){
                console.log(node);
                let hostname = window.location.hostname
                if (hostname.indexOf('localhost') >= 0) {
                    hostname = '173.100.1.152'
                }
                let sysId = '7ea6ea31e27a43aa8c644940746c8d16'
                let url = `http://${hostname}:8099/api/sys/role/findAllWithPage?pageNum=1&pageSize=1000`
                if(node.id!=='first__'){
                    url=url+`&sysId=${node.id}`
                }
                return request({
                    methods: 'get',
                    url,
                }).then((d) => {
                    console.log(d.data.list,'d.data');
                    if(this.first===true){
                        this.OrgUser=d.data.list||[]
                        this.first=1
                        let arr=[...this.userSelect]
                        this.userSelect=[]
                        this.OrgUser.map((k,l)=>{
                            const idx = arr.findIndex((op) => op.code === k.code);
                            if( idx>-1){
                                arr.splice(idx,1)
                                this.userSelect.push(k)
                            }
                        })
                    }else{
                        this.first=2
                    }

                    return Promise.resolve(d.data.list||[],null);

                });

            },
            dealData(d,arr,node){
                if(node.user&&node.user.length){
                    arr=node.user
                }else{
                    d.map((k,l)=>{
                        if( node['id']==k[this.orgObj[this.type]]){
                            arr.push(k)
                        }
                    })
                }


            },
            handleSelectAll(val) {
                this.personList.map((k,l)=>{
                    const idx = this.userSelect.findIndex((d) => d.code === k.code);
                    if(this.selectAll){
                        if( idx==-1){
                            this.userSelect.push(k)
                        }
                    }  else{
                        if( idx>-1){
                            this.userSelect.splice(idx,1)
                        }
                    }
                })
            },
            getListById(node) {
                this.filterText=''
                if (node && node.id) {
                    this.selectNode = node;
                    this.type = node.type;
                }
                if(this.personNodeIdObj[node.id]){
                    this.personList=this.personNodeIdObj[node.id]
                    return false
                }
                 this.getAllUserByOrgId(node).then((d) => {
                    let arr=d

                    if(this.first===2){  //非第一次
                        arr=d.map((k,l)=>{
                            let index=this.OrgUser.findIndex((k1)=>k1.code==k.code)
                            return this.OrgUser[index]
                        })
                    }
                    this.personNodeIdObj[node.id]=arr
                    this.personList =this.personNodeIdObj[node.id]
                    this.selectAll = this.isAllSelect();
                });
            },


            getTree() {
                let hostname = window.location.hostname
                if (hostname.indexOf('localhost') >= 0) {
                    hostname = '173.100.1.152'
                }
                let url = `http://${hostname}:8099/api/sys/role/getRolesTreeAll`
                request({
                    methods: 'get',
                    url,
                }).then((d) => {
                    this.dataloading=false

                    if(d.responseCode=='30008'||d.responseCode=='10000'){
                       this.$message.warning(d.responseMessage)
                        this.data=[]
                        return
                    }
                    d.data&& d.data[0]&& d.data[0].data&&(d.data[0].data.id='first__')
                    this.data=formatTreeData(d.data)
                }).catch(e=>{
                    this.dataloading=false
                })
            },

            findCurrentDept(dept, deptId) {
                if (dept.data.id == deptId) {
                    this.data = formatTreeData([dept]);
                    return;
                }
                if (dept.children && dept.children.length > 0) {
                    for (let i = 0; i < dept.children.length; i++) {
                        let child = dept.children[i];
                        this.findCurrentDept(dept.children[i], deptId);
                    }
                }
            },
            handleClose() {
                this.type='ORG'
                this.personList=[]
                this.data =[]
                this.OrgUser =[]
                this.first=true
                this.selectNode={}
                this.personNodeIdObj={}
                this.dialogVisible = false;
            },
            handleSave() {
                if(this.dataRequire && !this.userSelect.length){
                    this.$message({
                        message: '请选择需要推送的对象',
                        type: 'warning'
                    })
                    return
                }
                this.$emit('onSelected', this.userSelect,this.deptList);
                this.handleClose();
            },
            open(inputList, title, currentDept) {
                this.getTree(inputList||[]);
                this.selectAll = false;
                this.title = title || '选择角色';
                this.userSelect = inputList||[];
                this.dialogVisible = true;
            },
        },
        created(){
            // this.getTree()
        },
        components: {
            Tree,
        },
    };
</script>

<style scoped lang="scss">
	.users-dialog {
		.el-tag {
			margin: 5px;
		}
	}
	.el-scrollbar__wrap {
		overflow-x: hidden;
	}
	/deep/ .el-card__body {
		padding:  0px 10px!important;
		.item{
			margin: 20px 0;
		}
		.el-checkbox__label{
			padding-left: 15px;
		}
		.el-scrollbar__wrap{
			overflow-x: hidden;
		}

	}
	  .el-scrollbar{
		margin-top: 0px!important;

	}
	/deep/ .el-scrollbar{
		margin-top: 0px!important;

	}
	.el-card__body > div:first-child {
		padding: 0px;
		margin-top: 5px;
		line-height: 15px;
	}
	  .elinput {
		margin: 10px 0;
		height: 30px;
		// width: 100%;
	}
	  .el-input__inner {
		height: 30px;
		width: calc(100% - 1px);
	}
	/deep/ .elinput {
		margin: 10px 0;
		height: 30px;
		// width: 100%;
	}
	/deep/ .el-input__inner {
		height: 30px;
		width: calc(100% - 1px);
	}
    .Qfooter{
        text-align: center;
        /deep/ .el-button{
            padding: 8px 20px;
        }
    }
</style>
