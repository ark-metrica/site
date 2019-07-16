// taken from https://gist.github.com/willpatera/ee41ae374d3c9839c2d6
// thanks will
// TODO: switch to formvalidation.io
$(document).ready(function() {
    $('#email-form').bootstrapValidator({
        //submitButtons: '#postForm',
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later     
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            },

        }
    })
    .on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        var url = 'https://script.google.com/macros/s/AKfycbxT1WBsvFk0JU5b4JaiNzoIQYw1tVwApT2FsQYNJ7meMX7DvptN/exec';
        //var redirectUrl = 'success-page.html';
        var redirectUrl = 'index.html';
        // show the loading 
        $('#postForm').prepend($('<span></span>');
        var jqxhr = $.post(url, $form.serialize(), function(data) {
            console.log("Success! Data: " + data.statusText);
            $(location).attr('href',redirectUrl);
        })
            .fail(function(data) {
                console.warn("Error! Data: " + data.statusText);
                // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
                if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                    //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
                    $(location).attr('href',redirectUrl);                
                }
            });
    });
});
