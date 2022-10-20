

import axios from 'axios'

export const getGihubCoder = (value:string)=>{
    return axios.request({
        url:`https://api.github.com/users/${value}`,
        method:'get'
    })
}