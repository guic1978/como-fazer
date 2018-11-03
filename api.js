const axios = require('axios')
const baseURL = 'https://como-fazer-aad47.firebaseio.com/'
const auth = 'ZuI7E9GQOfL1iI3J7taebGrh7IfvHobs95AwFIpL'

const list = async(key) => {
    const content = await axios.get(baseURL+key+'.json?auth='+auth)

    if(content.data){
        const objetos = Object
                    .keys(content.data)
                    .map(key => {
                        return {
                            id: key,
                            ...content.data[key]
                        }
                    })

        return objetos
    }
    return []
}

const apagar = async(key, id) => {
    await axios.delete(baseURL+key+'/'+id+ '.json?auth='+auth)
    return true
}

const get = async(key, id) => {
    const content = await axios.get(baseURL+key+'/'+id+ '.json?auth='+auth)
    
    return {
        id: id,
        ...content.data
    }
}

const update = async(key, id, data) => {
    await axios.put(baseURL+key+'/'+id+'.json?auth='+auth, data)
    return true
}

const create = async(key, data) => {
    await axios.post(baseURL+key+'.json?auth='+auth, data)
    return true
}

module.exports = {
    list,
    apagar,
    get,
    update,
    create
}