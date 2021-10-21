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
        handleMap1(item) {
            console.log('row1',item);

            window.parent.postMessage({
                state: 'drapMap',
                data: {
                    coordinates: item.value,
                    type: item.type,
                }
            }, '*');
        },
    },
 }
</script>

<style scoped>

</style>