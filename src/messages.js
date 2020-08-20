function ShowWarningMessage(message) {
    var dfd = jQuery.Deferred();  

    Swal.fire({
        title: 'Algo não deu certo',
        text: message,
        type: 'warning',
        showCloseButton: true
    }).then((result) => {
        dfd.resolve();
    })

    return dfd;
}

function ShowSuccessMessage(message) {
    var dfd = jQuery.Deferred();

    Swal.fire({
        title: 'Deu certo!',
        text: message,
        type: 'success',
        showCloseButton: true
    }).then((result) => {
        dfd.resolve();
    })

    return dfd;
}

function ShowWarningMessageWithHTML(messageHTML, title) {
    var dfd = jQuery.Deferred();

    Swal.fire({
        title: 'Algo não deu certo',
        html: messageHTML,
        type: 'warning',
        showCloseButton: true
    }).then((result) => {
        dfd.resolve();
    })

    return dfd;
}

function ShowInfoMessageWithHTML(messageHTML) {
    var dfd = jQuery.Deferred();

    Swal.fire({
        title: 'Algo não deu certo',
        html: messageHTML,
        type: 'info',
        showCloseButton: true
    }).then((result) => {
        dfd.resolve();
    })

    return dfd;
}

function ShowConfirmMessage(message, confirmButtonText, cancelButtonText, title) {
    var dfd = jQuery.Deferred();

    if (title == null) title = 'Tem certeza?';

    Swal.fire({
        title: title,
        text: message,
        type: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
    }).then((result) => {
        dfd.resolve(result);
    })

    return dfd;
}
