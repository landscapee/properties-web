<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-05-06 10:23:03
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-05-25 11:10:36
-->
<template>
	<div>
		<div class="fileUpLoad">
			<div class="img" v-if="config.type == 'img'&&config.fileList===false" >
          <el-upload
              class="avatar-uploader"
              :action='actionUrl'
              :show-file-list="false"
              :on-change="onUploadChange"
              :file-list="fileList"
              :auto-upload="false"
          >
          <img  v-bind:src="imageUrl" class="avatar">
          <i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
			</div>
		</div>
	</div>
</template>

<script>
import requestApi from '@/api/index.js';
export default {
	// index数据下标
	props: ['config'],
	data() {
		return {
			dialogVisible: false,
			fileList: [],
      actionUrl:'',
      fileConfig: {},
      imageUrl:''
		};
	},
	methods: {
        async uploadFn(data){
          let res = await requestApi.fileupload.upload({
            method:"post",
            data
          })
          if(res){
             console.log(res);
             this.imageUrl=`http://${location.hostname}:${location.port}/file/api/image/${res}.jpg`;
             this.$emit('uploadSuccess',res)
          }
        },
        onUploadChange(event, file, fileList){
            var that = this;
            const extension = true;
            const isLt2M =event.size / 1024 / 1024 < 5;
            if (!extension) {
                this.$message({
                    message: '上传文件只能是zip文件!',
                    type: 'warning'
                });
                return false
            }
            if (!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 5MB!',
                    type: 'warning'
                });
                return false
            }
            if (extension && isLt2M) {
                var newFileList=event.raw;
                that.fileList=[];
                that.fileList.push(newFileList);
                let formData = new FormData();  //提交的参数   
                formData.append('file',that.fileList[0]);
                that.uploadFn(formData)
            }
        },
        //父级调用传递url
        getFileUrl(url){
            this.imageUrl=url;
            console.log(this.imageUrl)
        }
	},
	mounted() {
		  this.$emit('mountedEnd');
	},
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #979797;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    img{
      display: inline-block;
      vertical-align:middle;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #979797;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #979797;
    border-radius: 3px;
     vertical-align:middle;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: block;
  }
  .img{

  }
</style>
