function validateEmail(email) {
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return emailRegex.test(email) && email.length < 150;
}

function validatePassword(pass) {
    const passRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.{5,24})/
    return passRegex.test(pass)
}

function validateTextLength(text, min, max) {
    return text.length >= min && text.length <= max 
}