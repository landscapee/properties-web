/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-20 11:20:18
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-20 14:19:29
 */
export default function generateDirective(Vue){
    //小数指令
    Vue.directive('decimal', {
        update:function(el, vDir, vNode){
            el.addEventListener('keyup',function(e){
                e = e || window.event;
                var obj = e.target;
                obj.value = obj.value
                    .replace('.', '$#$') // 把第一个字符'.'替换成'$#$'
                    .replace(/\./g, '') // 把其余的字符'.'替换为空
                    .replace('$#$', '.') // 把字符'$#$'替换回原来的'.'
                    .replace(/[^\d]/g, '') // 只能输入数字和'.'
                    .replace(/^\./g, '') // 不能以'.'开头
                    .replace(/([0-9]+\.[0-9]{2})[0-9]*/, '$1'); // 只保留2位小数
                if ((obj.value + ' ').indexOf(0) == 0) {
                    obj.value = '';
                }
                vNode.data.model.callback(obj.value);
            })
        },
    });
}