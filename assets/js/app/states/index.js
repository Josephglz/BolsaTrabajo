var btnStore = document.getElementById('btnSaveState');
var btnUpdate = document.getElementById('btnEditState');
var idState = 0

btnStore.addEventListener('click', function (e) {
    e.preventDefault()
    btnStore.disabled = true
    storeState()
})

btnUpdate.addEventListener('click', function (e) {
    e.preventDefault()
    btnUpdate.disabled = true
    updateState()
})

function storeState() {
    var form = document.getElementById('formNewState')
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
            if(key == 'txtNewState') {
                if(!validateTextLength(formData.get(key).trim(), 3, 50)) {
                    notie.alert({
                        type: 3,
                        text: 'El nombre del estado debe tener entre 3 y 50 caracteres',
                        time: 3
                    })
                    btnStore.disabled = false
                    return
                }
            }
            data[key] = formData.get(key)
        }
    }

    fetch('/api/states/store', {
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
            btnStore.disabled = false
            setTimeout(() => {
                location.reload()
            }, 3000);
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

function updateState() {
    var form = document.getElementById('formEditEstate')
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
            if(key == 'txtEditState') {
                if(!validateTextLength(formData.get(key).trim(), 3, 50)) {
                    notie.alert({
                        type: 3,
                        text: 'El nombre del estado debe tener entre 3 y 50 caracteres',
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

    data['id'] = idState

    fetch('/api/states/update', {
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
            btnUpdate.disabled = false
            setTimeout(() => {
                location.reload()
            }, 3000);
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

function deleteState(id) {
    notie.confirm({
        text: '¿Está seguro de eliminar este estado?',
        submitCallback: function () {
            fetch('/api/states/delete', {
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
                        location.reload()
                    }, 2000);
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
    fetch('/api/states/get', {
        method: 'POST',
        body: JSON.stringify({id}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.status == 1) {
            var data = res.data
            idState = data.ID_ST
            toggleModal('modal-2')
            document.getElementById('txtEditState').value = data.NAME_ST
        } else {
            notie.alert({
                type: 3,
                text: res.message,
                time: 3
            })
        }
    })
}