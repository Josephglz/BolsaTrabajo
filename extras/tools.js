const urlClear = (url) => {
	// return url.replace(/(\-)/gi, ' ').replace(/(\___)/gi, '/').replace(/(\__)/gi, '+').replace(/(\_)/gi, '.').replace(/(\')/gi, ` `)
    return url.replace(/(\-)/gi, ' ').replace(/(\___)/gi, '/').replace(/(\__)/gi, '+').replace(/(\_)/gi, '-')
}

const paginadorParams = (params) => {
    let resultado = {
        p: params.p? Number(params.p): 0,
        b: params.b? urlClear(params.b): '',
        categoria: params.categoria ? params.categoria: '',
        tags: params.tags? params.tags.split('|'): [],
        maxFilas: params.maxFilas? Number(params.maxFilas): 10,
        maxPag: params.maxPag? Number(params.maxPag): 10,
    }
    return resultado
}

const paginador = (params) => {
    let res = {
        p: params.p? Number(params.p): 0,
        i: params.p? Number(params.p) + 1: 1,
        b: params.b? params.b: '',
        categoria: params.categoria ? params.categoria: '',
        filas: params.filas? Number( params.filas): 0,
        maxFilas: params.maxFilas? Number(params.maxFilas): 2,
        maxPag: params.maxPag? Number(params.maxPag): 5,
        totalPag: 0,
        pagInicial: 0,
        numeros: []
    }  

    res.totalPag = Math.ceil(res.filas / res.maxFilas)
    res.p = res.i < res.totalPag? res.p: res.totalPag - 1
    res.pagFinal = res.totalPag - 1

    if(res.totalPag <= 1){
        res.numeros.push({p: 0, b: res.b, i: 1, activo: true})
        res.pagFinal = 0
        return res
    }

    if(res.totalPag <= res.maxPag || res.i < res.maxPag){
        for(let i = 0; i < (res.totalPag <= res.maxPag? res.totalPag: res.maxPag); i++){
            res.numeros.push({p: i, b: res.b, i: i + 1, activo: res.p === i})
        }
        return res
    }

    let t = Math.ceil(res.maxPag / 2)

    for(let i = res.i >= (res.totalPag - t)? res.totalPag - res.maxPag : res.i - t; i < (res.i >= res.totalPag - 3? res.totalPag : res.p + t); i++){
        res.numeros.push({p: i, b: res.b, i: i + 1, activo: res.p === i})
    }

    return res
}

const cadenaBusquedaLike = (param1, columnas) => {
    let arrParam = param1.split(' '), result = ''

    columnas.map((k) => {
        arrParam.map((v, i) => {
            if(v.length > 2){
                if(result.length === 0){
                    result += `${k} LIKE '%${v}%' COLLATE Latin1_General_CI_AI`
                }else{
                    result += ` OR ${k} LIKE '%${v}%' COLLATE Latin1_General_CI_AI`
                }
            }
        })
    })

    return result
}

module.exports = {
    paginadorParams,
    urlClear,
    paginador,
    cadenaBusquedaLike,
}