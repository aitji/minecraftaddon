window.addEventListener('beforeunload', function (e) {
    e.preventDefault()
    e.returnValue = ''
    var confirmationMessage = 'Are you sure you want to leave? Just make sure copied a commanded!'
        (e || window.event).returnValue = confirmationMessage
    return confirmationMessage
})