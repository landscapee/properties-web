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
        getClassifyData(index, code,type) {
            return this.$axios.post("/api/param/parameter-list/get", {
                parameterId: this.parameterId,
                parentDataId: this.parentDataId,
            }).then(res => {
                let data = res.data.data
                data.splice(index, 1)
                let arr = []
                data.length&&data.map((item) => {
                    let itemValue= JSON.parse(item.value);
                    let coordinates
                    try {
                        coordinates = JSON.parse(itemValue[code]);
                    } catch (e) {
                        coordinates = null
                    }
                    coordinates&&arr.push({coordinates, type,id:this.$uuid()})
                });
                return arr
            });
        },
        async handleMap1(item, unEdit) {
             let classifyData=null
            if (item.type == 'line' || item.type == 'polygon') {
                let transObj = {
                    point: "Point",
                    line: "LineString",
                    polygon: "Polygon",
                }
                classifyData=await this.getClassifyData(item.index, item.code,transObj[item.type])
            }
            let data = {
                coordinates: item.value,
                type: item.type,
                unEdit: unEdit,
                classifyData
            }
            window.parent.postMessage({
                state: 'drapMap',
                data,
            }, '*');
        },
    },
}
</script>

<style scoped>

</style>