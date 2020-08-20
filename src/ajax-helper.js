function AjaxCall(options) {
    var defOptions = { method: 'GET', showSpinner: true, handleResult: true, contentType: 'application/json', dataType: 'json' };

    options = applyDefaultOptions(defOptions, options);

    var elementToSpin = $('body');
    if (options.showSpinner) {
        if (options.elementToSpin != '' && options.elementToSpin != undefined)
            elementToSpin = $('#' + options.elementToSpin).length > 0 ? $('#' + options.elementToSpin) : elementToSpin;

        elementToSpin.waitMe({});
    }

    var dfd = jQuery.Deferred();  

    $.ajax({
        url: options.relativeUrl,
        async: true,
        contentType: options.contentType,
        dataType: options.dataType,
        beforeSend: function (xhr) {
            xhr.overrideMimeType("application/json");
        },
        statusCode: {
            302: function () {
                alert("page not found");
            }
        },
        method: options.method,
        data: JSON.stringify(options.data),

    })
        .done(function (data) {
            if (options.showSpinner)
                elementToSpin.waitMe("hide");
            if (data.redirectUrl != null && data.redirectUrl != undefined)
                window.location.href = data.redirectUrl;

            if (options.handleResult) {
                if (!data.success) {
                    showErrorMessages(options, data);                    
                }
            }
            dfd.resolve(data);
        })
        .fail(function (error) {
            elementToSpin.waitMe("hide");
            dfd.fail(error);
        })
    
    return dfd.promise();
}

function SetFormToAjaxCall(formId, completedCallback) {
    $('#' + formId).submit(function (e) {                
        //if (!$(this).valid()) return false;
        e.preventDefault();
        var data = $(this).serializeFormJSON();
        AjaxCall({
            method: 'POST',
            relativeUrl: $(this).attr('action'),
            data: data
        }).done((res) => {
            if (completedCallback != null)
                completedCallback(res)
        });
        return false;
    });
}

function applyDefaultOptions(defOptions, options) {
    for (let j in defOptions) {
        if (options[j] == null || options[j] == undefined)
            options[j] = defOptions[j];
    }
    return options;
}

function showErrorMessages(options, data) {
    var errorList = ''
    for (let err of data.errors) {
        errorList += '<li>' + err.errorMessage + '</li>';
    }
    if (options.elementToShowErrors != null && options.elementToShowErrors != undefined) {
        $('#' + options.elementToShowErrors).html('<ul>' + errorList + '</ul >');
    }
    else {
        ShowWarningMessageWithHTML(errorList); 
    }
}

(function ($) {

    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (this.value != '' && this.value != null) {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            }
        });
        return o;
    };

})(jQuery);
