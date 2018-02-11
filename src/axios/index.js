import Vue from 'vue'

import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,Axios)

let http = Axios.create({
    baseURL:'https://easy-mock.com/mock/59884e79a1d30433d85858cb/works/',
    timeout: 1000,
    responseType:'json',
    params:{
      book:"123"
    },
    headers:{
        'custome-header': 'miaov',
    }
 })

export default http