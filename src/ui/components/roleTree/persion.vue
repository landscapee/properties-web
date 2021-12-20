<template lang="html">
	<el-button @dblclick.native="handleDbClick()" @click="handleClick()">{{ name }}</el-button>
	<!-- <el-tooltip placement="bottom">
		<div slot="content">
			<label>部门:{{ deptName }}</label
			><br />
			<label>班组:{{ groupName }}</label
			><br />
			<label>用户名:{{ userName }}</label
			><br />
			<label>电话:{{ phone }}</label
			><br />
		</div>
		
	</el-tooltip> -->
	<!-- <el-popover placement="top-start" title="标题" width="200" trigger="hover">
		<div slot="content">
			<label>用户名{{ person.userName }}</label
			><br />
			<label>电话：{{ person.phone }}</label>
		</div>
		<el-button slot="reference">{{ person.name }}</el-button>
	</el-popover> -->
</template>

<script>
export default {
	props: ['person', 'isdbClick'],
	computed: {
		name: function() {
			if (!this.person) {
				return '';
			}
			return this.person.user ? `${this.person.user.name}${this.person.user.enabled === 0 ? '(已禁用)' : ''}` : `${this.person.name}${this.person.enabled === 0 ? '(已禁用)' : ''}`;
		},
		phone: function() {
			if (!this.person) {
				return '';
			}
			return this.person.user ? this.person.user.phone : this.person.phone;
		},
		userName: function() {
			if (!this.person) {
				return '';
			}

			return this.person.user ? this.person.user.userName : this.person.userName;
		},
		deptName: function() {
			if (!this.person) {
				return '';
			}
			return this.person.user ? this.person.user.deptName : this.person.deptName;
		},
		groupName: function() {
			if (!this.person) {
				return '';
			}
			return this.person.user ? this.person.user.groupName : this.person.groupName;
		},
	},
	methods: {
		handleClick() {
			if (!this.isdbClick) {
				this.select();
			} else {
				return false;
			}
		},
		handleDbClick() {
			if (this.isdbClick) {
				this.select();
			}
		},
		select() {
			this.$emit('select', this.person);
		},
	},
};
</script>

<style lang="css" scoped></style>
