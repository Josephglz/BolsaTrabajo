var btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', function(e) {
    e.preventDefault()
    validateCredentials()
})

function validateCredentials() {
    var form = document.getElementById('formLogin');
    var formData = new FormData(form);
    var data = {}

    
}