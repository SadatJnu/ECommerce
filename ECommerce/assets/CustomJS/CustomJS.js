
$(".toggle-password").click(function () {

    $(this).toggleClass("glyphicon glyphicon-lock");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

addEventListener("load", function () {
    setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
    window.scrollTo(0, 1);
}
//===================================================================================================================================================================

//// new MemberRegistration 
$(document).ready(function () {

    $("#btnSubmit_bkp").on('click', function (e) {
        var empId = $("#EmpID").val();
        var Fname = $("#FirstName").val();
        var Lname = $("#LastName").val();
        var designation = $("#Designation").val();
        var email = $("#Email").val();
        var password = $("#Password").val();
        var conPassword = $("#ConfirmPassword").val();
        var roles = $("#UserRoles").val();

        if (empId === undefined || empId === null || empId === "") {
            swal("Error!", "You unable to save.Please Enter Employee Id.", "error");
            e.preventDefault();
            return $('#EmpID').focus();
        }
        if (Fname === undefined || Fname === null || Fname === "") {
            swal("Error!", "You unable to save.Please Enter Employee First Name.", "error");
            e.preventDefault();
            return $('#FirstName').focus();
        }
        if (email === undefined || email === null || email === "") {
            swal("Error!", "You unable to save.Please Enter Email Id.", "error");
            e.preventDefault();
            return $('#Email').focus();
        }
        if (password === undefined || password === null || password === "") {
            swal("Error!", "You unable to save.Please Enter Password.", "error");
            e.preventDefault();
            return $('#Password').focus();
        }
        if (conPassword === undefined || conPassword === null || conPassword === "") {
            swal("Error!", "You unable to save.Please ReEnter Password.", "error");
            e.preventDefault();
            return $('#ConfirmPassword').focus();
        }
        if (roles === undefined || roles === null || roles === "") {
            swal("Error!", "You unable to save.Please Select User Role.", "error");
            e.preventDefault();
            return $('#UserRoles').focus();
        }

        var data = $("#Registration").serialize();
        var url = 'Registration';
        $.ajax({
            type: "Post",
            cache: false,
            url: url,
            data: data,
            success: function (res) {
                if (res.Status == "OK") {
                    swal("Good Job!",res.Message, "success");
                    clearForm();
                }
                else {
                    swal({
                        title: 'Error',
                        text: "Unable to save.EmployeeID or Email Already Exist! Please Try Another",
                        type: 'error'
                    });
                }
            }
        });       
    });
});//end

// new MemberCreate
$(document).ready(function () {

    $("#btnSave_bkp").on('click', function (e) {
        var empId = $("#EmpID").val();
        var Fname = $("#FirstName").val();
        var email = $("#Email").val();
        var password = $("#Password").val();
        var enable = $("#Enabled").val();
        var roles = $("#UserRoles").val();

        if (empId === undefined || empId === null || empId === "") {
            swal("Error!", "You unable to save.Please Enter Employee Id.", "error");
            e.preventDefault();
            return $('#EmpID').focus();
        }
        if (Fname === undefined || Fname === null || Fname === "") {
            swal("Error!", "You unable to save.Please Enter Employee First Name.", "error");
            e.preventDefault();
            return $('#FirstName').focus();
        }
        if (email === undefined || email === null || email === "") {
            swal("Error!", "You unable to save.Please Enter Email Id.", "error");
            e.preventDefault();
            return $('#Email').focus();
        }
        if (password === undefined || password === null || password === "") {
            swal("Error!", "You unable to save.Please Enter Password.", "error");
            e.preventDefault();
            return $('#Password').focus();
        }
        //if (enable === undefined || enable === null || enable === "") {
        //    swal("Error!", "You unable to save.Please Enter Enable 1 Value.", "error");
        //    e.preventDefault();
        //    return $('#ConfirmPassword').focus();
        //}
        if (roles === undefined || roles === null || roles === "") {
            swal("Error!", "You unable to save.Please Select User Role.", "error");
            e.preventDefault();
            return $('#UserRoles').focus();
        }

        var data = $("#Create").serialize();

                $.ajax({
                    type: "Post",
                    url: "/Employees/Create",
                    data: data,
                }).done(function () {
                    //swal("Good Job!", "Your Registration Successful ", "success");
                    swal("Error!", "Unable to save.EmployeeID or Email Already Exist! Please Try Another", "error");
                }).fail(function () {
                    //swal("Error!", "Unable to save.EmployeeID or Email Already Exist! Please Try Another", "error");
                    swal("Good Job!", "Your Registration Successful.", "success");
                    clearForm();
                });

    });
});//end

//  form clear Method
$(document).ready(function () {
    $("#btnReset").on('click', function () {
        clearForm();
    });
});

function clearForm() {
    $("#EmpID").val("");
    $("#FirstName").val("");
    $("#LastName").val("");
    $("#Designation").val("");
    $("#Email").val("");
    $("#Password").val("");
    $("#ConfirmPassword").val("");
    $("#Enabled").val("");
    $("#UserRoles").val("");
    $("#ImagePath").val("");
}//end

