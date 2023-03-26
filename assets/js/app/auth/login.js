var btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', function(e) {
    e.preventDefault()
    btnLogin.disabled = true
    validateCredentials()
})

function validateCredentials() {
    allowButton(btnLogin)
    var form = document.getElementById('formLogin');
    var formData = new FormData(form);
    var data = {}

    for(var key of formData.keys()) {
        if(formData.get(key) == '') {
            notie.alert({
                type: 3,
                text: 'Por favor rellene todos los campos',
                time: 3
            })
            btnLogin.disabled = false
            return false
        } else {
            if(key == 'txtEmail') {
                if(!validateEmail(formData.get(key))) {
                    notie.alert({
                        type: 3,
                        text: 'Ingrese un correo electrónico válido',
                        time: 3
                    })
                    btnLogin.disabled = false
                    return false
                }
            }
            if(key == 'txtPassword') {
                if(!validatePassword(formData.get(key))) {
                    notie.alert({
                        type: 3,
                        text: 'Ingrese una contraseña válida',
                        time: 3
                    })
                    btnLogin.disabled = false
                    return false
                }
            }
            data[key] = formData.get(key)
        }
    }

    fetch('/api/users/auth/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.status == 1) {
            notie.alert({
                type: 1,
                text: data.message,
                time: 3
            })
            setTimeout(() => {
                window.location.href = '/panel'
            }, 3000)
        } else {
            notie.alert({
                type: 3,
                text: data.message,
                time: 3
            })
            btnLogin.disabled = false
        }
    })
}