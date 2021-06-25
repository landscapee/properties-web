<!--
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-02 16:57:52
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-08 13:41:16
-->
<template>
   <el-dialog
    title="预览图层"
    :visible.sync="dialogVisible"
    width="100%"
    :before-close="close"
    :fullscreen='true'
    :append-to-body='true'
    center>
    <div class="previewLayer">
         <Map class="map_content" ref="map"></Map>
         <LayersList class="layer_content" ref="layersList"></LayersList>
    </div>
   </el-dialog>
</template>

<script>
import LayersList from '@/views/gisOpenlayer/components/LayersList';
import Map from '@/views/gisOpenlayer/components/Map';
import requestApi from '@/api/index.js'
export default {
    name:'PreviewLayer',
    components:{LayersList,Map},
    data(){
        return {
            dialogVisible:false,
            layerCode:'',
            layerOptions:[],
        }
    },
    mounted(){
        
    },
    methods:{
         async getLayerAllFn(){
            let res=await requestApi.globalLayer.getLayerAll({method:'get'})
            if(res){
                this.layerOptions=res;
                this.$refs.map.getLayerOptions(this.layerOptions);
                this.$refs.layersList.getLayerOptions(this.layerOptions)
            }
        },
        open(obj){
            this.$store.commit('setActiveLayer',[obj.code]);
            this.getLayerAllFn()
            this.dialogVisible=true;
            
        },
        close(){
            //this.$store.commit('setActiveLayer',[])
            this.dialogVisible=false;
        },
    }
}
</script>

<style scoped lang='scss'>
.previewLayer{
   width: 100%;
   height:900px;
   display: flex;
   border: 1px solid #c7ccd2;
    border-radius: 6px;
   .map_content{
        height: 100%;
        width: calc(100% - 340px);
        border-right: 1px solid #c7ccd2;
        position: relative;
   };
   .layer_content{
       width: 340px;
       height: 100%;
       padding: 19px;
    }
}
</style>