closeButtons = document.querySelectorAll('.modal-window-close');
if (window.localStorage) {
    if (!localStorage.getItem("userAgreed")) {
        document.querySelector(".modal").classList.add('active')
    } else {
        document.querySelector(".modal").classList.remove('active')
    }
}
closeButtons.forEach(function (item) {

    item.addEventListener('click', function (e) {
        var parentModal = this.closest('.modal');
        parentModal.classList.remove('active');
        localStorage.setItem("userAgreed", true);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(function () {
        document.querySelector('.site-main').classList.add('animated')
    }, 0)
});


jQuery(document).ready(function ($) {

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
                // e.preventDefault();
            }
        }
    }


    if (window.innerWidth < 1180) {
        jQuery('.mobile-nav').append(jQuery('.pll-parent-menu-item'))
    } else {
        jQuery('#primary-menu').append(jQuery('.pll-parent-menu-item'))
    }

    const siteNavigation = document.getElementById('site-navigation');
    const siteMenu = document.querySelector('.menu-toggle + div');

    // Return early if the navigation doesn't exist.
    if (!siteNavigation) {
        return;
    }

    const button = siteNavigation.getElementsByTagName('button')[0];
    $("#primary-menu li:not(.pll-parent-menu-item):not(.lang-item) a").click(
        function () {
            siteNavigation.classList.remove('toggled');
            siteMenu.classList.remove('opened');
            button.setAttribute('aria-expanded', 'false');
        }
    )
    jQuery(window).on("orientationchange", function () {
        siteNavigation.classList.remove('toggled');
        siteMenu.classList.remove('opened');
        button.setAttribute('aria-expanded', 'false');
    })
    jQuery(window).on("resize", function () {
        if (window.innerWidth < 1180) {
            jQuery('.mobile-nav').append(jQuery('.pll-parent-menu-item'))
        } else {
            jQuery('#primary-menu').append(jQuery('.pll-parent-menu-item'))
        }
    });

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
});


// email form, validation, send
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const successMessage = document.querySelector('.success-message');

    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                successMessage.classList.add("active");
                form.reset();
                form.classList.remove('_sending');
                setTimeout(function () {
                    successMessage.classList.remove('active')
                }, 4000)
            } else {
                alert('Error');
                form.classList.remove('_sending');
            }

        } else {
            // alert('Field must be filled in');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;

    }



    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    // check valid email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function isValidEmail(email) {
        // Function for checking the validity of the email address (you can develop your own logic)
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
        return emailPattern.test(email);
    }

});

const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const messageError = document.querySelector('.message-error');

function validateName() {
    const name = document.getElementById('name').value;

    if (name.length == 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if (!name.match(/^[A-Za-z ]*$/)) {
        nameError.innerHTML = 'Write only Letters';
        return false;
    }

    nameError.innerHTML = '<p class="form-icon">valid</p>';

    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value;

    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/)) {
        emailError.innerHTML = 'Email Invalid';
        return false;
    }

    emailError.innerHTML = '<p class="form-icon">valid</p>';

    return true;
}

function validateMessage() {
    const message = document.getElementById('message').value;

    if (message.length == 0) {
        messageError.innerHTML = 'Message is required';
        return false;
    } else {

        messageError.innerHTML = '<p class="form-icon">valid</p>';

        return true;
    }
}

// smooth scroll JQuery
var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});


const sidebarMenu = document.querySelectorAll('.sidebar-title');
const sidebarAnchorMenu = document.querySelectorAll('.page-with-sidebar-heading');

function mobSidebar(button){
    if (window.innerWidth < 501) {
        button.forEach(function(item){
            item.addEventListener('click', function (){
                this.classList.toggle('active');
            })
        })
    }
}

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