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

// -----------------  Language  ------------------
let el = $('.switch');
let cur = el.find('.current');
let options = el.find('.options li');
let content = $('#content');

// Open language dropdown panel

el.on('click', function(e) {
  el.addClass('show-options');
  
  setTimeout(function() {
    el.addClass('anim-options');
  }, 50);
  
  setTimeout(function() {
    el.addClass('show-shadow');
  }, 200);
});


// Close language dropdown panel

options.on('click', function(e) {
  e.stopPropagation();
  el.removeClass('anim-options');
  el.removeClass('show-shadow');
  
  let newLang = $(this).data('lang');
  
  cur.find('span').text(newLang);
  content.attr('class', newLang);
  
  setLang(newLang);
  
  options.removeClass('selected');
  $(this).addClass('selected');
  
  setTimeout(function() {
    el.removeClass('show-options');
  }, 600);
});


// Save selected options into Local Storage

function getLang() {
  let lang;
  if (localStorage.getItem('currentLang') === null) {
    lang = cur.find('span').text();
  } else {
    lang = JSON.parse(localStorage.getItem('currentLang')).toLowerCase();
  }
  
  // console.log(lang);

  cur.find('span').text(lang);
  options.parent().find(`li[data-lang="${lang}"]`).addClass('selected');
  
  content.attr('class', lang);
}

getLang();

function setLang(newLang) {
    localStorage.setItem('currentLang', JSON.stringify(newLang).toLowerCase());
  
  content.attr('class', newLang);
  
  // console.log('New language is: ' + newLang);
}


// ------------ Lang-translate --------------
const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ru", "en", "se", "pt", "ar"];
const currentPathName = window.location.pathname;
let currentLang =
	localStorage.getItem("language") || checkBrowserLang() || "en";
let currentTexts = {};

const homeTexts = {
    "home_page-advantages": {
		en: "advantages",
		ru: "преимущества",
		pt: "vantagens",
		ar: "مزايا",
		es: "ventajas",
	},
    "home_page-terms": {
		en: "Terms & Conditions",
		ru: "Правила и условия",
		pt: "Termos e Condições",
		ar: "الأحكام والشروط",
		es: "Términos y Condiciones",
	},
    "home_page-faq": {
		en: "faq",
		ru: "faq",
		pt: "faq",
		ar: "التعليمات",
		es: "Preguntas Frecuentes",
	},
    "home_page-instructions": {
		en: "Instructions",
		ru: "Инструкции",
		pt: "Instruções",
		ar: "تعليمات",
		es: "Instrucciones",
	},
    "home_page-contacts": {
		en: "Contact Us",
		ru: "Контакты",
		pt: "Contacte-nos",
		ar: "اتصل بنا",
		es: "Contáctenos",
	},
    "home_page-singUp": {
		en: "Sign up",
		ru: "Регистрация",
		pt: "Registar",
		ar: "اشتراك",
		es: "Registrarse",
	},
    "home_page-logIn": {
		en: "Log in",
		ru: "Вход",
		pt: "Login",
		ar: "تسجيل الدخول",
		es: "Iniciar sesión",
	},
	"home_page-h1": {
		en: "№1 Affiliate Program",
		ru: "Партнерская программа №1",
		pt: "Programa de Afiliados Nº1",
		ar: "برنامج الانتساب رقم 1 ",
		es: "Programa de Afiliados N°1",
	},
    "home_page-h2": {
		en: "Level up your profit with us!",
		ru: "Увеличьте свои доходы с нами!",
		pt: "Aumente os seus lucros connosco!",
		ar: "ارفع مستوى أرباحك معنا",
		es: "¡Aumente sus ganancias con nosotros!",
	},
    "home_page-joinBtn": {
		en: "Join us now",
		ru: "Приcоединиться",
		pt: "Junte-se a nós agora mesmo",
		ar: "انضم إلينا الآن",
		es: "Únase ahora",
	},
    "home_page-partners": {
		en: "Partners ",
		ru: "Партнеров",
		pt: "de parceiros",
		ar: "ألف شريك",
		es: "Socios",
	},
    "home_page-players": {
		en: "Players",
		ru: "игроков",
		pt: "de jogadores",
		ar: "لاعب",
		es: "de jugadores",
	},
    "home_page-payment": {
		en: "Payment methods",
		ru: "Способов вывода",
		pt: "métodos de pagamento",
		ar: "طريقة دفع",
		es: "Métodos de Pago",
	},
    "home_page-languages": {
		en: "Languages",
		ru: "Языков",
		pt: "línguas",
		ar: "لغة",
		es: "Idiomas",
	},
    "home_page-multiplatform": {
		en: "Multiplatform",
		ru: "Мультиплатформа",
		pt: "Multiplataforma",
		ar: "منصة متعددة",
		es: "Multiplataforma",
	},
    "home_page-partnership": {
		en: "Partnership Opportunities",
		ru: "Возможности партнерства",
		pt: "Oportunidades de parceria",
		ar: "فرص الشراكة",
		es: "Oportunidades de asociación",
	},
    "home_page-collaborates": {
		en: "1XBET COLLABORATES WITH DIFFERENT TRAFFIC ACQUISITION MODELS, INCLUDING CPA, HYBRID, AND REVSHARE.BUT THAT'S NOT ALL...",
		ru: "1XBET СОТРУДНИЧАЕТ С РАЗЛИЧНЫМИ МОДЕЛЯМИ ПРИОБРЕТЕНИЯ ТРАФИКА, ВКЛЮЧАЯ CPA, HYBRID И REVSHARE. НО ЭТО ЕЩЕ НЕ ВСЕ...",
		pt: "A 1XBET COLABORA COM DIFERENTES MODELOS DE AQUISIÇÃO DE TRÁFEGO, INCLUINDO CPA, HÍBRIDO E REVSHARE. MAS ISSO NÃO É TUDO...",
		ar: "تتعاون 1XBET مع نماذج مختلفة لاكتساب حركة المرور، بما في ذلك CPA و Hybrid و RevShare. ولكن هذا ليس كل شيء...",
		es: "1XBET COLABORA CON DIFERENTES MODELOS DE ADQUISICIÓN DE TRÁFICO, INCLUIDOS CPA, HÍBRIDO Y REVSHARE. PERO ESO NO ES TODO...",
	},
    "home_page-revshare": {
		en: "Revshare",
		ru: "RevShare",
		pt: "RevShare",
		ar: "RevShare",
		es: "RevShare",
	},
    "home_page-traffic": {
		en: "Web Traffic Optimization",
		ru: "Оптимизация веб-трафика",
		pt: "Otimização do tráfego web",
		ar: "تحسين حركة المرور على الويب",
		es: "Optimización del tráfico web",
	},
    "home_page-mobTraffic": {
		en: "Mobile Traffic Advantage",
		ru: "Преимущество мобильного трафика",
		pt: "Vantagem do tráfego móvel",
		ar: "ميزة حركة المرور على الهاتف المحمول",
		es: "Ventaja del tráfico móvil",
	},
    "home_page-subAffiliate": {
		en: "SUB-AFFILIATE ADDITIONAL COMMISSION",
		ru: "Дополнительная комиссия для субаффилиатов",
		pt: "Comissão adicional para subafiliados",
		ar: "عمولة إضافية للشركاء الفرعيين",
		es: "Comisión adicional para subafiliados",
	},
    "home_page-learnMore": {
		en: "WANT TO LEARN MORE? GET IN TOUCH WITH US!",
		ru: "ХОТИТЕ УЗНАТЬ БОЛЬШЕ? СВЯЖИСЬ С НАМИ!",
		pt: "QUER SABER MAIS? ENTRE EM CONTATO CONOSCO!",
		ar: "تريد معرفة المزيد؟ ابق على تواصل معنا!",
		es: "¿QUERER APRENDER MÁS? ¡PÓNGASE EN CONTACTO CON NOSOTROS!",
	},
    "home_page-joinBtn2": {
		en: "Join us now",
		ru: "Приcоединиться",
		pt: "Junte-se a nós agora mesmo",
		ar: "انضم إلينا الآن",
		es: "Únase ahora",
	},
    "home_page-ourAdvantages": {
		en: "Our Advantages",
		ru: "Наши Преимущества",
		pt: "As nossas vantagens",
		ar: "إيجابياتنا",
		es: "Nuestras Ventajas",
	},
    "home_page-conversion": {
		en: "High conversion rate",
		ru: "Высокий уровень конверсии",
		pt: "Elevada taxa de conversão",
		ar: "ارتفاع معدل التحويل",
		es: "Altas tasas de conversión",
	},
    "home_page-conversionRate": {
		en: "Top conversion rate of registrations to deposits",
		ru: "Наивысший показатель конверсии от регистрации к депозиту",
		pt: "Grande taxa de conversão de registos para depósitos",
		ar: "أعلى معدل تحويل التسجيلات إلى الودائع",
		es: "Óptimas tasas de conversión de registros a depósitos",
	},
    "home_page-commission": {
		en: "Profitable commission",
		ru: "Выгодная комиссия",
		pt: "Comissão lucrável",
		ar: "عمولة مربحة",
		es: "Comisiones rentables",
	},
    "home_page-commissionUp": {
		en: "Get a lifetime commission of up to 40%",
		ru: "Получайте пожизненную комиссию до 40%",
		pt: "Obtenha uma comissão vitalícia de até 40%",
		ar: "احصل على عمولة مدى الحياة تصل إلى 40٪",
		es: "Obtenga una comisión de por vida de hasta el 40%",
	},
    "home_page-payme": {
		en: "Weekly payments",
		ru: "Еженедельные выплаты",
		pt: "Pagamentos semanais",
		ar: "المدفوعات الأسبوعية",
		es: "Pagos semanales",
	},
    "home_page-payme30": {
		en: "Automated weekly payments from only $30",
		ru: "Автоматизированные еженедельные выплаты от всего $30",
		pt: "Pagamentos semanais automáticos a partir de apenas $30",
		ar: "المدفوعات الأسبوعية الآلية من 30 دولارًا فقط",
		es: "Pagos semanales automatizados desde solo 30$",
	},
    "home_page-promoMaterials": {
		en: "Exclusive promo materials",
		ru: "Эксклюзивные промо-материалы",
		pt: "Materiais promocionais exclusivos",
		ar: "مواد ترويجية حصرية",
		es: "Material promocional exclusivo",
	},
    "home_page-largeSelection": {
		en: "Large selection of banners adapted for each geo",
		ru: "Большой выбор баннеров, адаптированных для каждого ГЕО",
		pt: "Ampla seleção de banners adaptados a cada zona geográfica",
		ar: "مجموعة كبيرة من اللافتات تتكيف مع كل منطقة جغرافية",
		es: "Amplia selección de banners adaptados a cada localización",
	},
    "home_page-personalManager": {
		en: "Personal manager",
		ru: "Личный менеджер",
		pt: "Gestor pessoal",
		ar: "مدير شخصي",
		es: "Mánager Personal",
	},
    "home_page-assistance": {
		en: "Assistance on every matter including your marketing strategy ",
		ru: "Помощь во всех вопросах, включая вашу маркетинговую стратегию",
		pt: "Assistência em qualquer assunto incluindo a sua estratégia de marketing",
		ar: "المساعدة في كل الأمور بما في ذلك استراتيجية التسويق الخاصة بك",
		es: "Asistencia en todas las áreas, incluyendo estrategia de marketing",
	},
    "home_page-uniquePromo": {
		en: "Unique promo codes",
		ru: "Уникальные промо-коды",
		pt: "Códigos promocionais únicos",
		ar: "رموز ترويجية فريدة",
		es: "Códigos promocionales especiales",
	},
    "home_page-specialPromo": {
		en: "Special promo codes allow attracting new players without links",
		ru: "Специальные промо-коды позволяют привлекать новых игроков без ссылок",
		pt: "Códigos promocionais especiais permitem atrair novos jogadores sem links",
		ar: "تسمح الرموز الترويجية الخاصة بجذب لاعبين جدد بدون روابط",
		es: "Códigos promocionales exclusivos que permiten atraer a nuevos jugadores sin enlaces",
	},
    "home_page-integration": {
		en: "Quick S2S integration",
		ru: "Быстрая интеграция",
		pt: "Rápida integração S2S",
		ar: "تكامل سريع S2S",
		es: "Rápida Integración S2S",
	},
    "home_page-postback": {
		en: "Postback and API integration allow detailed tracking of traffic and sport events",
		ru: "Интеграция с помощью Postback и API позволяет детально отслеживать трафик и спортивные события",
		pt: "Integração postback e API permitem deteção detalhada de tráfego e eventos desportivos",
		ar: "يسمح تكامل إعادة النشر وواجهة برمجة التطبيقات بتتبع مفصل لحركة المرور والأحداث الرياضية",
		es: "Postback e integración API para un seguimiento exhaustivo del tráfico y los eventos deportivos ",
	},
    "home_page-deals": {
		en: "Exclusive deals",
		ru: "Эксклюзивные предложения",
		pt: "Negócios exclusivos",
		ar: "صفقات حصرية",
		es: "Acuerdos exclusivos",
	},
    "home_page-weValue": {
		en: "We value our partners and offer tailored solutions for better performance",
		ru: "Мы ценим наших партнеров и предлагаем индивидуальные условия для максимальной выгоды",
		pt: "Valorizamos os nossos parceiros e oferecemos soluções personalizadas para um melhor desempenho",
		ar: "نحن نقدر شركائنا ونقدم حلولًا مخصصة لتحقيق أداء أفضل",
		es: "Valoramos a nuestros socios y ofrecemos soluciones a medida para un mejor rendimiento",
	},
    "home_page-become": {
		en: "Become a 1xBet partner - Work with the leading betting product!",
		ru: "Станьте партнером 1xBet - работайте с ведущим продуктом в области ставок!",
		pt: "Torne-se num parceiro 1xBet - Trabalhe com o produto de apostas líder!",
		ar: "كن شريكًا في 1xBet - اعمل مع منتج الرهان الرائد!",
		es: "Hágase socio de 1xBet- ¡Trabaje con un producto de apuestas líder!",
	},
    "home_page-joinBtn3": {
		en: "Join us now",
		ru: "Приcоединиться",
		pt: "Junte-se a nós agora mesmo",
		ar: "انضم إلينا الآن",
		es: "Únase ahora",
	},
    "home_page-faqSection": {
		en: "FAQ",
		ru: "FAQ",
		pt: "FAQ",
		ar: "التعليمات",
		es: "Preguntas Frecuentes",
	},
    "home_page-faq-h3-1": {
		en: "What traffic sources do you accept?",
		ru: "Какие источники трафика вы принимаете?",
		pt: "Que fontes de tráfego aceitam?",
		ar: "ما هي مصادر حركة المرور التي تقبلها؟",
		es: "¿Qué fuentes de tráfico aceptan?",
	},
    "home_page-faq-p-1": {
		en: "The 1xBet affiliate program accepts any traffic sources except for those that violate the company's intellectual property, incentivized traffic, and fraudulent traffic.",
		ru: "Партнёрская программа 1xBet принимает любые источники трафика, кроме трафика, нарушающего интеллектуальную собственность компании, мотивированного трафика и фрода.",
		pt: "O programa de afiliados da 1xBet aceita quaisquer fontes de tráfego, exceto aquelas que violam a propriedade intelectual da empresa, tráfego incentivado e tráfego fraudulento.",
		ar: "يقبل البرنامج التابع 1xBet أي مصادر حركة مرور باستثناء تلك التي تنتهك الملكية الفكرية للشركة وحركة المرور المحفزة وحركة المرور الاحتيالية.",
		es: "El programa de afiliados de 1xBet acepta cualquier fuente de tráfico, excepto aquellas que violen la propiedad intelectual de la compañía, tráfico incentivado y tráfico fraudulento.",
	},
    "home_page-faq-h3-2": {
		en: "What is the minimum payout?",
		ru: "Какая минимальная выплата?",
		pt: "Qual o pagamento mínimo?",
		ar: "ما هو الحد الأدنى للدفع؟",
		es: "¿Cuál es el pago mínimo?",
	},
    "home_page-faq-p-2": {
		en: "Reach $30 in order to withdraw funds from your affiliate account.",
		ru: "Достаточно набрать 30$, чтобы вывести средства.",
		pt: "Terá que alcançar $30 para retirar fundos da conta de afiliado.",
		ar: "قم بالوصول إلى 30 دولارًا لسحب الأموال من حسابك التابع.",
		es: "Debe alcanzar los 30 USD para poder retirar fondos de su cuenta de afiliado",
	},
    "home_page-faq-h3-3": {
		en: "How can I withdraw my money?",
		ru: "Как я могу вывести деньги?",
		pt: "Como posso levantar o meu dinheiro?",
		ar: "كيف يمكنني سحب أموالي؟",
		es: "¿Cómo puedo retirar mi dinero?",
	},
    "home_page-faq-p-3": {
		en: "You can use one of the payment systems offered by the 1xPartners affiliate program, which you can choose during registration. The main ones are Neteller, Webmoney, and Skrill. You can also use a variety of cryptocurrency withdrawal methods and receive commission payments via bank transfer. In addition, you can automatically receive payments to your player account, from where you can withdraw them using one of over 200 withdrawal methods available in more than 50 countries.",
		ru: "Вы можете воспользоваться одной из платежных систем партнерской программы 1xPartners, выбрав ее при регистрации. Основные из них: Neteller, Webmoney,и Skrill. Также вы можете использовать множество способов вывода криптовалют и выплаты комиссии через бакновский перевод. Помимо этого, можно автоматически получать выплаты на игровой счет, откуда их можно вывести одним из 200 способов вывода в более чем 50 странах.",
		pt: "Pode utilizar um dos sistemas de pagamento oferecidos pelo programa de afiliados da 1xPartners que pode escolher durante o registo. Os principais são Neteller, Webmoney e Skrill. Também pode utilizar uma variedade de métodos de levantamento de criptomoeda e receber pagamentos de comissão através de transferência bancária. Para além disso, pode receber automaticamente pagamentos na sua conta de jogador, a partir da qual pode fazer levantamentos através de mais de 200 métodos disponíveis em mais de 50 países.",
		ar: "يمكنك استخدام أحد أنظمة الدفع التي يقدمها برنامج الشراكة 1xPartners ، والتي يمكنك اختيارها أثناء التسجيل. أهمها Neteller و Webmoney و Skrill. يمكنك أيضًا استخدام مجموعة متنوعة من طرق سحب العملات المشفرة وتلقي مدفوعات العمولات عبر التحويل المصرفي. بالإضافة إلى ذلك ، يمكنك تلقي المدفوعات تلقائيًا إلى حساب اللاعب الخاص بك ، حيث يمكنك سحبها باستخدام واحدة من أكثر من 200 طريقة سحب متاحة في أكثر من 50 دولة.",
		es: "Puede utilizar uno de los sistemas de pago ofrecidos por el programa de afiliados 1xPartners, que puede elegir durante el registro. Los principales son Neteller, Webmoney y Skrill. También puede utilizar una variedad de métodos de retiro de criptomonedas y recibir pagos de comisiones a través de transferencia bancaria. Además, puede recibir pagos automáticamente en su cuenta de jugador, desde donde puede retirarlos utilizando uno de los más de 200 métodos disponibles en más de 50 países.",
	},
    "home_page-contactsSection-text": {
		en: "If you have questions, you are welcome to contact us",
		ru: "Если у вас есть вопросы, вы можете связаться с нами",
		pt: "Se tiver dúvidas, não hesite em entrar em contacto connosco",
		ar: "إذا كانت لديك أسئلة ، فنحن نرحب بك للاتصال بنا",
		es: "Si tiene alguna pregunta, póngase en contacto con nosotros",
	},
    "home_page-contactsSection": {
		en: "CONTACTS",
		ru: "КОНТАКТЫ",
		pt: "CONTATOS",
		ar: "جهات الاتصال",
		es: "CONTACTOS",
	},
    "home_page-sendFormBtn": {
		en: "Send Message",
		ru: "Отправить сообщение",
		pt: "Enviar mensagem",
		ar: "أرسل رسالة",
		es: "Enviar mensaje",
	},
    "home_page-terms2": {
		en: "Terms and Conditions",
		ru: "Правила и условия",
		pt: "Termos e Condições",
		ar: "الأحكام والشروط",
		es: "Términos y Condiciones",
	},
    "home_page-policy": {
		en: "Privacy Policy",
		ru: "Политика Приватности",
		pt: "Política de Privacidade",
		ar: "سياسة الخصوصية",
		es: "Política de Privacidad",
	},
    "home_page-cookies": {
		en: "Partners-1xBet Partners-1xBet may use cookies to store your details and collect information to optimize the site and tailor our marketing to your permissions and to suit your interests. By continuing to use the site you consent to the use of cookies.",
		ru: "Partners-1xBet Partners-1xBet может использовать файлы cookie для хранения ваших данных и сбора информации для оптимизации сайта и адаптации нашего маркетинга к вашим разрешениям и вашим интересам. Продолжая использовать сайт, вы соглашаетесь на использование файлов cookie.",
		pt: "Partners-1xBet Partners-1xBet pode usar cookies para armazenar seus dados e coletar informações para otimizar o site e adaptar nosso marketing às suas permissões e aos seus interesses. Ao continuar a utilizar o site você concorda com o uso de cookies.",
		ar: "1قد يستخدم Partners-1xBet Partners-1xBet ملفات تعريف الارتباط لتخزين التفاصيل الخاصة بك وجمع المعلومات لتحسين الموقع وتخصيص تسويقنا وفقًا لأذوناتك وبما يتناسب مع اهتماماتك. من خلال الاستمرار في استخدام الموقع فإنك توافق على استخدام ملفات تعريف الارتباط.",
		es: "Partners-1xBet Partners-1xBet puede utilizar cookies para almacenar sus datos y recopilar información para optimizar el sitio y adaptar nuestro marketing a sus permisos y a sus intereses. Al continuar utilizando el sitio, usted acepta el uso de cookies.",
	},
    "home_page-cookiesMore": {
		en: "Find out more cookies",
		ru: "Узнайте больше файлов cookies",
		pt: "Descubra mais biscoitos",
		ar: "اكتشف المزيد من ملفات تعريف الارتباط",
		es: "Descubra más cookies",
	},
    "home_page-co": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    
};
const termsTexts = {
    "terms_page-advantages": {
		en: "advantages",
		ru: "преимущества",
		pt: "vantagens",
		ar: "مزايا",
		es: "ventajas",
	},
    "terms_page-terms": {
		en: "Terms & Conditions",
		ru: "Правила и условия",
		pt: "Termos e Condições",
		ar: "الأحكام والشروط",
		es: "Términos y Condiciones",
	},
    "terms_page-faq": {
		en: "faq",
		ru: "faq",
		pt: "faq",
		ar: "التعليمات",
		es: "Preguntas Frecuentes",
	},
    "terms_page-instructions": {
		en: "Instructions",
		ru: "Инструкции",
		pt: "Instruções",
		ar: "تعليمات",
		es: "Instrucciones",
	},
    "terms_page-contacts": {
		en: "Contact Us",
		ru: "Контакты",
		pt: "Contacte-nos",
		ar: "اتصل بنا",
		es: "Contáctenos",
	},
    "terms_page-singUp": {
		en: "Sign up",
		ru: "Регистрация",
		pt: "Registar",
		ar: "اشتراك",
		es: "Registrarse",
	},
    "terms_page-logIn": {
		en: "Log in",
		ru: "Вход",
		pt: "Login",
		ar: "تسجيل الدخول",
		es: "Iniciar sesión",
	},
	"terms_page-title": {
		en: "Terms and Conditions",
		ru: "Правила и условия ",
		pt: "Termos e Condições",
		ar: "الأحكام والشروط",
		es: "Términos y Condiciones",
	},
    "terms_page-partnership": {
		en: "PARTNERSHIP AGREEMENT (HEREINAFTER REFERRED TO AS AGREEMENT) GENERAL DEFINITIONS",
		ru: "Партнёрское соглашение (Правила и условия) Общие определения",
		pt: "CONTRATO DE PARCERIA (DORAVANTE REFERIDO COMO CONTRATO) DEFINIÇÕES GERAIS",
		ar: "تعاريف عامة (سيشار إليها فيما بعد باسم اتفاقية) اتفاقية الشراكة",
		es: "ACUERDO DE ASOCIACIÓN (EN LO SUCESIVO DENOMINADO COMO ACUERDO) DEFINICIONES GENERALES",
	},
    "terms_page-bettingCompany": {
		en: "Betting company is Internet resource 1xBet (hereinafter referred to as “Company”), where users are offered online betting facilities.",
		ru: "Букмекерская компания – интернет-ресурс 1xBet (далее Компания), где пользователям предлагается возможность делать ставки на события в онлайн-режиме.",
		pt: "A Empresa de apostas é um meio de Internet da 1xBet (doravante denominada 'Empresa') em que são oferecidos aos usuários serviços de apostas on-line.",
		ar: "شركة الرهان هي مورد الإنترنت 1xBet (سيشار إليها فيما بعد باسم 'الشركة') حيث يتم تقديم تسهيلات للمراهنة عبر الإنترنت للمستخدمين.",
		es: "La empresa de apuestas es el recurso de Internet 1xBet (en lo sucesivo, la “Empresa”), en el que se ofrecen a los usuarios servicios de apuestas online.",
	},
    "terms_page-mainBrand": {
		en: "Main brand of the Company is a set of components that distinguish the Company from the rest, making it easily recognizable among users. The main brand of the Company (hereinafter referred to as the Company’s Brand) for this Affiliate Program is 1xBet.",
		ru: "Основной бренд Компании – набор составляющих, которые отличают Компанию от остальных, делая ее легко узнаваемой среди пользователей. Основным брендом Компании (далее Бренд Компании) данной Партнёрской Программы является 1xBet.",
		pt: "A marca principal da Empresa é um conjunto de componentes que distinguem a Empresa das demais, tornando-a facilmente reconhecível entre os usuários. A 1xBet é a marca principal da Empresa (doravante referida como a Marca da Empresa) para esse Programa de Afiliados.",
		ar: "العلامة التجارية الرئيسية للشركة هي مجموعة من المكونات التي تميز الشركة عن غيرها مما يسهل على المستخدمين التعرف عليها. العلامة التجارية الرئيسية للشركة (المشار إليها فيما بعد باسم العلامة التجارية للشركة) لبرنامج التسويق بالعمولة هي ‎1xBet.",
		es: "La marca principal de la Empresa es un conjunto de componentes que distinguen a la Empresa del resto, haciéndola fácilmente reconocible entre los usuarios. La marca principal de la Empresa (en lo sucesivo, la Marca de la Empresa) para este Programa de afiliados es 1xBet.",
	},
    "terms_page-websiteOrResource": {
		en: "Website or resource of the Company (hereinafter also referred to as 1xBet) is one or more websites of the Company containing in full or in part the Company’s Brand in a domain name.",
		ru: "Сайт или ресурс Компании (далее также 1xBet) – один или несколько сайтов Компании, содержащие в доменном имени полностью или частично Бренд Компании.",
		pt: "‎ O site ou recurso da Empresa (doravante também referida como 1xBet) é um ou mais sites da Empresa contendo a Marca da Empresa, no todo ou em parte do nome de domínio.",
		ar: "الموقع الإلكتروني أو مورد الشركة (المشار إليه فيما بعد أيضًا باسم ‎1xBet) هو موقع إلكتروني واحد أو أكثر للشركة يحتوي كليًا أو جزئيًا على العلامة التجارية للشركة في مجال الإنترنت.",
		es: "El sitio web o recurso de la Empresa (en adelante, también denominado 1xBet) es uno o más sitios web de la Empresa que contienen total o parcialmente la Marca de la Empresa en un nombre de dominio.",
	},
    "terms_page-companyProducts": {
		en: "Company’s Products are the service or a set of services offered to the users on the Company's resources.",
		ru: "Продукты Компании – услуга или набор услуг, предлагаемых пользователям на ресурсах Компании.",
		pt: "Os Produtos da Empresa são um serviço ou conjunto de serviços oferecidos aos usuários nos recursos da Empresa.",
		ar: "منتجات الشركة هي خدمة أو مجموعة خدمات مقدمة للمستخدمين على موارد الشركة.",
		es: "Los Productos de la Empresa son el servicio o el conjunto de servicios ofrecidos a los usuarios en los recursos de la Empresa.",
	},
    "terms_page-affiliateProgram": {
		en: "Affiliate Program is a type of cooperation between the Company and the Affiliate, which is implemented through the Company's resources, in particular 1xpartners.com, in which the Affiliate using its resource or resources may advertise the services of the Company and receive remuneration in return. The basic principles of this type of cooperation are set out below and shall be deemed accepted by the Affiliate from the moment of its registration in the Affiliate Program on 1xpartners.com.",
		ru: "Партнёрская Программа – вид сотрудничества между Компанией и Партнёром, реализуемый через ресурсы Компании, в частности 1xPartners.com, в рамках которого Партнёр с помощью своего ресурса или ресурсов может рекламировать услуги Компании и получать за это вознаграждение. Базовые принципы этого вида сотрудничества изложены ниже и считаются принятыми Партнёром с момента его регистрации в Партнёрской Программе на 1xPartners.com.",
		pt: "O Programa de Afiliados é um tipo de cooperação entre a Empresa e o Afiliado, que é implementado por meio dos recursos da Empresa, em particular 1xpartners.com, em que o Afiliado, utilizando seu próprio recurso ou recursos, pode anunciar os serviços da Empresa e receber remuneração em troca. Os princípios básicos desse tipo de cooperação estão expostos abaixo e serão considerados aceitos pelo Afiliado a partir do momento de sua inscrição no Programa de Afiliados em 1xpartners.com.",
		ar: "برنامج التسويق بالعمولة هو نوع من التعاون بين الشركة والمسوق بالعمولة يتم تنفيذه من خلال موارد الشركة ولا سيما 1xPartners.com، حيث يمكن للشريك الذي يستخدم مواردها الإعلان عن خدمات الشركة والحصول على مكافأة في المقابل. تم تحديد المبادئ الأساسية لهذا النوع من التعاون أدناه وتعتبر مقبولة من قبل المسوق بالعمولة منذ لحظة تسجيله في برنامج الشراكة على 1xPartners.com.",
		es: "El Programa de afiliados es un tipo de cooperación entre la Empresa y el Afiliado, que se implementa a través de los recursos de la Empresa, en particular 1xpartners.com, en el que el Afiliado que utiliza su recurso o recursos puede publicitar los servicios de la Empresa y recibir una remuneración a cambio. Los principios básicos de este tipo de cooperación se establecen a continuación y se considerarán aceptados por el Afiliado desde el momento de su registro en el Programa de Afiliados en 1xpartners.com.",
	},
    "terms_page-webmaster": {
		en: "Affiliate is a webmaster (individual or legal entity) who fulfills the conditions of the Affiliate Program on 1xpartners.com, the main purpose of which as part of the Affiliate Program is to attract New users to the Company's resource, as well as promote its products.",
		ru: "Партнёр – веб-мастер (физическое или юридическое лицо), выполняющий условия Партнёрской Программы на сайте 1xPartners.com, основной целью которого в рамках Партнёрской Программы является привлечение Новых пользователей на ресурс Компании, а также продвижение ее продуктов.",
		pt: "O Afiliado é um webmaster (pessoa física ou jurídica) que cumpre as condições do Programa de Afiliados em 1xpartners.com, cujo principal objetivo como parte do Programa de Afiliados é atrair novos usuários para o recurso da Empresa, bem como promover seus produtos.",
		ar: "المسوق بالعمولة هو مدير موقع (فرد أو كيان قانوني) يفي بشروط برنامج التسويق بالعمولة على الموقع 1xPartners.com، والغرض الرئيسي منه، كجزء من برنامج التسويق بالعمولة، هو جذب مستخدمين جدد إلى موارد الشركة، فضلاً عن الترويج لمنتجاتها.",
		es: "El afiliado es el administrador de la web (persona física o jurídica) que cumple las condiciones del Programa de afiliados en 1xpartners.com, cuyo objetivo principal como parte del Programa de afiliados es atraer a nuevos usuarios al recurso de la Empresa, así como promocionar sus productos.",
	},
    "terms_page-p1": {
		en: "Affiliate Account is a personal account of the Affiliate in the Affiliate Program.",
		ru: "Партнёрский аккаунт – личный аккаунт Партнёра в Партнёрской Программе.",
		pt: "A Conta de Afiliado é a conta pessoal do Afiliado no Programa de Afiliados.",
		ar: "حساب الشراكة هو حساب شخصي للشريك في برنامج التسويق بالعمولة.",
		es: "La Cuenta de Afiliado es la cuenta personal del Afiliado en el Programa de Afiliados.",
	},
    "terms_page-p2": {
		en: "New users are the users who previously had no player account on any 1xBet website, were attracted by the Affiliate to the Company's website through special tools, have registered a player account on 1xBet and made the first deposit.",
		ru: "Новые пользователи – пользователи, которые ранее не имели аккаунта ни на одном сайте 1xBet, были привлечены Партнёром на сайт Компании через специальные инструменты, зарегистрировали игровой счет на 1xBet и внесли первый депозит.",
		pt: "Os novos usuários são usuários que anteriormente não tinham conta de jogador em qualquer site da 1xBet, foram atraídos pelo Afiliado para o site da Empresa por meios específicos, registraram uma conta de jogador na 1xBet e fizeram o seu primeiro depósito.",
		ar: "المستخدمون الجدد هم المستخدمون الذين لم يكن لديهم سابقًا حساب لاعب على أي موقع إلكتروني لـ ‎1xBet، والذين أحضرهم المسوق بالعمولة إلى موقع الشركة من خلال أدوات خاصة، وقاموا بتسجيل حساب لاعب على ‎1xBet وقاموا بالإيداع للمرة الأولى.",
		es: "‎Los Nuevos usuarios son los usuarios que no tenían una cuenta de jugador previamente en ningún sitio web de 1xBet, que han sido atraídos por el Afiliado al sitio web de la Empresa por medio de herramientas especiales, que han registrado una cuenta de jugador en 1xBet y han realizado un primer depósito.",
	},
    "terms_page-p3": {
		en: "Referral link is a link to the website of the Company which contains the unique identifier of the Affiliate.",
		ru: "Реферальная ссылка – ссылка, ведущая на сайт Компании, в которой находится уникальный идентификатор Партнёра.",
		pt: "O link de Referência é um link para o site da Empresa que contém o identificador único do Afiliado.",
		ar: "رابط الإحالة هو رابط إلى موقع الشركة الذي يحتوي على المعرف الفريد للشركة التابعة.",
		es: "El enlace de referencia es un enlace al sitio web de la Empresa que contiene el identificador exclusivo del Afiliado.",
	},
    "terms_page-p4": {
		en: "Earnings are monetary rewards received by the Affiliate as a commission on profit from New users brought by the Affiliate.",
		ru: "Заработок – денежное вознаграждение, полученное Партнёром в качестве комиссии от прибыли с привлеченных им Новых пользователей.",
		pt: "Os ganhos são recompensas monetárias recebidas pelo Afiliado como comissão sobre o lucro de novos usuários trazidos pelo Afiliado.",
		ar: "الأرباح عبارة عن مكافآت نقدية يتلقاها المسوق بالعمولة كعمولة على الأرباح من المستخدمين الجدد الذي أحضرهم‎.‎",
		es: "Las Ganancias son recompensas monetarias recibidas por el Afiliado como comisión de las ganancias de los Nuevos usuarios aportados por el Afiliado.",
	},
    "terms_page-p5": {
		en: "Payment is a payment (earnings), which is transferred to the Affiliate from the internal account of the Affiliate Program via an external payment system.",
		ru: "Выплата – платёж (заработок), который перечисляется Партнёру из внутреннего счета Партнёрской Программы во внешнюю платёжную систему.",
		pt: "O Pagamento é um pagamento (rendimentos) que é transferido para o Afiliado a partir da conta interna do Programa de Afiliados por meio de um sistema de pagamento externo.",
		ar: "الدفع عبارة عن مبلغ مدفوع (أرباح) يتم تحويله إلى المسوق بالعمولة من الحساب الداخلي لبرنامج التسويق بالعمولة عبر نظام دفع خارجي.",
		es: "El Pago es un pago (ganancias), que se transfiere al Afiliado desde la cuenta interna del Programa de Afiliados por medio de un sistema de pago externo.",
	},
    "terms_page-p6": {
		en: "Reporting period is a period of time that can be specified in order for the Affiliate to track the results of its work within the Affiliate Program.",
		ru: "Отчётный период – определенный промежуток времени, за который Партнёр может отслеживать результаты своей работы в рамках Партнёрской Программы.",
		pt: "Período de relatório é um período de tempo que pode ser especificado para que o Afiliado acompanhe os resultados de seu trabalho no Programa de Afiliados.",
		ar: "فترة إعداد التقارير هي فترة زمنية يمكن تحديدها لكي يتتبع المسوق بالعمولة نتائج عمله في برنامج التسويق بالعمولة.",
		es: "El Periodo de informe es un espacio de tiempo que se puede especificar para que el Afiliado realice un seguimiento de los resultados de su trabajo dentro del Programa de Afiliados.",
	},
    "terms_page-p7": {
		en: "Advertising materials are text, graphic, audio, video and mixed materials of an advertising nature, which serve to promote the Company's products on the Internet.",
		ru: "Рекламные материалы – текстовые, графические, аудио-, видео- и смешанные материалы рекламного характера, служащие для продвижения продуктов Компании в Интернете.",
		pt: "Os Materiais Publicitários são textos, imagens, áudio, vídeo e materiais variados de natureza publicitária que servem para promover os produtos da Empresa na Internet.",
		ar: "المواد الإعلانية هي نصوص، ورسوم بيانية وصوتية، وفيديوهات ومواد متنوعة ذات طابع إعلاني، والتي تعمل على الترويج لمنتجات الشركة على الإنترنت.",
		es: "Los Materiales publicitarios son materiales de texto, gráficos, de audio, vídeo y mixtos de carácter publicitario, que sirven para promocionar los productos de la Empresa en Internet.",
	},
    "terms_page-tersmAgreement": {
		en: "TERMS AND CONDITIONS OF THE AGREEMENT",
		ru: "Условия Соглашения",
		pt: "TERMOS E CONDIÇÕES DO CONTRATO",
		ar: "شروط وأحكام الاتفاقية:",
		es: "TÉRMINOS Y CONDICIONES DEL ACUERDO",
	},
    "terms_page-ol1": {
		en: "General provisions",
		ru: "Общие условия",
		pt: "Especificações gerais",
		ar: "الأحكام العامة",
		es: "Disposiciones generales",
	},
    "terms_page-ol1-li1": {
		en: "The Affiliate undertakes to get acquainted with the terms and conditions of the Affiliate Program prior to commencement of work with the Company and to accept them.",
		ru: "Партнёр обязуется перед началом работы с Компанией ознакомиться с условиями Партнёрской Программы и принять их.",
		pt: "O Afiliado se compromete a se familiarizar com os termos e condições do Programa de Afiliados antes de começar a trabalhar com a Empresa e a aceitá-los.",
		ar: "يتعهد المسوق بالعمولة بالإطلاع على شروط وأحكام برنامج التسويق بالعمولة قبل بدء العمل مع الشركة وقبولها.",
		es: "El Afiliado se compromete a familiarizarse con los términos y condiciones del Programa de Afiliados antes de comenzar a trabajar con la Empresa y aceptarlos.",
	},
    "terms_page-ol1-li2": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-ol1-li3": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-ol1-li4": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-ol1-li5": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-ol1-li6": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-pi": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-pi": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-pi": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-pi": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-pi": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-pi": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
    "terms_page-pi": {
		en: "Program",
		ru: "Ппрограмма",
		pt: "Programa",
		ar: "1",
		es: "Programa",
	},
};

// Проверка пути страницы сайта
function checkPagePathName() {
	switch (currentPathName) {
		case "/index.html":
			currentTexts = homeTexts;
			break;
		case "/terms-and-conditions.html":
			currentTexts = termsTexts;
			break;

		default:
			currentTexts = homeTexts;
			break;
	}
}
checkPagePathName();

// Изменение языка у текстов
function changeLang() {
	for (const key in currentTexts) {
		let elem = document.querySelector(`[data-lang=${key}]`);
		if (elem) {
			elem.textContent = currentTexts[key][currentLang];
		}
	}
}
changeLang();

// Вешаем обработчики на каждую кнопку
langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (!event.target.classList.contains("header__btn_active")) {
			currentLang = event.target.dataset.btn;
			localStorage.setItem("language", event.target.dataset.btn);
			resetActiveClass(langButtons, "header__btn_active");
			btn.classList.add("header__btn_active");
			changeLang();
		}
	});
});

// Сброс активного класса у переданного массива элементов
function resetActiveClass(arr, activeClass) {
	arr.forEach((elem) => {
		elem.classList.remove(activeClass);
	});
}

// Проверка активной кнопки
function checkActiveLangButton() {
	switch (currentLang) {
		case "ru":
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_active");
			break;
		case "en":
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");
			break;
		case "pt":
			document
				.querySelector('[data-btn="pt"]')
				.classList.add("header__btn_active");
			break;
        case "ar":
            document
                .querySelector('[data-btn="ar"]')
                .classList.add("header__btn_active");
                break;
        case "es":
			document
				.querySelector('[data-btn="es"]')
				.classList.add("header__btn_active");
			break;    

		default:
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");
			break;
	}
}
checkActiveLangButton();

// Проверка языка браузера
function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	const result = allLangs.some((elem) => {
		return elem === navLang;
	});
	if (result) {
		return navLang;
	}
}

// console.log("navigator.language", checkBrowserLang());