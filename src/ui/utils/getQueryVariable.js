/*
 * @Author: your name
 * @Date: 2021-06-23 09:57:56
 * @LastEditTime: 2021-06-23 09:58:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \properties-web\src\ui\utils\getQueryVariable.js
 */
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
export default getQueryVariable