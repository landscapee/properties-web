<template>
	<div id="tree" v-if="data && data.length">
		<!-- <div id="title" v-text="isShow.text"></div> -->
		<div class="elinput" v-if="isShow.input">
			<el-input class="input" ref="input" placeholder="输入关键字进行搜索" v-model="filterText"> </el-input>
		</div>
		<div style="height:calc(100% - 50px)">
			<el-scrollbar style="height:100%">
 				<el-tree :accordion="accordion ? true : false" :default-expand-all="defaultExpandAll ? false : true" :show-checkbox="showCheckbox" :default-checked-keys="checkedArrIdArr" :expand-on-click-node="expandOnClickNode || false" :highlight-current="highlightCurrent" node-key="id" :class="['filter-tree', isShow.heightClass]" :data="data" @node-click="getCurrentNode" @current-change="handleSelectChange" :props="defaultProps" :filter-node-method="filterNode" @check="handleCheck" ref="tree">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span><i :class="icon(data)"></i>{{ `${node.label}${extendInfo(data)}` }}</span>
				<span v-if="isShow.tip">
					<el-button type="text" size="mini" @click="() => handleClickBtn('add', node, data)">
						新增
					</el-button>
					<el-button type="text" size="mini" @click="() => handleClickBtn('edit', node, data)">
						编辑
					</el-button>
					<el-button type="text" v-if="(!data.children || !data.children.length) && !data.number && data.type != 'ORG'" size="mini" @click="() => handleClickBtn('remove', node, data)">
						删除
					</el-button>
				</span>
			</span>
				</el-tree>
			</el-scrollbar>
		</div>

		<!--弹窗 -->
	</div>
</template>

<script>

export default {
	data() {
		return {
			isFirst: false,
			text: 'cheliang ',
			dataMsg: '',
			selectedId: null,
			highlightCurrent: true,
			filterText: '',
			defaultProps: {
				children: 'children',
				label: 'name',
			},
		};
	},
	props: ['data', 'isShow','checkedArrIdArr', 'defaultUnCheck', 'showCheckbox', 'defaultExpandAll', 'expandOnClickNode', 'accordion','loading'],
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		},
		data(val) {
			if (val && val.length) {
				this.$nextTick(() => {
					if (!val || !val.length || !val[0].id) {
						return;
					}
                    this.$refs.tree.setCurrentKey(val[0].id);
                    this.selectedId = val[0].id;
					this.$emit('handleSelect', this.$refs.tree.getCurrentNode());
				});
			}
		},
	},

	methods: {
        setCheckedKeys(arr) {
            this.$refs.tree.setCheckedKeys(arr||[]);
        },
				// 当复选框被选中的时候执行
		handleCheck(data, checks) {
			// checks中的数据为选中节点的keys
			this.$emit('handleCheck', data, checks);
		},
		extendInfo(data) {
			if (this.isShow.number) {
				return `(${data.number ? data.number : 0})`;
			} else {
				return '';
			}
		},
		handleClickBtn(type, node, data) {
			this.$emit('handleClickBtn', {
				type,
				node,
				data,
			});
		},
		icon: function(data) {
			if (data.type == 'SYS') {
				return 'el-icon-receiving';
			}
			if (data.type == 'ROLE_TYPE') {
				return 'el-icon-notebook-2';
			}
			if (data.type == 'ROLE') {
				return 'el-icon-notebook-1';
			}
			if (data.type == 'MENU') {
				return 'el-icon-menu';
			}
			if (data.type == 'BUTTON') {
				return 'el-icon-notebook-2';
			}
			if (data.type == 'ORG') {
				return 'el-icon-folder-opened';
			}
			if (data.type == 'DEPT') {
				return 'el-icon-folder';
			}
			if (data.type == 'GROUP') {
				return 'el-icon-tickets';
			}
			if (data.type == 'ADMINISTRATIVE') {
				return 'el-icon-document-copy';
			}
		},
		edit(node, data) {
			console.log(node, data);
		},
		remove(node, data) {
			console.log(node, data);
		},
		focus() {
			this.$refs.input.focus();
		},
		/** 组装数据 */
		transfrom(jsonData) {
			let result = [];
			let temp = {};
			let i = 0;
			let j = 0;
			let len = jsonData.length;
			for (; i < len; i++) {
				temp[jsonData[i]['id']] = jsonData[i]; // 以id作为索引存储元素，可以无需遍历直接定位元素
			}
			for (; j < len; j++) {
				var currentElement = jsonData[j];
				var tempCurrentElementParent = temp[currentElement['pid']]; // 临时变量里面的当前元素的父元素
				if (tempCurrentElementParent) {
					// 如果存在父元素
					if (!tempCurrentElementParent['children']) {
						// 如果父元素没有children键
						tempCurrentElementParent['children'] = []; // 设上父元素的children键
					}
					tempCurrentElementParent['children'].push(currentElement); // 给父元素加上当前元素作为子元素
				} else {
					// 不存在父元素，意味着当前元素是一级元素
					result.push(currentElement);
				}
			}
			return result;
		},
		/** 获取选中项的ID  */
		getCurrentNode(data) {
			// this.selectedId = data.id;
			// !data.children ? this.$emit('handleSelect', this.selectedId) : '';
		},

		/** 筛选 */
		filterNode(value, data) {

			if (!value) return true;
			// if(this.selectedId==data.id){
			//   console.log(1)
			//   this.selectedLabel.indexOf(value)==-1?console.log(this.treeData):""
			// }

			return data.name ? data.name.indexOf(value) !== -1 : false;
		},

		/** 初始化选中的ID的function  ‘this.selectedId ’ */
		// initSelectedId() {
		// 	return;
		// 	if (!this.defaultUnCheck) {
		// 	}
		// 	if (this.dataMsg[0]) {
		// 		if (this.dataMsg[0].children) {
		// 			this.dataMsg = this.dataMsg[0].children;
		// 			this.initSelectedId();
		// 		} else {
		// 			return [this.dataMsg[0].id];
		// 		}
		// 	}
		// },
		/** 打开 新增、修改 弹窗 */
		handleOpen(data, type) {
			this.$emit('handleOperation', data, type);
		},

		handleSelectChange(node, fNode) {
			this.selectedId = node.id;
			
			this.$emit('handleSelect', node, fNode);
		},
	},
	mounted() {
 		// console.log('moun', this.data);
		// /* 初始化选中的ID ‘this.selectedId ’ */
		// console.log('aaaa', this.initSelectedId());
		// // /*向上传递ID*/
		// this.$emit('handleSelect', this.selectedId);
	},
};
</script>

<style lang="scss" scoped>
#tree {
	height:100%;
	font-weight: normal;
	font-size: 16px;
	#title {
		text-align: center;
		background: #1c3e5d;
		color: white;
		font-weight: normal;
		padding: 10px 0;
	}
}

.treeTitle {
	background: #0a76a4;
}
/deep/ .height {
	height: 600px !important;
}
/deep/ .showBtn {
	visibility: hidden;
	margin-left: 20px;
	.el-button {
		margin: 0;
	}
}
/deep/ .el-tree-node__content:hover {
	.showBtn {
		visibility: visible !important;
		// background-color: #fff;
	}
}
/deep/ .el-button + .el-button {
	margin-left: 0 !important;
}

/deep/ .el-tree {
	height: 100%;
	width: 100%;
	overflow-y: auto;
	overflow-x: auto;
}
 /deep/ .el-tree-node > .el-tree-node__children {
	overflow: visible !important;
}

  .elinput {
	margin: 10px 0;
	height: 30px;
	// width: 100%;
}
  .el-input__inner {
	height: 30px;
	width: 100%;
}
 .height {
	height: 600px !important;
}
  .showBtn {
	visibility: hidden;
	margin-left: 20px;
	.el-button {
		margin: 0;
	}
}
  .el-tree-node__content:hover {
	.showBtn {
		visibility: visible !important;
		// background-color: #fff;
	}
}
  .el-button + .el-button {
	margin-left: 0 !important;
}

  .el-tree {
	height: 100%;
	width: 100%;
	overflow-y: auto;
	overflow-x: auto;
}
  .el-tree-node > .el-tree-node__children {
	overflow: visible !important;
}

  .elinput {
	margin: 10px 0;
	height: 30px;
	// width: 100%;
}
  .el-input__inner {
	height: 30px;
	width: 100%;
}
</style>
