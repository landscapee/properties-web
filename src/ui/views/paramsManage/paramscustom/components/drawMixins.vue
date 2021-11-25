<template>

</template>
<script>
import {mapGetters} from "vuex"

export default {
    name: "drawMinxs",
    data() {
        return {}
    },
    computed: {
        showCoordinatesBt() {
            return (item) => {
                return item.type === 'point' || item.type === 'line' || item.type === 'polygon'
            }
        },
        ...mapGetters(['getGisinfo'])
    },
    watch: {
        getGisinfo: {
            handler: function () {
                // console.log('111')
                // console.log(this.getGisinfo)
                let coordinates = [...this.getGisinfo.coordinates]
                console.log('coordinates-property', coordinates)
                let transObj = {
                    point: "Point",
                    line: "LineString",
                    polygon: "Polygon",
                }
                this.form.properties.forEach(item => {
                    console.log('地图数据qq', item.type);
                    if (transObj[item.type] === this.getGisinfo.type) {

                        item.value = JSON.stringify(coordinates)
                    }
                })
                console.log(this.form.properties)
            },
            deep: true
        }
    },
    methods: {
        copyData(text, ref) {
            let copyDOM1 = this.$refs[ref]; //指定的DOM元素
            copyDOM1[0] && (copyDOM1 = copyDOM1[0])
            copyDOM1.select()
            let successful1 = document.execCommand('copy');// 执行 copy 操作
            successful1 ? this.$message.success('复制成功')
                : this.$message.info('复制失败');

        },

        async handleMap1(item, unEdit) {
            console.log('item',item);
            let classifyData=[]
            let contrastLayerData=[]
            if ((item.type == 'line' || item.type == 'polygon')&&item.ChildrenList) {
                let transObj = {
                    point: "Point",
                    line: "LineString",
                    polygon: "Polygon",
                }
                classifyData=await this.getClassifyData(item.id, item.code,transObj[item.type])
            }
            if(item.contrastLayer&&item.contrastLayerAtr){
                contrastLayerData= await this.getContrastLayerData(item)
            }

            console.log(classifyData,contrastLayerData);
            let data = {
                coordinates: item.value,
                type: item.type,
                unEdit: unEdit,
                classifyData:[...classifyData,...contrastLayerData]
            }
            window.parent.postMessage({
                state: 'drapMap',
                data,
            }, '*');
        },
        getContrastLayerData(item){
            return this.$axios.post("/api/param/parameter-list/get", {
                parameterId: item.contrastLayer,
            }).then(res => {
                let data = res.data.data
                console.log(1241,data);
                let [code,type]=item.contrastLayerAtr.split('$_$')
                let arr = []
                data.length&&data.map((item) => {
                    let itemValue= JSON.parse(item.value);
                    let coordinates
                    try {
                        coordinates = JSON.parse(itemValue[code]);
                    } catch (e) {
                        coordinates = null
                    }
                    let transObj = {
                        point: "Point",
                        line: "LineString",
                        polygon: "Polygon",
                    }
                    coordinates&&Array.isArray(coordinates)&&arr.push({coordinates, type:transObj[type]})
                });
                return arr
            });
        },

    },
}
</script>

<style scoped>

</style>