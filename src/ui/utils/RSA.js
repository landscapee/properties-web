/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2020-11-19 10:06:25
 * @LastEditors: yang fu ren
 * @LastEditTime: 2020-11-19 10:08:42
 */
import JSEncrypt from 'jsencrypt';
let publicKey ='MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANWnvOm0wS9hsY9xiAs2G09Ah88zaJHMwEdXiVBa+pCJVSlJdSglewnHFWuT/4GBMTbcfusTQWChjDNn3trzWwcCAwEAAQ==';
export default function rasEncryption(data){
    // 新建 JSEncrypt 对象
    let encryptor = new JSEncrypt()
    // 设置公钥
    encryptor.setPublicKey(publicKey)
    // 加密数据
    return encryptor.encrypt(data)
}