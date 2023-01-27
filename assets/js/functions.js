function validateEmail(email) {
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return emailRegex.test(email) && email.length < 150;
}

function validatePassword(pass) {
    const passRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.{8,20})/
    return passRegex.test(pass)
}