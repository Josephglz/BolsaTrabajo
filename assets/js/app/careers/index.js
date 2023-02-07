var btnStore = document.getElementById('btnSaveCareer');
var btnUpdate = document.getElementById('btnSaveEditCareer');
var idCareer = 0

btnStore.addEventListener('click', function (e) {
    e.preventDefault()
    btnStore.disabled = true
    storeCareer()
})

btnUpdate.addEventListener('click', function (e) {
    e.preventDefault()
    btnUpdate.disabled = true
    updateCareer()
})

function storeCareer() {
    var form = document.getElementById('formNewCareer')
    var formData = new FormData(form)
    var data = {}

    for(var key of formData.keys()) {
        if(formData.get(key).trim() == '') {
            notie.alert({
                type: 3,
                text: 'Por favor rellene todos los campos',
                time: 3
            })
            btnStore.disabled = false
            return
        }
        data[key] = formData.get(key)
    }

    fetch('/api/careers/store', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.status) {
            notie.alert({
                type: 1,
                text: res.message,
                time: 3
            })
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

function updateCareer() {
    var form = document.getElementById('formEditCareer')
    var formData = new FormData(form)
    var data = {}

    for(var key of formData.keys()) {
        if(formData.get(key).trim() == '') {
            notie.alert({
                type: 3,
                text: 'Por favor rellene todos los campos',
                time: 3
            })
            btnUpdate.disabled = false
            return
        }
        data[key] = formData.get(key)
    }

    data['id'] = idCareer

    fetch('/api/careers/update', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if(res.status) {
            notie.alert({
                type: 1,
                text: res.message,
                time: 3
            })
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

function deleteCareer(id) {
    notie.confirm({
        text: '¿Está seguro de eliminar esta carrera?',
        submitText: 'Si',
        cancelText: 'No',
        submitCallback: () => {
            fetch(`/api/careers/delete`, {
                method: 'POST',
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                if(res.status) {
                    notie.alert({
                        type: 1,
                        text: res.message,
                        time: 3
                    })
                    setTimeout(() => {
                        location.reload()  
                    }, 3000);
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
    fetch('/api/careers/get', {
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
            idCareer = data.ID_C
            document.getElementById('txtEditCareer').value = data.NAME_C
            document.getElementById('txtEditAcronymCareer').value = data.ACRONYM_C
        } else {
            notie.alert({
                type: 3,
                text: res.message,
                time: 3
            })
        }
    })
}