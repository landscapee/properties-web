/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2021-04-22 09:32:59
 * @LastEditors: yang fu ren
 * @LastEditTime: 2021-04-22 09:33:47
 */
export default function parseURLToObj(strParam){
    let resObj = {}
	    // strParam = location.search.substr(1)
	  strParam.split('&').forEach(param => {
	    let arr = param.split('=')
	      key = arr[0]
	      val = arr[1]
	    resObj[key] = val
	  })
	
	  return resObj
}