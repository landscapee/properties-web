<template>

</template>
<script>
import {mapGetters} from "vuex"
import {map} from "lodash";

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
        createGeoJson(features){
            return  {
                "creator": "geojson",
                "features": features||[],
                "type": "FeatureCollection"
            }
        },
        createFeature(type,coordinates,properties){

            let transObj = {
                Point: coordinates,
                LineString: coordinates,
                Polygon: [coordinates],
            }
            return  {
                "geometry": {"type": type, "coordinates": transObj[type]},
                "properties": properties,
                "type": "Feature"
            }
        },
        getCoor(coor){
          let coorDinates=''
            try{
                coorDinates=JSON.parse(coor)
            }catch (e){
                coorDinates=null
            }
            return coorDinates
        },
        async handleMap1(item, unEdit) {
            console.log('item',item);
            //显示子列表的 兄弟 要素 和参考图层的要素
            let geoJson = this.createGeoJson()
            let transObj = {
                point: "Point",
                line: "LineString",
                polygon: "Polygon",
            }
             if ((item.type == 'line' || item.type == 'polygon') && item.ChildrenList) {

                geoJson = await this.getClassifyData(item.id, item.code, transObj[item.type],{...item})
            }
            //处理参考图层
            if (item.contrastLayer && item.contrastLayerAtr) {
                let contrastLayerData = await this.getContrastLayerData(item)
                // console.log(110,geoJson,contrastLayerData);
                geoJson.features.push(...contrastLayerData)
            }
            let coor=this.getCoor(item.value)
            let   editGeoJson=coor&&this.createGeoJson(
                [this.createFeature(transObj[item.type], coor, this.getProperties(item))])
             let data = {
                coordinates: coor,
                type: transObj[item.type],
                unEdit: unEdit,
                 editGeoJson,
                geoJson,
            }
            console.log(data);
            window.parent.postMessage({
                state: 'drapMap',
                data,
            }, '*');
        },

        async getContrastLayerData(item) {
            let obj=await this.getIsValue1(item.contrastLayer)
            // console.log(obj,111,item);
            return this.$axios.post("/api/param/parameter-list/get", {
                parameterId: item.contrastLayer,
            }).then(res => {
                let data = res.data.data
                 let [code, type] = item.contrastLayerAtr.split('$_$')
                let features = []
                data.length && data.map((item) => {
                    let itemValue = JSON.parse(item.value);
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

                    if (coordinates && Array.isArray(coordinates)) {
                        let properties={"name": obj.name,
                            isValueName__:obj.codeName,
                            isValueCode__:obj.code,
                            isValueValue__:itemValue[obj.code]
                        }
                        // properties[obj.code]=itemValue[obj.code]
                        // console.log(231,itemValue,properties);
                        let feature = {
                            "geometry": {"type": transObj[type], "coordinates": [coordinates]},
                            "properties": properties,
                            "type": "Feature"
                        }
                        features.push(feature)
                    }
                });
                return features
            });
        },

        async getIsValue1(id) {
            let a = await this.$axios.post(`/api/param/parameterManage/get?id=${id}`, {})
            let code=null,name=null,codeName;
            if(a.data&&a.data.data){
                name=a.data.data.name;
                let arr=a.data.data.properties
                arr&&(arr=JSON.parse(arr))
               arr&& map(arr,(k)=>{
                   // console.log(arr, k);
                   if(k.isValue){
                       codeName=k.name;
                       code=k.code
                   }
                })
            }
            return {code,codeName,name,}
        },

        getProperties(item ) {
            // console.log(item,112211);
            let code=null,codeName;
            map(this.paramsProperties,(k)=>{
                 if(k.isValue){
                    codeName=k.name;
                    code=k.code
                }
            })
            let properties={
                "name": this.paramName,
                isValueName__:codeName,
                isValueCode__:code,
                isValueValue__:item.row[code],
            }


            return properties
        },

        getGeoJson(data, code, type,itemL, isString) {
            let geoJson = this.createGeoJson()
            data.length && data.map((item) => {
                 let itemValue = item;
                if (isString) {
                    itemValue = JSON.parse(item.value)
                }
                let coordinates=this.getCoor(itemValue[code])
                itemL.row=itemValue
                let properties=this.getProperties(itemL)
                if (coordinates) {
                    let feature=this.createFeature(type,coordinates,properties)
                    geoJson.features.push(feature)
                }

            });
            return geoJson
        },
    },
}
</script>

<style scoped>

</style>