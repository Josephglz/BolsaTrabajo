var btnStore = document.getElementById('btnSaveTown')
var btnUpdate = document.getElementById('btnEditTown')
var idCity = 0

btnStore.addEventListener('click', function (e) {
    e.preventDefault()
    btnStore.disabled = true
    storeCity()
})

btnUpdate.addEventListener('click', function (e) {
    e.preventDefault()
    btnUpdate.disabled = true
    updateCity()
})

function storeCity() {
    var form = document.getElementById('formNewTown')
    var formData = new FormData(form)
    var data = {}

    for(var key of formData.keys()) {
        if(formData.get(key) == '') {
            notie.alert({
                type: 3,
                text: 'Por favor rellene todos los campos',
                time: 3
            })
            btnStore.disabled = false
            return
        } else {
            if(key == 'txtNewCity') {
                if(!validateTextLength(formData.get(key).trim(), 3, 50)) {
                    notie.alert({
                        type: 3,
                        text: 'El nombre de la ciudad debe tener entre 3 y 50 caracteres',
                        time: 3
                    })
                    btnStore.disabled = false
                    return
                } else {
                    data[key] = formData.get(key)
                }
            }
        }
    }

    fetch('/api/cities/store', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.status == 1) {
            notie.alert({
                type: 1,
                text: res.message,
                time: 3
            })
            setTimeout(() => {
                location.href = '/panel/cities'
            }, 3000)
        } else {
            notie.alert({
                type: 3,
                text: res.message,
                time: 3
            })
            btnStore.disabled = false
        }
    })
}

function updateCity() {
    var form = document.getElementById('formEditTown')
    var formData = new FormData(form)
    var data = {}

    for(var key of formData.keys()) {
        if(formData.get(key) == '') {
            notie.alert({
                type: 3,
                text: 'Por favor rellene todos los campos',
                time: 3
            })
            btnUpdate.disabled = false
            return
        } else {
            if(key == 'txtEditCity') {
                if(!validateTextLength(formData.get(key).trim(), 3, 50)) {
                    notie.alert({
                        type: 3,
                        text: 'El nombre de la ciudad debe tener entre 3 y 50 caracteres',
                        time: 3
                    })
                    btnUpdate.disabled = false
                    return
                } else {
                    data[key] = formData.get(key)
                }
            }
        }
    }

    data['id'] = idCity

    fetch('/api/cities/update', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.status == 1) {
            notie.alert({
                type: 1,
                text: res.message,
                time: 3
            })
            setTimeout(() => {
                location.href = '/panel/cities'
            }, 3000)
        } else {
            notie.alert({
                type: 3,
                text: res.message,
                time: 3
            })
            btnUpdate.disabled = false
        }
    })
}

function deleteCity(id) {
    notie.confirm({
        text: '¿Está seguro de eliminar esta ciudad?',
        submitCallback: function () {
            fetch('/api/cities/delete', {
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.status == 1) {
                    notie.alert({
                        type: 1,
                        text: res.message,
                        time: 3
                    })
                    setTimeout(() => {
                        location.href = '/panel/cities'
                    }, 3000)
                } else {
                    notie.alert({
                        type: 3,
                        text: res.message,
                        time: 3
                    })
                }
            })
        }
    })
}

function loadData(id) {
    fetch('/api/cities/get', {
        method: 'POST',
        body: JSON.stringify({id}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.status) {
            toggleModal('modal-2')
            var data = res.data
            idCity = data.ID_CS
            document.getElementById('txtEditCity').value = data.NAME_CS
        } else {
            notie.alert({
                type: 3,
                text: res.message,
                time: 3
            })
        }
    })
}