$(document).ready(function(){                              
    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
       
        // handle events
        if(!$('#ajax-contact input[type="checkbox"]').is(':checked')){
            alert("Please select at least one event.");
            return false;
        }
               
        // handle empty email 
        if( !$('#txtEmail').val() ){
            $('#txtEmail').val('no-reply@mathieujennifer.com');
        }

        $(formMessages).html('<div class="notification info>Loading...</div>'); 
        $('#submitBtn').hide();
        $('#contactForm form').hide();
        
        // Serialize the form data.
        var formData = $(form).serialize();
        
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData,
            beforeSend: function() {
                $(formMessages).html('<div class="notification info">Loading...</div>')
            }, 
            success: function(data){
                $(formMessages).html('<div class="notification success">Thank you. Your place is reserved !</div>') ;                
            }
        })
        .fail(function(data) {
            $(formMessages).html('<div class="notification error>An error has occured and your message wasnt sent</div>');
        });

    });
});
