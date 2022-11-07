
//For body loading
$(function () {
    $("#loaderbody").addClass('hide');

    $(document).bind('ajaxStart', function () {
        $("#loaderbody").removeClass('hide');
    }).bind('ajaxStop', function () {
        $("#loaderbody").addClass('hide');
    });
}); //end


//For ImagePreview
function ShowImagePreview(imageUploader, previewImage) {
    if (imageUploader.files && imageUploader.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(previewImage).attr('src', e.target.result);
        }

        reader.readAsDataURL(imageUploader.files[0]);
    }
}//end

// for image post 
function jQueryAjaxPost(form) {
    $.validator.unobtrusive.parse(form);
    if ($(form).valid()) {
        var ajaxConfig = {
            type: "POST",
            url: form.action,
            data: new FormData(form),
            success: function (response) {
                if (response.success) {
                    $(form).attr('data-restUrl');
                }
            }
        }

        if ($(form).attr('enctype') == "multipart/form-data") {
            ajaxConfig["contentType"] = false;
            ajaxConfig["processData"] = false;

        }
        $.ajax(ajaxConfig);
    }
    return false;
}//end


function show1(input) {
    if (input.files && input.files[0]) {
        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            $('#ImageUpload').attr('src', e.target.result);
        }
        filerdr.readAsDataURL(input.files[0]);
    }
}

