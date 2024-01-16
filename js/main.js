closeButtons = document.querySelectorAll('.modal-window-close');
if (window.localStorage) {
    if (!localStorage.getItem("userAgreed")) {
        document.querySelector(".modal").classList.add('active')
    } else {
        document.querySelector(".modal").classList.remove('active')
    }
}
closeButtons.forEach(function(item){

    item.addEventListener('click', function(e) {
        var parentModal = this.closest('.modal');
        parentModal.classList.remove('active');
        localStorage.setItem("userAgreed", true);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(function (){
        document.querySelector('.site-main').classList.add('animated')
    }, 0)

    mobSidebar(sidebarMenu);
    mobSidebar(sidebarAnchorMenu);

    window.addEventListener('resize orientationchange',function (){
        mobSidebar(sidebarMenu);
        mobSidebar(sidebarAnchorMenu);
    });
});

jQuery(document).ready(function($){

    // Behavior smooth when click menu
    const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }


    if (window.innerWidth < 1180) {
        jQuery('.mobile-nav').append(jQuery('.pll-parent-menu-item'))
    } else {
        jQuery('#primary-menu').append(jQuery('.pll-parent-menu-item'))
    }

    const siteNavigation = document.getElementById( 'site-navigation' );
    const siteMenu = document.querySelector( '.menu-toggle + div' );

    // Return early if the navigation doesn't exist.
    if ( ! siteNavigation ) {
        return;
    }

    const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];
    $("#primary-menu li:not(.pll-parent-menu-item):not(.lang-item) a").click(
        function () {
            siteNavigation.classList.remove( 'toggled' );
            siteMenu.classList.remove( 'opened' );
            button.setAttribute( 'aria-expanded', 'false' );
        }
    )
    jQuery( window ).on( "orientationchange",function () {
        siteNavigation.classList.remove( 'toggled' );
        siteMenu.classList.remove( 'opened' );
        button.setAttribute( 'aria-expanded', 'false' );
    })
    jQuery( window ).on( "resize", function() {
        if (window.innerWidth < 1180) {
            jQuery('.mobile-nav').append(jQuery('.pll-parent-menu-item'))
        } else {
            jQuery('#primary-menu').append(jQuery('.pll-parent-menu-item'))
        }
    } );

    jQuery('.pll-parent-menu-item').on('click', function (e) {
        // Turn the "focus" class on or off on each click
        jQuery(this).toggleClass('focus');
        e.stopPropagation(); // Stop spreading the event
    });

    // We are adding a click handler for everyone .sub-menu
    jQuery('.sub-menu').on('click', function (e) {
        e.stopPropagation(); // Stop spreading the event
    });

    // Add a click handler for the entire page
    jQuery(document).on('click', function () {
        // Remove the "focus" class from all elements .pll-parent-menu-item
        jQuery('.pll-parent-menu-item').removeClass('focus');
    });


    $('.contacts-form__btn').click(function(event) {
        event.preventDefault();
        var isValid = true;

        $('.contacts-form-field').removeClass('error');
        $('.contacts-form__error').text('');

        if ($('#name').val() === '') {
            $('#name').addClass('error');
            $('#name').siblings('.contacts-form__error').text($('#name').data('empty')).show();
            isValid = false;
        } else if (!/^[A-Za-zА-Яа-яЁёіїІЇҐґ\s-ØøÅåÆæ]*$/.test($('#name').val())) {
            $('#name').addClass('error');
            $('#name').siblings('.contacts-form__error').text($('#name').data('digits')).show();
            isValid = false;
        } else {
            $('#name').removeClass('error');
        }

        if ($('#email').val() === '') {
            $('#email').addClass('error');
            $('#email').siblings('.contacts-form__error').text($('#email').data('empty')).show();
            isValid = false;
        } else if (!isValidEmail($('#email').val())) {
            $('#email').addClass('error');
            $('#email').siblings('.contacts-form__error').text($('#email').data('valid')).show();
            isValid = false;
        } else {
            $('#email').removeClass('error');
        }

        if ($('#message').val() === '') {
            $('#message').addClass('error');
            $('#message').siblings('.contacts-form__error').text($('#message').data('empty')).show();
            isValid = false;
        } else {
            $('#message').removeClass('error');
        }

        // If the form has passed validation, you can send the data
        if (isValid) {
            // Your code to submit the form with AJAX
            //
            // If there are no errors, we send the given form
            var formData = $(this).serialize();
            var form = $(this).closest('form');
            var actUrl = form.attr('action');

            $.ajax({
                type: "post",
                url: actUrl, // Replace this with the URL of your server script
                data: formData,
                dataType: "html",
                success: function(response) {
                    if (response.success) {
                        // The form was sent successfully, we can do anything
                        $(".success-message").addClass("active");
                        $('.contacts-form')[0].reset();
                        setTimeout(function (){
                            $(".success-message").removeClass('active')
                        }, 2000)
                    } else {
                        // display validation errors
                        var validationErrors = response.errors;
                        for (var key in validationErrors) {
                            $("#" + key).closest('.contacts-form__item').addClass('error');
                            $("#" + key).siblings('.contacts-form__error').text(validationErrors[key]).show();
                        }
                    }
                },
                error: function(xhr, status, error) {
                    // error occurred when sending the request
                    $("#formResponse").html("Error: " + error);
                },
            });
        }
    });

    function isValidEmail(email) {
        // Function for checking the validity of the email address (you can develop your own logic)
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

});
