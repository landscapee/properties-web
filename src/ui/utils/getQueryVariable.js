/*
 * @Author: your name
 * @Date: 2021-06-23 09:57:56
 * @LastEditTime: 2021-07-19 15:37:58
 * @LastEditors: yang fu ren
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\utils\getQueryVariable.js
 */
//history模式
// function getQueryVariable(variable)
// {
//        var query = window.location.search.substring(1);
//        var vars = query.split("&");
//        console.log(123)
//        for (var i=0;i<vars.length;i++) {
//                var pair = vars[i].split("=");
//                if(pair[0] == variable){return pair[1];}
//        }
//        return(false);
// }
//hash模式
function getQueryVariable(variable)
{
       var hashQuery = window.location.hash.split('?');
       var vars = hashQuery[1].split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
export default getQueryVariable