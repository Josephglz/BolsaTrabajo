var btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', function(e) {
    e.preventDefault()
    validateCredentials()
})

function validateCredentials() {
    var form = document.getElementById('formLogin');
    var formData = new FormData(form);
    var data = {}

    for(var key of formData.keys()) {
        if(formData.get(key) == '') {
            alert('Please fill all fields')
            return false
        } else {
            if(key == 'txtEmail') {
                if(!validateEmail(formData.get(key))) {
                    alert('Please enter a valid email address')
                    return false
                }
            }
            if(key == 'txtPassword') {
                if(!validatePassword(formData.get(key))) {
                    alert('Please enter a valid password')
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
        if(data.status == 200) {
            alert(data.message)
        } else {
            alert(data.message)
        }
    })
}