/**
 * 导入相关组件
 * axios:用于vue发送ajax请求
 * {Message}:用于消息提示
 * router:用于路由
 */
import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'
/**
 *响应成功进入data,响应失败进入error
 */
axios.interceptors.response.use(success=>{
    //逻辑错误
    if (success.status && success.status == 200 && success.data.status == 500) {
        Message.error({message: success.data.message})
        return;
    }
    if(success.data.message)
    {
        Message.success({message:success.data.message});
    }
    return success.data;
},error=>{
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '未找到服务器'})
    } else if (error.response.status == 403) {
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
        Message.error({message: '尚未登录，请登录'})
        router.replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message})
        } else {
            Message.error({message: '未知错误!'})
        }
    }
    return;
})

let base='';
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params

    });
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params

    });
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params

    });
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}