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
		es: "faq",
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
		es: "Sing up",
	},
    "home_page-logIn": {
		en: "Log in",
		ru: "Вход",
		pt: "Login",
		ar: "تسجيل الدخول",
		es: "Log In",
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
		es: "faq",
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
		es: "Sing up",
	},
    "terms_page-logIn": {
		en: "Log in",
		ru: "Вход",
		pt: "Login",
		ar: "تسجيل الدخول",
		es: "Log in",
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
		pt: "O site ou recurso da Empresa (doravante também referida como 1xBet) é um ou mais sites da Empresa contendo a Marca da Empresa, no todo ou em parte do nome de domínio.",
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
		es: "Los Nuevos usuarios son los usuarios que no tenían una cuenta de jugador previamente en ningún sitio web de 1xBet, que han sido atraídos por el Afiliado al sitio web de la Empresa por medio de herramientas especiales, que han registrado una cuenta de jugador en 1xBet y han realizado un primer depósito.",
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
		en: "Only a user aged 18 and older can become a member and fulfill the conditions of the Affiliate Program. The Company shall not be liable to third parties for Affiliate’s failure to comply with the clause on majority age. If this clause is violated, the Company shall have the right to refuse payment of the Earnings to the Affiliate and freeze its Affiliate account.",
		ru: "Стать участником и выполнять условия Партнёрской Программы может только пользователь, достигший возраста 18 лет. Компания не несёт ответственности перед третьими лицами за несоблюдение Партнёром пункта о совершеннолетии. Если данный пункт будет нарушен, Компания имеет право отказать в выплате Партнёру Заработка и заморозить его Партнёрский аккаунт.",
		pt: "Somente um usuário com 18 anos ou mais pode se tornar um membro e cumprir as condições do Programa de Afiliados. A Empresa não será responsável perante terceiros pelo não cumprimento, por parte do Afiliado, da cláusula sobre restrições de idade. Se essa cláusula for violada, a Empresa terá o direito de recusar o pagamento dos Ganhos ao Afiliado e congelar sua conta de Afiliado.",
		ar: "يمكن فقط للمستخدم الذي يبلغ من العمر 18 عامًا أو أكثر أن يصبح عضوًا ويستوفي شروط برنامج التسويق بالعمولة لن تكون الشركة مسؤولة أمام الأطراف الثالثة عن فشل المسوق بالعمولةفي الامتثال للبند الخاص بسن الرشد. في حالة انتهاك هذا البند، يحق للشركة رفض دفع أرباح المسوق بالعمولةوتجميد حسابه.",
		es: "Solo pueden convertirse en miembro y cumplir con las condiciones del Programa de Afiliados los usuarios mayores de 18 años. La Empresa no será responsable frente a terceros por el incumplimiento por parte del Afiliado de la cláusula sobre la mayoría de edad. Si se incumple esta cláusula, la Empresa tendrá derecho a rechazar el pago de las Ganancias al Afiliado y a congelar su cuenta de Afiliado.",
	},
    "terms_page-ol1-li3": {
		en: "The Affiliate shall bear the full responsibility for the security of personal data, their storage, including login and password. The Company shall not be responsible for the loss of personal data by the Affiliate and/or transfer thereof to third parties.",
		ru: "Вся ответственность за безопасность персональных данных, их хранение, в том числе логина и пароля, лежит на Партнёре. Компания не несет ответственности за потерю Партнёром персональных данных и/или передачу их третьим лицам.",
		pt: "O Afiliado deverá assumir total responsabilidade pela segurança dos dados pessoais, seu armazenamento, incluindo login e senha. A Empresa não será responsável pela perda de dados pessoais pelo Afiliado e/ou sua transferência a terceiros.",
		ar: "يتحمل المسوق بالعمولة المسؤولية الكاملة عن أمان البيانات الشخصية وتخزينها بما في ذلك تسجيل الدخول وكلمة المرور. لن تكون الشركة مسؤولة عن فقدان البيانات الشخصية من قبل المسوق بالعمولة و/أو نقلها إلى أطراف ثالثة.",
		es: "El Afiliado asumirá toda la responsabilidad sobre la seguridad de los datos personales, su almacenamiento, incluidos el nombre de usuario y la contraseña. La Empresa no será responsable por la pérdida de datos personales por parte del Afiliado y/o su transferencia a terceros.",
	},
    "terms_page-ol1-li4": {
		en: "Through the Affiliate Program, the Company reserves the right to refuse to cooperate with any Affiliate, while the Company is not obliged to substantiate its refusal.",
		ru: "Компания через Партнёрскую Программу оставляет за собой право отказать в сотрудничестве тому или иному Партнёру, при этом Компания не обязана аргументировать свой отказ.",
		pt: "Por meio do Programa de Afiliados, a Empresa se reserva o direito de se recusar a cooperar com qualquer Afiliado, embora a Empresa não seja obrigada a fundamentar sua recusa.",
		ar: "من خلال برنامج التسويق بالعمولة، تحتفظ الشركة بالحق في رفض التعاون مع أي مسوق بالعمولة، في حين أن الشركة ليست ملزمة بتبرير رفضها.",
		es: "A través del Programa de Afiliados, la Empresa se reserva el derecho de negarse a cooperar con cualquier Afiliado, al tiempo que no está obligada a fundamentar su negativa.",
	},
    "terms_page-ol1-li5": {
		en: "The Company have the right to make any changes to this Agreement and revise the conditions of cooperation with representative of the Affiliate Program. Wherever possible, the notice of any significant changes shall be sent to the email address or via another source of communication provided by the Affiliate in the Affiliate account. The valid version of the Agreement shall be the version that is published on the Affiliate Program website.",
		ru: "Компания имеет право вносить в это Соглашение любые изменения, при этом там, где это возможно, уведомление о любых существенных изменениях будет отправлено на адрес электронной почты, предоставленный Партнёром в Партнёрском аккаунте. Действующим Соглашением считается та версия, которая опубликована на сайте Партнёрской Программы.",
		pt: "A Empresa tem o direito de fazer quaisquer alterações neste Contrato e revisar as condições de cooperação com o representante do Programa de Afiliados. Sempre que possível, o aviso de quaisquer alterações significativas deverá ser enviado para o endereço de e-mail ou por meio de outra fonte de comunicação fornecida pelo Afiliado na conta do Afiliado. A versão válida do Contrato será a versão publicada no site do Programa de Afiliados.",
		ar: "يحق للشركة إجراء أي تغييرات على هذه الاتفاقية ومراجعة شروط الشراكة مع ممثل برنامج التسويق بالعمولة. حيثما كان ذلك ممكنًا، يتم إرسال إشعار بأي تغييرات مهمة إلى عنوان البريد الإلكتروني أو عبر مصدر اتصال آخر يقدمه المسوق بالعمولة في حساب الشراكة يجب أن تكون النسخة الصالحة من الاتفاقية هي النسخة التي يتم نشرها على الموقع الإلكتروني لبرنامج التسويق بالعمولة.",
		es: "La Empresa tiene el derecho de realizar cualquier cambio en este Acuerdo y revisar las condiciones de cooperación con el representante del Programa de Afiliados. Siempre que sea posible, el aviso de cualquier cambio significativo se enviará a la dirección de correo electrónico o a través de otra fuente de comunicación proporcionada por el Afiliado en la cuenta del Afiliado. La versión válida del Acuerdo será la que se publique en el sitio web del Programa de Afiliados.",
	},
    "terms_page-ol1-li6": {
		en: "The Affiliate can register with the Affiliate Program only once, and the re-registration, including as a sub-affiliate is strictly prohibited.",
		ru: "Партнёр может зарегистрироваться в Партнёрской Программе только один раз, повторная регистрация, в т.ч. в качестве субпартнёра строго запрещена.",
		pt: "O Afiliado pode se registrar no Programa de Afiliados apenas uma vez, e o recadastramento, inclusive como subafiliado, é estritamente proibido.",
		ar: "يمكن للشريك التسجيل في برنامج التسويق بالعمولة مرة واحدة فقط ويُمنع تمامًا إعادة التسجيل بما في ذلك كشركة تابعة فرعية.",
		es: "El Afiliado puede registrarse en el Programa de Afiliados solo una vez, y está estrictamente prohibido volver a registrarse, incluso como sub-afiliado.",
	},
    "terms_page-ol1-li7": {
		en: "Placement of advertising materials",
		ru: "Размещение Рекламных материалов",
		pt: "Inserção de materiais publicitários",
		ar: "وضع المواد الإعلانية",
		es: "Colocación de materiales publicitarios",
	},
    "terms_page-ol1-li8": {
		en: "The cooperation with the Affiliate as part of the Affiliate Program implies the placement of Advertising materials on the Affiliate’s resource or resources.",
		ru: "Сотрудничество в рамках Партнёрской Программы с Партнёром подразумевает размещение Рекламных материалов на ресурсе или ресурсах Партнёра.",
		pt: "A cooperação com o Afiliado como parte do Programa de Afiliados implica a inserção de materiais publicitários no recurso ou recursos do Afiliado.",
		ar: "يعني التعاون مع المسوق بالعمولة كجزء من برنامج التسويق بالعمولة وضع مواد إعلانية على مورد واحد أو أكثر للمسوق بالعمولة.",
		es: "La cooperación con el Afiliado como parte del Programa de Afiliados implica el uso de Materiales publicitarios en el recurso o recursos del Afiliado.",
	},
    "terms_page-ol1-li9": {
		en: "When placing the Advertising materials as part of the cooperation with the Company, the Affiliate shall strictly comply with the laws applicable in the country of placement of Advertising Materials, the requirements of regulators and ethical standards; use only Advertising materials that have been moderated and approved by the Company.",
		ru: "При размещении Рекламных материалов в рамках сотрудничества с Компанией Партнёру необходимо строго соблюдать нормы законодательства, действующего в стране размещения Рекламных материалов, требования регуляторов и этические нормы; использовать исключительно Рекламные материалы, прошедшие модерацию и одобренные Компанией.",
		pt: "Ao inserir os materiais publicitários como parte da cooperação com a Empresa, o Afiliado deverá cumprir estritamente as leis aplicáveis no país de inserção dos Materiais Publicitários, os requisitos dos reguladores e os padrões éticos; usar somente materiais publicitários que tenham sido moderados e aprovados pela Empresa.",
		ar: "عند وضع المواد الإعلانية كجزء من التعاون مع الشركة، يجب على المسوق بالعمولة الالتزام الصارم بالقوانين المعمول بها في البلد الذي تم وضع المواد الإعلانية فبه، ومتطلبات المنظمين والمعايير الأخلاقية. يمكن فقط استخدام المواد الإعلانية التي تم الإشراف عليها والموافقة عليها من قبل الشركة.",
		es: "Al incluir los Materiales publicitarios como parte de la cooperación con la Empresa, el Afiliado deberá cumplir estrictamente con las leyes aplicables en el país de ubicación de los Materiales Publicitarios, los requisitos de los reguladores y las normas éticas; debe emplear únicamente materiales publicitarios que hayan sido moderados y aprobados por la Empresa.",
	},
    "terms_page-ol1-li10": {
		en: "When an Affiliate prepares their own Advertising materials, it is imperative for the Affiliate to provide such Advertising materials for moderation and approval to the representative of the Affiliate Program. In case of violation of this clause of the Agreement, the consequences specified in clause 2.9 of the Agreement occur to the Affiliate.",
		ru: "При подготовке собственных Рекламных материалов необходимо в обязательном порядке предоставлять их на модерацию и одобрение представителю Партнёрской Программы. В случае нарушения данного пункта Соглашения наступают последствия, предусмотренные п. 2.8 Соглашения.",
		pt: "Quando um Afiliado prepara seus próprios materiais publicitários, é imperativo que o Afiliado forneça esses materiais publicitários para moderação e aprovação do representante do Programa de Afiliados. Em caso de violação desta cláusula do Contrato, as consequências especificadas na cláusula 2.9 do Contrato ocorrerão para o Afiliado.",
		ar: "عندما يقوم أحد المسوقين بالعمولة بإعداد المواد الإعلانية الخاصة به، فإنه من الضروري أن يقوم المسوق بالعمولة بتوفير هذه المواد الإعلانية بالتنسيق والموافقة مع ممثل برنامج التسويق بالعمولة. في حالة انتهاك هذا البند من الاتفاقية، تُطبَّق العواقب المنصوص عليها في البند 2.9 من ااتفاقية المسوق بالعمولة.",
		es: "Si un Afiliado prepara sus propios Materiales publicitarios, es imperativo que el Afiliado proporcione dichos Materiales publicitarios para moderación y aprobación al representante del Programa de Afiliados. En caso de incumplimiento de esta cláusula del Acuerdo, el Afiliado se enfrentará a las consecuencias especificadas en la cláusula 2.9 del Acuerdo.",
	},
    "terms_page-ol1-li11": {
		en: "The Affiliate agrees to monitor the relevance and accuracy of the Advertising materials placed on its resource or resources (websites, social networks, instant messengers, etc.).** Irrelevant Advertising materials are:",
		ru: "Партнёр обязуется следить за релевантностью и актуальностью Рекламных материалов, представленных на его ресурсе или ресурсах (сайтах, социальных сетях, мессенджерах и т.п.).**Нерелевантными Рекламными материалами считаются:",
		pt: "O Afiliado concorda em monitorar a relevância e a precisão dos materiais de Publicidade colocados em seu recurso ou recursos (sites, redes sociais, mensageiros instantâneos etc.).** Os materiais de publicidade irrelevantes são:",
		ar: "يوافق المسوق بالعمولة على مراقبة مدى ملاءمة ودقة المواد الإعلانية الموضوعة على موارده (المواقع الإلكترونية والشبكات الاجتماعية والرسائل الفورية وما إلى ذلك). ** المواد الإعلانية غير ذات الصلة هي: ",
		es: "El Afiliado acepta supervisar la pertinencia y la precisión de los Materiales publicitarios situados en su recurso o recursos (sitios web, redes sociales, mensajería instantánea, etc.).** Los Materiales publicitarios no pertinentes son:",
	},
    // "terms_page-ol1-li12": {
	// 	en: "- incorrect conditions for promotions, bonuses and special offers;",
	// 	ru: "– неверные условия акций, бонусов и спецпредложений;",
	// 	pt: "- condições incorretas para promoções, bônus e ofertas especiais;",
	// 	ar: "- شروط غير صحيحة للترقيات والمكافآت والعروض الخاصة؛",
	// 	es: "- condiciones incorrectas de las promociones, bonos y ofertas especiales;",
	// },
    // "terms_page-ol1-li13": {
	// 	en: "- outdated creatives;",
	// 	ru: "– устаревшие креативы;",
	// 	pt: "- criativos obsoletos;",
	// 	ar: "- تصميمات قديمة؛",
	// 	es: "- creaciones caducadas;",
	// },
    // "terms_page-ol1-li14": {
	// 	en: "- Advertising materials containing an irrelevant Company’s logo;",
	// 	ru: "– Рекламные материалы, содержащие неактуальный логотип Компании;",
	// 	pt: "- Materiais de publicidade que contenham o logotipo de uma Empresa irrelevante;",
	// 	ar: "- مواد إعلانية تحتوي على شعار شركة غير ذي صلة؛",
	// 	es: "- Materiales publicitarios que contengan el logotipo de una Empresa irrelevante;",
	// },
    "terms_page-ol1-li15": {
		en: "- Advertising materials that use the name of the Company or one of its brands and which contain links to competitors' websites. In case of such a violation, the Company shall have the right to immediately review the terms of the Agreement with the Affiliate, while reserving the possibility of blocking its Affiliate account.",
		ru: "– Рекламные материалы, где используется название Компании или одного из ее брендов и которые содержат ссылки, ведущие на сайты конкурентов. В случае такого нарушения Компания имеет право незамедлительно пересмотреть условия Соглашения с Партнёром, оставляя за собой возможность блокировки его Партнёрского аккаунта.",
		pt: "- Materiais publicitários que usam o nome da Empresa ou de uma de suas marcas e que contêm links para sites de concorrentes. No caso de tal violação, a Empresa terá o direito de rever imediatamente os termos do Contrato com o Afiliado, se reservando a possibilidade de bloquear a conta do Afiliado.",
		ar: "- المواد الإعلانية التي تستخدم اسم الشركة أو إحدى علاماتها التجارية والتي تحتوي على روابط لمواقع المنافسين. في حالة حدوث مثل هذا الانتهاك، يحق للشركة مراجعة شروط الاتفاقية مع الشركة التابعة على الفور، مع الاحتفاظ بإمكانية حظر حساب المسوق بالعمولة.",
		es: "- Materiales publicitarios que empleen el nombre de la Empresa o una de sus marcas y que contengan enlaces a sitios web de la competencia. En caso de producirse tal infracción, la Empresa tendrá derecho a revisar inmediatamente los términos del Acuerdo con el Afiliado, reservándose la posibilidad de bloquear su cuenta de Afiliado.",
	},
    "terms_page-ol1-li18": {
		en: "The Affiliate may not place any advertising or content promoting the Company’s website in countries where it is prohibited, including countries where the situation is in the settlement process.",
		ru: "Партнёр не может размещать любые рекламу или контент, продвигающие сайт Компании, в странах, где это запрещено, в том числе в странах, ситуация в которых находится в процессе урегулирования.",
		pt: "O Afiliado não poderá colocar qualquer publicidade ou conteúdo promovendo o site da Empresa em países onde isso seja proibido, incluindo países onde a situação esteja em processo de finalização.",
		ar: "لا يجوز للمسوق بالعمولة وضع أي إعلان أو محتوى يروّج لموقع الشركة على الانترنت في البلدان التي تمنع ذلك، بما في ذلك البلدان التي يكون الموقف فيها في عملية التسوية.",
		es: "El Afiliado no puede colocar ningún tipo de publicidad o contenido que promocione el sitio web de la Empresa en países en los que esté prohibido, incluidos los países en los que la situación se encuentre en proceso de resolución.",
	},
    "terms_page-ol1-li19": {
		en: "The Affiliate cannot use motivated (including schematic) traffic.",
		ru: "Партнёр не может использовать мотивированный трафик.",
		pt: "O Afiliado não pode usar tráfego motivado (inclusive esquemático).",
		ar: "لا يمكن للمسوق بالعمولة استخدام حركة المرور المُحفزة (بما في ذلك التخطيطية).",
		es: "El Afiliado no puede utilizar tráfico motivado (incluido el esquemático).",
	},
    "terms_page-ol1-li20": {
		en: "The Company shall not be responsible for any claims of third parties related to the resource or resources of the Affiliate, any products or services related to it. If the Advertising materials are found on the Affiliate’s resource or resources that violate this Agreement, a warning shall be sent to the Affiliate with a request to replace such materials. The Affiliate agrees to fix the occurred violation within 5 (five) business days. If the matter remains unresolved during the specified term, then through the Affiliate Program the Company reserves the right to block Payments to the Affiliate until the violation is fixed. In a case of regular violation of this clause of the Agreement, then the Company, through the Affiliate Program, shall have the right to revise the terms of cooperation with the Affiliate.",
		ru: "Компания не несёт ответственности за какие-либо претензии третьих лиц, связанные с ресурсом или ресурсами Партнёра, какими-либо продуктами или услугами, связанными с ним. В случае обнаружения на ресурсе или ресурсах Партнёра Рекламных материалов, нарушающих это Соглашение, Партнёру высылается предупреждение с требованием заменить их. Партнёр обязуется исправить обнаруженную проблему в течение 5 (пяти) рабочих дней. В случае, если проблема остается нерешенной – Компания через Партнёрскую Программу оставляет за собой право заблокировать Партнёру Выплаты до момента устранения проблемы. При регулярном нарушении этого условия Соглашения Компания через Партнёрскую Программу вправе пересмотреть условия сотрудничества с Партнёром.",
		pt: "A Empresa não será responsável por quaisquer reclamações de terceiros relacionadas ao recurso ou aos recursos do Afiliado, a quaisquer produtos ou serviços relacionados a ele. Se os materiais de Publicidade forem encontrados no recurso ou recursos do Afiliado que violem este Contrato, um aviso será enviado ao Afiliado com uma solicitação de substituição desses materiais. O Afiliado concorda em corrigir a violação ocorrida em até 5 (cinco) dias úteis. Se a questão não for resolvida durante o prazo especificado, a Empresa se reserva o direito de bloquear os pagamentos ao Afiliado por meio do Programa de Afiliados até que a violação seja corrigida. Em caso de violação regular desta cláusula do Contrato, a Empresa, por meio do Programa de Afiliados, terá o direito de revisar os termos de cooperação com o Afiliado.",
		ar: "لن تكون الشركة مسؤولة عن أي مطالبات من أطراف ثالثة تتعلق بموارد المسوق بالعمولة أو أي منتجات أو خدمات متعلقة بها. إذا تم العثور على مواد إعلانية في موارد المسوق بالعمولة تنتهك هذه الاتفاقية، فسيتم إرسال تحذير إلى المسوق بالعمولة مع طلب استبدال هذه المواد. يوافق المسوق بالعمولة على إصلاح الانتهاك الذي حدث في غضون 5 (خمسة) أيام عمل. إذا لم يتم حلالمسألة دون خلال المدة المحددة، فعندئذٍ من خلال برنامج التسويق بالعمولة يحق للشركة بمنع المدفوعات إلى المسوق بالعمولة حتى يتم إصلاح الانتهاك. في حالة الانتهاك المنتظم لهذا البند من الاتفاقية، يحق للشركة، من خلال برنامج التسويق بالعمولة، مراجعة شروط التعاون مع المسوق بالعمولة.",
		es: "La Empresa no será responsable de ninguna reclamación de terceros relativa al recurso o los recursos del Afiliado, ni de cualquier producto o servicio relacionado con él. Si se detectan Materiales publicitarios que infrinjan este Acuerdo en el recurso o recursos del Afiliado, se enviará una advertencia al Afiliado con una solicitud de reemplazo de dichos materiales. El Afiliado se compromete a corregir la infracción ocasionada en un plazo de 5 (cinco) días hábiles. Si el asunto no ha sido resuelto durante el plazo especificado, en ese caso, a través del Programa de Afiliados, la Empresa se reserva el derecho de bloquear los Pagos al Afiliado hasta que se solvente la infracción. Si se produce una infracción continuada de esta cláusula del Acuerdo, la Empresa, a través del Programa de Afiliados, tendrá derecho a revisar los términos de cooperación con el Afiliado.",
	},
    "terms_page-ol3": {
		en: "Sources of traffic",
		ru: "Источники трафика",
		pt: "Fontes de tráfego",
		ar: "مصادر حركة المرور",
		es: "Fuentes de tráfico",
	},
    "terms_page-ol3-li1": {
		en: "When registering, the Affiliate agrees to provide comprehensive information about the sources of traffic it intends to use in cooperation with the Company.",
		ru: "При регистрации Партнёр обязуется предоставить исчерпывающую информацию об источниках трафика, которые он намеревается использовать при сотрудничестве с Компанией.",
		pt: "Ao se registrar, o Afiliado concorda em fornecer informações abrangentes sobre as fontes de tráfego que pretende usar em cooperação com a Empresa.",
		ar: "عند التسجيل، يوافق الشريك على تقديم معلومات شاملة حول مصادر حركة المرور التي ينوي استخدامها بالتعاون مع الشركة.",
		es: "Al registrarse, el Afiliado acepta facilitar información completa sobre las fuentes de tráfico que pretende utilizar en cooperación con la Empresa.",
	},
    "terms_page-ol3-li2": {
		en: "The Affiliate shall be held liable for any intentional concealment of sources of traffic. These actions may lead the Company, through the Affiliate Program, enacting punitive action which could include blocking of Payments and revising the terms of cooperation with the Affiliate.",
		ru: "За преднамеренное сокрытие источников трафика предусмотрена ответственность, в частности, блокировка Выплат и пересмотр условий сотрудничества.",
		pt: "O Afiliado será considerado responsável por qualquer dissimulação intencional de fontes de tráfego. Essas ações podem levar a Empresa, por meio do Programa de Afiliados, a tomar medidas punitivas que podem incluir o bloqueio de pagamentos e a revisão dos termos de cooperação com o Afiliado.",
		ar: "يكون المسوق بالعمولة مسؤولاً عن أي إخفاء متعمد لمصادر حركة المرور. قد تؤدي هذه الإجراءات إلى قيام الشركة، من خلال برنامج التسويق بالعمولة، بسن إجراءات عقابية قد تشمل منع المدفوعات ومراجعة شروط التعاون مع المسوق بالعمولة.",
		es: "El Afiliado será responsable de cualquier ocultamiento intencionado de las fuentes de tráfico. Estas acciones pueden conducir a la Empresa, a través del Programa de Afiliados, a promulgar acciones punitivas que pueden incluir el bloqueo de los Pagos y la revisión de los términos de cooperación con el Afiliado.",
	},
    "terms_page-ol3-li3": {
		en: "The Company’s Moderation Service shall have control over the compliance of the sources of traffic used by the Affiliate. The Affiliate can contact Affiliate Program Support for clarification.",
		ru: "Контроль за соответствием используемых Партнёром источников трафика осуществляет Служба модерации Компании. За разъяснениями Партнёр может обратиться в Службу поддержки Партнёрской Программы.",
		pt: "O Serviço de Moderação da Empresa terá controle sobre a conformidade das fontes de tráfego utilizadas pelo Afiliado. O Afiliado pode entrar em contato com o Suporte do Programa de Afiliados para obter esclarecimentos.",
		ar: "يجب أن يكون لخدمة الاعتدال في الشركة السيطرة على امتثال مصادر حركة المرور التي يستخدمها المسوق بالعمولة. يمكن للمسوق بالعمولة الاتصال بدعم برنامج التسويق بالعمولة للتوضيح.",
		es: "El Servicio de Moderación de la Empresa tendrá control sobre el cumplimiento de las fuentes de tráfico utilizadas por el Afiliado. El Afiliado puede ponerse en contacto con el Servicio de Soporte del Programa de Afiliados para obtener aclaraciones.",
	},
    "terms_page-ol4": {
		en: "Restrictions on the use of the Company’s intellectual property objects",
		ru: "Использование интеллектуальной собственности Компании",
		pt: "Restrições ao uso dos objetos de propriedade intelectual da Empresa",
		ar: "القيود المفروضة على استخدام مواد الملكية الفكرية للشركة",
		es: "Restricciones en el uso de los objetos de propiedad intelectual de la Empresa",
	},
    "terms_page-ol4-li1": {
		en: "The Affiliate is forbidden to fully or partially copy the appearance of the websites or individual landing pages of the main Brand of the Company, as well as websites of trade names and trademarks registered by the Company. In addition, the websites or landing pages of the Affiliate shall not give the impression that they are managed or connected with the main Brand of the Company and any of its associated brands.",
		ru: "Партнёру запрещено полностью или частично копировать внешний вид сайтов или отдельных целевых страниц основного Бренда Компании, а также сайтов товарных знаков и торговых марок, зарегистрированных Компанией. Также сайты или целевые страницы Партнёров не должны создавать впечатление, что они управляются или связаны с основным Брендом Компании и любым из её ассоциированных брендов.",
		pt: "O Afiliado está proibido de copiar total ou parcialmente a aparência dos sites ou páginas de destino individuais da Marca principal da Empresa, bem como sites de nomes comerciais e marcas registradas pela Empresa. Além disso, os sites ou páginas de destino do Afiliado não devem dar a impressão de que são gerenciados ou conectados à Marca principal da Empresa e a qualquer uma de suas marcas associadas.",
		ar: "يُحظر على المسوق بالعمولة نسخ مظهر المواقع الإلكترونية أو الصفحات المقصودة الفردية للعلامة التجارية الرئيسية للشركة، كليًا أو جزئيًا، بالإضافة إلى المواقع الإلكترونية الخاصة بالأسماء التجارية والعلامات التجارية المسجلة من قبل الشركة. بالإضافة إلى ذلك، يجب ألا تعطي المواقع الإلكترونية أو الصفحات المقصودة للمسوق بالعمولة انطباعًا بأنها مُدارة أو متصلة بالعلامة التجارية الرئيسية للشركة وأي من العلامات التجارية المرتبطة بها.",
		es: "El Afiliado tiene prohibido copiar total o parcialmente la apariencia de los sitios web o páginas de destino individuales de la Marca principal de la Empresa, así como sitios web de nombres comerciales y marcas registradas por la Empresa. Además, los sitios web o las páginas de destino del Afiliado no deberán ofrecer la impresión de estar administrados o conectados con la Marca principal de la Empresa y cualquiera de sus marcas asociadas.",
	},
    "terms_page-ol4-li2": {
		en: "The Affiliate shall not have the right to use the logos, graphics and marketing materials of the Company without the consent of the Company’s representatives, except for materials that are received as part of the Affiliate Program.",
		ru: "Партнёр не имеет права использовать без согласования с представителями Компании логотипы, графику и маркетинговые материалы Компании, кроме тех материалов, которые получает в рамках Партнёрской Программы.",
		pt: "O Afiliado não terá o direito de usar os logotipos, gráficos e materiais de marketing da Empresa sem o consentimento dos representantes da Empresa, exceto para materiais que sejam recebidos como parte do Programa de Afiliados.",
		ar: "لا يحق للمسوق بالعمولة استخدام الشعارات، والرسومات، والمواد التسويقية للشركة دون موافقة ممثلي الشركة، باستثناء المواد التي يتم استلامها كجزء من برنامج التسويق بالعمولة.",
		es: "El Afiliado no tendrá derecho a utilizar los logotipos, gráficos y materiales de marketing de la Empresa sin el consentimiento de los representantes de la misma, excepto los materiales que se reciban como parte del Programa de Afiliados.",
	},
    "terms_page-ol4-li3": {
		en: "The Affiliate agrees not to register or use in part of the website’s address (domain), its internal pages and mobile applications, any variation of the name of the main Brand of the Company or other brands of the Company, which includes or consists of the name of any brand of the Company, or which to an extent of confusion is similar to the name of the Company’s trademark. The Affiliate agrees with the Company's right to determine the likelihood of confusion.",
		ru: "Партнёр обязуется не регистрировать и не использовать в части адреса (домена) веб-сайта, его внутренних страниц и мобильных приложений любую вариацию названия основного Бренда Компании или иных брендов Компании, которое включает в себя или состоит из названия какой-либо торговой марки Компании или которое до степени смешения сходно с названием торговой марки Компании. Партнёр соглашается с правом Компании учитывать в данном случае уровень степени смешения.",
		pt: "O Afiliado concorda em não registrar ou usar em parte do endereço do site (domínio), suas páginas internas e aplicativos móveis, qualquer variação do nome da Marca principal da Empresa ou de outras marcas da Empresa, que inclua ou consista no nome de qualquer marca da Empresa, ou que, em grau de confusão, seja semelhante ao nome da marca registrada da Empresa. O Afiliado concorda com o direito da Empresa de determinar a probabilidade de confusão.",
		ar: "يوافق المسوق بالعمولة على عدم تسجيل أو استخدام في جزء من عنوان الموقع الإلكتروني (المجال) وصفحاته الداخلية وتطبيقات الهاتف المحمول أي تنوع في اسم العلامة التجارية الرئيسية للشركة أو العلامات التجارية الأخرى للشركة، والتي تشمل أو تتكون من اسم أي علامة تجارية للشركة، أو التي تشبه إلى حد قد يثير الارتباكاسم العلامة التجارية للشركة. يوافق المسوق بالعمولة على حق الشركة في تحديد احتمالية حدوث ارتباك.",
		es: "El Afiliado se compromete a no registrar ni utilizar en parte de la dirección del sitio web (dominio), sus páginas internas y aplicaciones móviles, cualquier variación del nombre de la Marca principal de la Empresa u otras marcas de la Empresa, que incluya o consista en la nombre de cualquier marca de la Empresa, o que, hasta cierto punto, sea similar al nombre de la marca registrada de la Empresa. El Afiliado está de acuerdo con el derecho de la Empresa de determinar la probabilidad de confusión.",
	},
    "terms_page-ol4-li4": {
		en: "The Affiliate shall not have the right to acquire/register/use keywords, search queries or other identifiers for use in any search systems, portals, advertising services or other search/reference services that are identical or similar to any trade names (trademarks) of the Company or of any other brand owned by the Company. These include meta tags on the Affiliate’s website that are identical or similar to any of the Company's trade names (trademarks). The Affiliate shall not have the right to create pages and/or groups on any social networks (including, but not limited to Facebook, Twitter, etc.) that may be misinterpreted as pages or groups of the Company and/or the Company’s brands. The Affiliate also agrees not to create or distribute mobile or web applications, as well as websites that may be misinterpreted as applications or websites of the Company's brands.",
		ru: "Партнёр не имеет права приобретать/регистрировать/использовать ключевые слова, поисковые запросы или другие идентификаторы для применения в любых поисковых системах, порталах, рекламных сервисах или других поисковых/справочных сервисах, которые идентичны или похожи на любые товарные знаки (торговые марки) Компании или любого другого бренда, принадлежащего Компании, или метатеги на сайте Партнёра, которые идентичны или похожи на любые товарные знаки (торговые марки) Компании. Партнёр не имеет права создавать страницы и/или группы в любых социальных сетях (включая, помимо прочего, Facebook, Twitter и так далее), которые можно принять за страницы или группы брендов Компании. Партнёр также соглашается не создавать и не распространять мобильные или веб-приложения, а также веб-сайты, которые можно принять за приложения или сайты брендов Компании.",
		pt: "O Afiliado não terá o direito de adquirir/registrar/usar palavras-chave, consultas de busca ou outros identificadores para uso em qualquer sistema de busca, portais, serviços de publicidade ou outros serviços de busca/referência que sejam idênticos ou similares a quaisquer nomes comerciais (marcas registradas) da Empresa ou de qualquer outra marca de propriedade da Empresa. Essas incluem meta tags no site do Afiliado que são idênticas ou similares a qualquer um dos nomes comerciais da Empresa (marcas registradas). O Afiliado não terá o direito de criar páginas e/ou grupos em quaisquer redes sociais (incluindo, mas não se limitando ao Facebook, Twitter etc.) que possam ser mal interpretadas como páginas ou grupos da Empresa e/ou das marcas da Empresa. O Afiliado também concorda em não criar ou distribuir aplicativos para dispositivos móveis ou para a Web, bem como sites que possam ser mal interpretados como aplicativos ou sites das marcas da Empresa.",
		ar: "لا يحق للمسوق بالعمولة الحصول على/ تسجيل/استخدام الكلمات الرئيسية أو استعلامات البحث أو المعرفات الأخرى للاستخدام في أي أنظمة بحث أو بوابات أو خدمات إعلانية أو خدمات بحث/مرجعية أخرى مماثلة أو مشابهة لأي أسماء تجارية (علامات تجارية) للشركة أو أي علامة تجارية أخرى مملوكة للشركة. وتشمل هذه العلامات الوصفية الموجودة على الموقع الإلكتروني الخاص بالمسوق بالعمولة والتي تكون متطابقة أو مشابهة لأي من الأسماء التجارية للشركة (العلامات التجارية). لا يحق للمسوق بالعمولة إنشاء صفحات و/أو مجموعات على أي شبكات اجتماعية (بما في ذلك، على سبيل المثال لا الحصر، Facebook و Twitter وغيرها) والتي قد يُساء تفسيرها على أنها صفحات أو مجموعات للشركة و/أو العلامات التجارية للشركة. يوافق المسوق بالعمولة أيضًا على عدم إنشاء أو توزيع تطبيقات للهاتف المحمول أو الانترنت، بالإضافة إلى المواقع الإلكترونية التي قد يُساء تفسيرها على أنها تطبيقات أو مواقع إلكترونية خاصة بعلامات الشركة التجارية.",
		es: "El Afiliado no tendrá derecho a adquirir/registrar/utilizar palabras clave, consultas de búsqueda u otros identificadores para su uso en cualquier sistema de búsqueda, portales, servicios de publicidad u otros servicios de búsqueda/referencia que sean idénticos o similares a cualquier nombre comercial (marca registrada) de la Empresa o de cualquier otra marca propiedad de la Empresa. Estos incluyen etiquetas meta en el sitio web del Afiliado que sean idénticas o similares a cualquiera de los nombres comerciales (marcas registradas) de la Empresa. El Afiliado no tendrá derecho a crear páginas y/o grupos en ninguna red social (incluidas, entre otras, Facebook, Twitter, etc.) que puedan malinterpretarse como páginas o grupos de la Empresa y/o las marcas de la Empresa. El Afiliado acepta además no crear ni distribuir aplicaciones móviles o web, así como sitios web que puedan malinterpretarse como aplicaciones o sitios web de las marcas de la Empresa.",
	},
    "terms_page-ol4-li5": {
		en: "In case of breach of cl. 4.1 - 4.4 of this Agreement, the Company shall have the right to review the terms of cooperation with the Affiliate.",
		ru: "В случае нарушения п. п. 4.1 – 4.4 этого Соглашения Компания вправе пересмотреть условия сотрудничества.",
		pt: "Em caso de violação das cláusulas. 4.1 - 4.4 deste Contrato, a Empresa terá o direito de revisar os termos de cooperação com o Afiliado.",
		ar: "في حالة خرق البنود. 4.1 - 4.4 من هذه الاتفاقية، يحق للشركة مراجعة شروط التعاون مع المسوق بالعمولة.",
		es: "En caso de incumplimiento de las cl. 4.1 - 4.4 de este Acuerdo, la Empresa tendrá derecho a revisar los términos de cooperación con el Afiliado.",
	},
    "terms_page-ol5": {
		en: "Competition",
		ru: "Конкуренция",
		pt: "Concorrência",
		ar: "المنافسة",
		es: "Competencia",
	},
    "terms_page-ol5-li1": {
		en: "The Affiliate agrees not to place Advertising Materials and not to distribute Advertising Materials on behalf of the administration, managers or other employees of the Company and, in particular, the Affiliate Program. All Advertising materials and appeals to the customers on behalf of the Company shall be sent from official email addresses listed on the Company's website.",
		ru: "Партнёр соглашается не размещать Рекламные материалы и не осуществлять рассылку Рекламных материалов от имени администрации, менеджеров или других сотрудников Компании и Партнёрской Программы в частности. Все Рекламные материалы и обращения к клиентам от имени Компании рассылаются с официальных email-адресов, указанных на сайте Компании.",
		pt: "O Afiliado concorda em não colocar Materiais Publicitários e não distribuir Materiais Publicitários em nome da administração, gerentes ou outros funcionários da Empresa e, em particular, do Programa de Afiliados. Todos os materiais de publicidade e apelos aos clientes em nome da Empresa devem ser enviados dos endereços de e-mail oficiais listados no site da Empresa.",
		ar: "يوافق المسوق بالعمولة على عدم وضع مواد إعلانية وعدم توزيع مواد إعلانية نيابة عن الإدارة أو المديرين أو غيرهم من موظفي الشركة، وعلى وجه الخصوص، برنامج التسويق بالعمولة. يجب إرسال جميع المواد الإعلانية والنداءات إلى العملاء نيابة عن الشركة من عناوين البريد الإلكتروني الرسمية المدرجة على موقع الشركة.",
		es: "El Afiliado acepta no colocar Materiales publicitarios ni distribuir Materiales publicitarios en nombre de la administración, gerentes u otros empleados de la Empresa y, en particular, del Programa de Afiliados. Todos los materiales publicitarios y las apelaciones a los clientes en nombre de la Empresa se enviarán desde las direcciones de correo electrónico oficiales que figuran en el sitio web de la Empresa.",
	},
    "terms_page-ol5-li2": {
		en: "The Affiliate shall not have the right to contact potential customers in any way that will result in competition between the Affiliate and the Company as to the promotion of the website or websites.",
		ru: "Партнёр не имеет права обращаться к потенциальным клиентам любым образом, который приведет к конкуренции между Партнёром и Компанией в отношении продвижения сайта или сайтов.",
		pt: "O Afiliado não terá o direito de entrar em contato com clientes em potencial de nenhuma forma que resulte em concorrência entre o Afiliado e a Empresa quanto à promoção do site ou dos sites.",
		ar: "لا يحق للمسوق بالعمولة الاتصال بالعملاء المحتملين بأي طريقة من شأنها أن تؤدي إلى منافسة بين المسوق بالعمولة والشركة فيما يتعلق بالترويج للمواقع الإلكترونية.",
		es: "El Afiliado no tendrá derecho a ponerse en contacto con clientes potenciales de ninguna manera que resulte en una competencia entre el Afiliado y la Empresa en lo referente a la promoción del sitio web o los sitios web.",
	},
    "terms_page-ol5-li3": {
		en: "As means of advertising the Company, the Affiliate is prohibited from using mail spam, contextual advertising with any of the Company’s Brands and advertising formats such as clickunder and popunder.",
		ru: "В качестве способов рекламы Компании Партнёрам запрещено использовать почтовый спам, контекстную рекламу с упоминанием Бренда Компании и такие форматы рекламы как кликандер и попандер.",
		pt: "Como meio de publicidade da Empresa, o Afiliado está proibido de usar spam por e-mail, publicidade contextual com qualquer das Marcas da Empresa e formatos de publicidade como clickunder e popunder.",
		ar: "كوسيلة للإعلان عن الشركة، يُمنع المسوق بالعمولة من استخدام البريد الإلكتروني العشوائي والإعلانات السياقية مع أي من العلامات التجارية للشركة وتنسيقات الإعلانات مثل clickunder و popunder.",
		es: "Como medio de publicidad de la Empresa, el Afiliado tiene prohibido usar correos masivos (spam), publicidad contextual con cualquiera de las Marcas de la Empresa y formatos publicitarios como clickunder y popunder.",
	},
    "terms_page-ol5-li4": {
		en: "The Affiliate agrees that it will not offer or provide incentives (financial or other) for registering, making a deposit or taking any action to any potential New User of the Company without the prior written consent of the Company as part of the Affiliate Program, except for standard advertising programs that the Company may from time to time provide through the Affiliate Program.",
		ru: "Партнёр соглашается с тем, что не будет предлагать или предоставлять стимулы (финансовые или иные) для регистрации, внесения депозита или совершения любых действий любому потенциальному Новому пользователю Компании без предварительного письменного согласия Компании в рамках Партнёрской Программы, за исключением стандартных рекламных программ, которые Компания может время от времени предоставлять через Партнёрскую Программу.",
		pt: "O Afiliado concorda que não oferecerá ou fornecerá incentivos (financeiros ou outros) para registro, depósito ou qualquer ação a qualquer Novo Usuário em potencial da Empresa sem o consentimento prévio por escrito da Empresa como parte do Programa de Afiliados, exceto para programas de publicidade padrão que a Empresa possa oferecer periodicamente por meio do Programa de Afiliados.",
		ar: "يوافق المسوق بالعمولة على أنه لن يوفر أو يقدم حوافز (مالية أو غيرها) للتسجيل أو الإيداع أو اتخاذ أي إجراء لأي مستخدم جديد محتمل للشركة دون موافقة خطية مسبقة من الشركة كجزء من برنامج التسويق بالعمولة، باستثناء للبرامج الإعلانية القياسية التي قد تقدمها الشركة من وقت لآخر من خلال برنامج التسويق بالعمولة.",
		es: "El Afiliado acepta que no ofrecerá ni proporcionará incentivos (financieros o de otro tipo) para registrarse, realizar un depósito o realizar cualquier acción a cualquier Nuevo usuario potencial de la Empresa sin el previo consentimiento por escrito de la Empresa como parte del Programa de Afiliados, excepto en los programas de publicidad estándar que la Empresa puede proporcionar de vez en cuando a través del Programa de Afiliados.",
	},
    "terms_page-ol5-li5": {
		en: "The Affiliate is forbidden to register its own player account with the Company through its Referral link, as well as to conspire with other users.",
		ru: "Партнёру запрещено регистрировать собственный игровой счет в Компании через свою Реферальную ссылку, а также вступать в сговор с другими пользователями.",
		pt: "O Afiliado está proibido de registrar sua própria conta de jogador na Empresa por meio de seu link de Indicação, bem como de conspirar com outros usuários.",
		ar: "لا يُسمح للمسوق بالعمولة من تسجيل حساب اللاعب الخاص به مع الشركة من خلال رابط الإحالة الخاص به، فضلًا عن التآمر مع مستخدمين آخرين.",
		es: "El Afiliado tiene prohibido registrar su propia cuenta de jugador con la Empresa a través de su enlace de Referencia, así como conspirar con otros usuarios.",
	},
    "terms_page-ol5-li6": {
		en: "The Affiliate is prohibited from using cookie-stuffing, namely:",
		ru: "Партнёру запрещено использование куки-стаффинга, а именно:",
		pt: "O Afiliado está proibido de usar cookie-stuffing, nominados abaixo:",
		ar: "لا يجوز للمسوق بالعمولة استخدام حشو ملفات تعريف الارتباط، خاصةً:",
		es: "El Afiliado tiene prohibido el uso de cookie-stuffing, es decir:",
	},
    "terms_page-ol5-li7": {
		en: "The Affiliate is prohibited from using view-through attribution model as to the promotion of the Company's applications.",
		ru: "Партнеру запрещено использовать модель атрибуции по просмотрам для продвижения приложений Компании.",
		pt: "O Afiliado está proibido de usar o modelo de atribuição de visualização para a promoção dos aplicativos da Empresa.",
		ar: "يُحظر على المسوق بالعمولة استخدام نموذج الإحالة من خلال العرض للترويج لتطبيقات الشركة.",
		es: "El Afiliado tiene prohibido utilizar el modelo de atribución de vistas para la promoción de las aplicaciones de la Empresa.",
	},
    "terms_page-ol5-li8": {
		en: "In case of violation of cl. 5.1 - 5.7 of this Agreement, the Company reserves the right to revise the terms of cooperation with the Affiliate and may close the Affiliate Account.",
		ru: "При нарушении п.п. 5.1 – 5.7 этого Соглашения Компания оставляет за собой право пересмотреть условия сотрудничества вплоть до закрытия Партнёрского аккаунта.",
		pt: "Em caso de violação das cláusulas. 5.1 - 5.7 deste Contrato, a Empresa se reserva o direito de revisar os termos de cooperação com o Afiliado e pode encerrar a Conta do Afiliado.",
		ar: "في حالة انتهاك البنود cl. 5.1 - 5.7 من هذه الاتفاقية، يحق للشركة مراجعة شروط التعاون مع المسوق بالعمولة وقد تغلق حسابه.",
		es: "En caso de incumplimiento de las cl. 5.1 - 5.7 de este Acuerdo, la Empresa se reserva el derecho de revisar los términos de cooperación con el Afiliado y puede cerrar la Cuenta de Afiliado.",
	},
    "terms_page-ol6": {
		en: "Confidential information",
		ru: "Конфиденциальная информация",
		pt: "Informações confidenciais",
		ar: "معلومات سرية",
		es: "Información confidencial",
	},
    "terms_page-ol6-li1": {
		en: "During the term of this Agreement, the Affiliate may be provided with confidential information related to the business of the Company, operations, technologies and the Affiliate Program (including, for example, Earnings and other commissions received by the Affiliate as part of the Affiliate Program).",
		ru: "В течение срока действия настоящего Соглашения Партнёру может быть доверена конфиденциальная информация, относящаяся к бизнесу Компании, операциям, технологиям и Партнёрской Программе (включая, например, Заработок и другие комиссионные вознаграждения, полученные Партнёром в рамках Партнёрской Программы).",
		pt: "Durante a vigência desse Contrato, o Afiliado poderá receber informações confidenciais relacionadas aos negócios da Empresa, operações, tecnologias e o Programa de Afiliados (incluindo, por exemplo, ganhos e outras comissões recebidas pelo Afiliado como parte do Programa de Afiliados).",
		ar: "خلال مدة هذه الاتفاقية، يجوز تزويد المسوق بالعمولة بمعلومات سرية تتعلق بأعمال الشركة، والعمليات، والتقنيات، وبرنامج التسويق بالعمولة (بما في ذلك، على سبيل المثال، الأرباح، والعمولات الأخرى التي يتلقاها المسوق بالعمولة كجزء من برنامج التسويق بالعمولة).",
		es: "Durante la vigencia de este Acuerdo, el Afiliado puede recibir información confidencial relacionada con el negocio de la Empresa, las operaciones, las tecnologías y el Programa de Afiliados (incluidas, por ejemplo, las Ganancias y otras comisiones recibidas por el Afiliado como parte del Programa de Afiliados).",
	},
    "terms_page-ol6-li2": {
		en: "The Affiliate agrees not to disclose or transfer any confidential information to third parties unless the Affiliate has prior written consent from the Company. The Affiliate shall use confidential information only to achieve the objectives of this Agreement. The Affiliate's obligations regarding confidential information shall survive after the termination of this Agreement.",
		ru: "Партнёр соглашается не разглашать и не передавать любую конфиденциальную информацию третьим лицам, если у Партнёра нет предварительного письменного согласия от Компании. Партнёр обязуется использовать конфиденциальную информацию только для достижения целей настоящего Соглашения. Обязательства Партнёра в отношении конфиденциальной информации остаются в силе и после прекращения действия настоящего Соглашения.",
		pt: "O Afiliado concorda em não divulgar ou transferir qualquer informação confidencial a terceiros a menos que o Afiliado tenha o consentimento prévio por escrito da Empresa. O Afiliado deverá utilizar informações confidenciais somente para atingir os objetivos desse Contrato. As obrigações do Afiliado em relação às informações confidenciais sobreviverão após o término desse Contrato.",
		ar: "يوافق المسوق بالعمولة على عدم الكشف عن أي معلومات سرية أو نقلها إلى أطراف ثالثة ما لم يكن لديه موافقة خطية مسبقة من الشركة. يجب على المسوق بالعمولة استخدام المعلومات السرية فقط لتحقيق أهداف هذه الاتفاقية. تبقى التزامات المسوق بالعمولة فيما يتعلق بالمعلومات السرية سارية حتى بعد إنهاء هذه الاتفاقية.",
		es: "El Afiliado acepta no divulgar ni transferir ninguna información confidencial a terceros a menos que el Afiliado tenga el consentimiento previo por escrito de la Empresa. El Afiliado utilizará la información confidencial únicamente para lograr los objetivos de este Acuerdo. Las obligaciones del Afiliado con respecto a la información confidencial sobrevivirán después del cese de este Acuerdo.",
	},
    "terms_page-ol6-li3": {
		en: "In case of violation of cl. 6.1 - 6.2 of this Agreement, the Company shall have the right to terminate the Agreement with the Affiliate and apply penalties in accordance with applicable laws on protection of the confidential information.",
		ru: "В случае нарушения п.п. 6.1 – 6.2 этого Соглашения Компания имеет право расторгнуть Соглашение с Партнёром и применить штрафные санкции согласно действующему законодательству по защите конфиденциальной информации.",
		pt: "Em caso de violação das cláusulas 6.1 - 6.2 desse Contrato, a Empresa terá o direito de rescindir o Contrato com o Afiliado e aplicar penalidades de acordo com as leis aplicáveis à proteção de informações confidenciais.",
		ar: "في حالة مخالفة البند ‎6.1 - 6.2 من هذه الاتفاقية، يحق للشركة إنهاء الاتفاقية مع المسوق بالعمولة وتطبيق العقوبات وفقًا للقوانين المعمول بها بشأن حماية المعلومات السرية.",
		es: "En caso de incumplimiento de las cl. 6.1 - 6.2 de este Acuerdo, la Empresa tendrá derecho a rescindir el Acuerdo con el Afiliado y a aplicar sanciones de conformidad con las leyes aplicables sobre protección de la información confidencial.",
	},
    "terms_page-ol7": {
		en: "Fee for attracting New users",
		ru: "Комиссия за привлечение Новых пользователей",
		pt: "Comissão por atrair Novos usuários",
		ar: "رسوم إحضار مستخدمين جدد",
		es: "Comisión por atraer a Nuevos usuarios",
	},
    "terms_page-ol7-li1": {
		en: "Earnings of the Affiliate shall not have a fixed value and will depend on the income of the Company received from New users who have registered by the Referral link of the Affiliate, as well as on the quality of traffic.",
		ru: "Заработок Партнёра не имеет фиксированного значения и зависит от дохода Компании, полученного от тех Новых пользователей, которые зарегистрировались по Реферальной ссылке Партнёра, а также от качества трафика.",
		pt: "Os ganhos do Afiliado não terão um valor fixo e dependerão da receita da Empresa recebida de novos usuários que se registraram pelo link de indicação do Afiliado, bem como da qualidade do tráfego.",
		ar: "لن تكون قيمة أرباح المسوق بالعمولة ثابتة وستعتمد على دخل الشركة الذي حصلت عليه من المستخدمين الجدد الذين سجلوا عن طريق رابط الإحالة الخاص بالمسوق بالعمولة، وكذلك على جودة حركة البيانات.",
		es: "Las Ganancias del Afiliado no tendrán un valor fijo y dependerán de los ingresos que la Empresa reciba de los Nuevos usuarios que se hayan registrado con el enlace de Referencia del Afiliado, así como de la calidad del tráfico.",
	},
    "terms_page-ol7-li2": {
		en: "Immediately after registration, each new Affiliate receives a fee in the amount of 20 (twenty)% of the net profit of the Company received owing to New users attracted by the Affiliate for 3 (three) calendar months to increase turnover. Upon the expiration of the specified period of 3 (three) calendar months, the amount of the fee will be from 15 (fifteen)% of the net profit of the Company received owing to New users attracted by the Affiliate, with the possibility of increasing the fee percentage depending on the number of New users attracted: up to 20 (twenty)% and 25 (twenty five)%. The Affiliate can revise the conditions for increasing the amount of the fee with the representative of the Affiliate Program.",
		ru: "Каждый новый Партнёр сразу после регистрации получает комиссию в размере 20 (двадцати) % от чистой прибыли Компании, полученной благодаря Новым пользователям, привлеченным Партнёром на 3 (три) календарных месяца для наращивания оборота. По истечению указанных 3 (трех) календарных месяцев размер комиссии будет составлять от 15 (пятнадцати) % чистой прибыли Компании, полученной благодаря Новым пользователям, привлеченным Партнёром, с возможностью повышения процента, в зависимости от количества приведенных Новых пользователей, до 20 (двадцати) % и 25 (двадцати пяти) %. Условия повышения размера комиссии Партнёр может уточнить у представителя Партнёрской Программы.",
		pt: "Imediatamente após o registro, cada novo Afiliado recebe uma taxa no valor de 20 (vinte) % do lucro líquido da Empresa recebido em razão dos novos usuários atraídos pelo Afiliado durante 3 (três) meses corridos para aumentar o volume de negócios. Após a expiração do período especificado de 3 (três) meses corridos, o valor da taxa será de 15 (quinze)% do lucro líquido da Empresa recebido devido aos Novos usuários atraídos pelo Afiliado, com a possibilidade de aumentar a porcentagem da taxa dependendo do número de Novos usuários atraídos: até 20 (vinte)% e 25 (vinte e cinco)%. O Afiliado pode revisar as condições para aumentar o valor da taxa com o representante do Programa de Afil",
		ar: "بعد التسجيل مباشرة، يتلقى كل مسوق بالعمولة جديد عمولةً بنسبة 20 (عشرين) بالمئة من صافي ربح الشركة الذي حصلت عليه بفضل المستخدمين الجدد الذين اجتذبهم المسوق بالعمولة لمدة 3 (ثلاثة) أشهر تقويمية لزيادة حجم المبيعات. عند انتهاء الفترة المحددة البالغة 3 (ثلاثة) أشهر تقويمية، ستكون نسبة العمولة ابتداءً من 15 (خمسة عشر) بالمئة من صافي ربح الشركة الذي حققته بفضل المستخدمين الجدد الذين أحضرهم المسوق بالعمولة، مع إمكانية زيادة نسبة العمولة بحسب عدد المستخدمين الجدد الذين تم جذبهم، وتصل هذه الزيادة إلى 20 (عشرين) و 25 (خمسة وعشرين) بالمئة. يمكن للمسوق بالعمولة مراجعة شروط زيادة حجم العمولة مع ممثل برنامج التسويق بالعمولة.",
		es: "Inmediatamente después del registro, cada nuevo Afiliado recibe una comisión del 20 (veinte)% de las ganancias netas de la Empresa recibidas gracias a los Nuevos usuarios aportados por el Afiliado durante 3 (tres) meses naturales para aumentar la facturación. Vencido el plazo señalado de 3 (tres) meses naturales, el importe de la comisión será del 15 (quince)% del beneficio neto de la Empresa percibido gracias a los Nuevos usuarios captados por el Afiliado, con la posibilidad de aumento del porcentaje de la comisión en función del número de Nuevos usuarios aportados: hasta el 20 (veinte)% y el 25 (veinticinco)%. El Afiliado puede revisar las condiciones para aumentar el importe de la comisión con el representante del Programa de Afiliados.",
	},
    "terms_page-ol7-li3": {
        en: "If within 3 (three) consecutive calendar months the Affiliate not attract more than 3 (three) New users, the Company shall have the right (but is not obliged) to change the terms of cooperation with the Affiliate, including reducing the amount of fee to be received by the Affiliate, or suspend the operation of the Affiliate account in the Affiliate Program. In individual cases, the question of termination of the current Agreement with the Affiliate may be raised. In turn, the Affiliate’s active actions in promoting the Company's brands may become an occasion for improving the conditions of cooperation, in particular, increasing the amount of the fee. The Affiliate will be notified thereof by letter to the email address provided in the Affiliate Account.",
		ru: "В случае, если Партнёр в течение 3 (трех) календарных месяцев подряд не привлёк 3 (трех) Новых пользователей, Компания имеет право (но не обязана) изменить условия сотрудничества, в том числе понизить размер комиссии, получаемой Партнёром или приостановить действие Партнёрского аккаунта в Партнёрской Программе. В отдельных случаях может быть поставлен вопрос о расторжении текущего Соглашения с Партнёром. В свою очередь активные действия Партнёра в продвижении брендов Компании могут стать поводом для улучшения условий сотрудничества, в частности повышения размера комиссии. Об этом Партнёр будет уведомлен письмом на адрес электронной почты, предоставленный в Партнёрском аккаунте.",
		pt: "A su vez, las actividades del Afiliado en la promoción de las marcas de la Empresa pueden convertirse en una ocasión para mejorar las condiciones de cooperación, en concreto, aumentando el importe de la comisión. Lo que se le notificará al Afiliado por medio de un correo enviado a la dirección de correo electrónico proporcionada en la Cuenta de Afiliado.",
		ar: "إذا لم يُحضر المسوق بالعمولة خلال 3 (ثلاثة) أشهر تقويمية متتالية أكثر من 3 (ثلاثة) مستخدمين جدد، يحق للشركة (ولكنها ليست ملزمة) تغيير شروط التعاون مع المسوق بالعمولة، بما في ذلك تقليل نسبة عمولة المسوق بالعمولة، أو تعليق تشغيل حساب المسوق بالعمولة في برنامج التسويق بالعمولة. في الحالات الفردية، قد تطرح مسألة إنهاء الاتفاقية الحالية مع المسوق بالعمولة. في المقابل، قد تصبح الإجراءات النشطة للمسوق بالعمولة في الترويج للعلامات التجارية للشركة مناسبة لتحسين ظروف التعاون، لا سيما زيادة نسبة العمولة. سيتم إخطار المسوق بالعمولة بذلك عن طريق إرسال رسالة إلى عنوان البريد الإلكتروني الوارد في حساب المسوق بالعمولة.",
		es: "Si en un plazo de 3 (tres) meses naturales consecutivos el Afiliado no atrae a más de 3 (tres) Nuevos usuarios, la Empresa tendrá el derecho (aunque no estará obligada) a cambiar los términos de cooperación con el Afiliado, incluida la reducción del importe de la comisión recibida por el Afiliado, o suspender la operación de la cuenta de Afiliado en el Programa de Afiliados. En casos individuales, se puede plantear la cuestión del cese del Acuerdo actual con el Afiliado.",
	},
    "terms_page-ol8": {
		en: "Fee payment",
		ru: "Выплата комиссионных",
		pt: "Pagamento de taxas",
		ar: "دفع الرسوم",
		es: "Pago de las comisiones",
	},
    "terms_page-ol8-li1": {
		en: "The Affiliate can receive Earnings once a week (every Tuesday, for the period of Monday to Sunday of the previous week, inclusive), but only if it has previously agreed with the manager of the Сompany the details of payment, as well as if the earned funds exceed the minimum payment value - $ 30 (thirty US dollars) and attrected more then 3 players. The funds available for withdrawal are formed from fully calculated events. Income from events that have not yet been calculated will be withheld until full settlement (hold). If the Affiliate does not have the above mentioned minimum amount in its Affiliate account, then the funds will be automatically transferred to the next period, and so on, until the required amount is accumulated. A negative balance is also carried over to the next month.",
		ru: "Партнёр может получать Заработок 1 (один) раз в неделю (каждый вторник, за период включительно с понедельника по воскресенье предыдущей недели), но лишь в том случае, если предварительно согласовал с менеджером Компании реквизиты для оплаты, а также, если заработанные средства превышают минимальные для выплаты значения – $30,00 (тридцать). Доступные к выводу средства формируются с полностью рассчитаных событий. Доход от ещё нерассчитанных событий будет удержан до полного расчёта (находиться в холде). Если Партнёр не имеет такой суммы на счету Партнёра в Партнёрском аккаунте, то средства автоматически будут перенесены на следующий период, и так до тех пор, пока не накопится нужная сумма. На следующий месяц также переносится и отрицательный баланс.",
		pt: "O Afiliado pode receber Ganhos uma vez por semana (toda terça-feira, para o período de segunda a domingo da semana anterior, inclusive), mas somente se tiver acordado previamente com o gerente da empresa os detalhes do pagamento, bem como se os fundos ganhos excederem o valor mínimo de pagamento - US$ 30 (trinta dólares americanos) e se envolverem mais de 3 jogadores. Os fundos disponíveis para saque são formados a partir de eventos totalmente calculados. Os rendimentos de eventos que ainda não foram calculados serão retidos até a finalização total (retenção). Se o Afiliado não tiver o valor mínimo mencionado acima em sua conta de Afiliado, os fundos serão automaticamente transferidos para o próximo período, e assim por diante, até que o valor necessário seja acumulado. Um saldo negativo também é transferido para o mês seguinte.",
		ar: "يمكن للمسوق بالعمولة الحصول على أرباح مرة واحدة في الأسبوع (كل ثلاثاء، للفترة من الاثنين إلى الأحد من الأسبوع السابق) ولكن فقط إذا كان قد اتفق مسبقًا مع مدير الشركة على تفاصيل الدفع، وكذلك إذا كان تجاوزت الأموال المكتسبة الحد الأدنى لقيمة الدفع، وهي 30$ (ثلاثون دولارًا أمريكيًا) وجذبت أكثر من 3 لاعبين. يتم تشكيل الأموال المتاحة للسحب من الأحداث المحسوبة بالكامل. سيتم اقتطاع الدخل من الأحداث التي لم يتم احتسابها حتى الآن لحين حدوث تسوية كاملة (التعليق). إذا لم يكن لدى المسوق بالعمولة الحد الأدنى للمبلغ المذكور أعلاه في حساب المسوق بالعمولة الخاص به، فسيتم تحويل الأموال تلقائيًا إلى الفترة التالية، وهلم جرا، حتى يتم تجميع المبلغ المطلوب. يتم أيضًا ترحيل الرصيد السلبي إلى الشهر التالي.",
		es: "El Afiliado puede recibir Ganancias una vez por semana (todos los martes, por el periodo de lunes a domingo de la semana anterior, inclusive), pero solo si previamente ha acordado con el gerente de la empresa los datos de pago, así como si los fondos obtenidos superan el valor de pago mínimo: 30 USD (treinta dólares estadounidenses) y ha atraído a más de 3 jugadores. Los fondos disponibles para su retirada se forman a partir de eventos completamente calculados. Los ingresos procedentes de eventos que aún no hayan sido calculados serán retenidos hasta la resolución total (retención). Si el Afiliado no cuenta con el importe mínimo mencionado anteriormente en su cuenta de Afiliado, en ese caso los fondos se transferirán automáticamente al siguiente periodo, y así sucesivamente, hasta que se reúna la cantidad necesaria. Si el saldo es negativo, también se transferirá al mes siguiente.",
	},
    "terms_page-ol8-li2": {
		en: "The Company’s Affiliate Program shall have the right to delay Payments to the Affiliate for up to 2 (two) months in case of unforeseen technical failures in the Affiliate Program, as well as if it is necessary to verify the Affiliate and its traffic sources. In case of delay in the Payment, the Affiliate may clarify the reasons with the personal manager of the Company - representative of the Affiliate Program.",
		ru: "Партнёрская Программа Компании вправе задержать Выплаты Партнёру на срок до 2 (двух) месяцев в случае непредвиденных технических сбоев в рамках Партнёрской Программы, а также в случае необходимости проверки Партнёра и его источников трафика. В случае возникновения задержки Выплаты, Партнёр может уточнить причины у личного менеджера Компании – представителя Партнёрской Программы.",
		pt: "O Programa de Afiliados da Empresa terá o direito de atrasar os pagamentos ao Afiliado por até 2 (dois) meses em caso de falhas técnicas imprevistas no Programa de Afiliados, bem como se for necessário verificar o Afiliado e suas fontes de tráfego. Em caso de atraso no pagamento, o Afiliado poderá esclarecer os motivos com o gerente pessoal da Empresa - representante do Programa de Afiliados.",
		ar: "يحق لبرنامج التسويق بالعمولة التابع للشركة تأخير المدفوعات للمسوق بالعمولة لمدة تصل إلى شهرين في حالة حدوث أعطال فنية غير متوقعة في برنامج التسويق بالعمولة، وكذلك إذا كان من الضروري التحقق من المسوق بالعمولة ومصادر حركة المرور الخاصة به. في حالة التأخير في السداد، يجوز للمسوق بالعمولة توضيح الأسباب مع المدير الشخصي للشركة أي ممثل برنامج التسويق بالعمولة.",
		es: "El Programa de Afiliados de la Empresa tendrá derecho a retrasar los Pagos al Afiliado hasta 2 (dos) meses en caso de fallos técnicos imprevistos en el Programa de Afiliados, así como si es necesario para verificar al Afiliado y sus fuentes de tráfico. En caso de retraso en el Pago, el Afiliado podrá aclarar las razones con el administrador personal de la Empresa - representante del Programa de Afiliados.",
	},
    "terms_page-ol9": {
		en: "Dispute settlement procedure",
		ru: "Порядок разрешения спорных ситуаций",
		pt: "Procedimento de solução de controvérsias",
		ar: "إجراءات تسوية المنازعات",
		es: "Procedimiento de resolución de disputas",
	},
    "terms_page-ol9-li1": {
		en: "The Affiliate may challenge any decisions of the representatives of the Affiliate Program. For this purpose, the Affiliate shall contact the Affiliate Program Support Service and state its arguments.",
		ru: "Партнёр может оспорить любые решения представителей Партнерской Программы. Для этого Партнёр должен связаться со Службой поддержки Партнерской Программы и изложить ей свои аргументы.",
		pt: "O Afiliado pode contestar quaisquer decisões dos representantes do Programa de Afiliados. Para tanto, o Afiliado deverá entrar em contato com o Serviço de Atendimento ao Programa de Afiliados e apresentar seus argumentos.",
		ar: "يجوز للمسوق بالعمولة الطعن في أي قرارات صادرة عن ممثلي برنامج التسويق بالعمولة. لتحقيق هذا الأمر، يجب على المسوق بالعمولة الاتصال بخدمة دعم برنامج التسويق بالعمولة وتوضيح حججه.",
		es: "El Afiliado puede impugnar cualquier decisión de los representantes del Programa de Afiliados. Para tal efecto, el Afiliado deberá contactar con el Servicio de Soporte del Programa de Afiliados y exponer sus argumentos.",
	},
    "terms_page-ol9-li2": {
		en: "All information shall be provided by the Affiliates only in writing to the official e-mail of the Affiliate Program Support Service. The contact details of the Support Service are given on the website of the Affiliate Program.",
		ru: "Вся информация предоставляется Партнёрами только в письменном виде на официальную электронную почту Службы поддержки Партнёрской Программы. Контакт Службы поддержки находится на сайте Партнёрской Программы.",
		pt: "Todas as informações precisam ser fornecidas pelos Afiliados somente por escrito para o e-mail oficial do Serviço de Atendimento ao Programa de Afiliados. Os detalhes de contato do Serviço de Atendimento são fornecidos no site do Programa de Afiliados.",
		ar: "يجب تقديم جميع المعلومات من قبل المسوقين بالعمولة كتابيًا فقط إلى البريد الإلكتروني الرسمي لخدمة دعم برنامج التسويق بالعمولة. يتم توفير تفاصيل الاتصال بخدمة الدعم على الموقع الإلكتروني الخاص ببرنامج التسويق بالعمولة.",
		es: "Toda la información será proporcionada por los Afiliados únicamente por escrito al correo electrónico oficial del Servicio de Soporte del Programa de Afiliados. Los datos de contacto del Servicio de soporte se proporcionan en el sitio web del Programa de Afiliados.",
	},
    "terms_page-ol9-li3": {
		en: "The Affiliate Program Support Service shall have the right to refuse to consider a complaint if the Affiliate fails to provide evidence of the absence of a violation.",
		ru: "Служба поддержки Партнёрской Программы вправе отказать в рассмотрении жалобы, если Партнёр не предоставит доказательства отсутствия нарушения.",
		pt: "O Serviço de Atendimento ao Programa de Afiliados terá o direito de se recusar a considerar uma reclamação se o Afiliado não fornecer provas da ausência de uma violação.",
		ar: "يحق لخدمة دعم برنامج التسويق بالعمولة رفض النظر في شكوى إذا فشل المسوق بالعمولة في تقديم دليل على عدم وجود انتهاك.",
		es: "El Servicio de Soporte del Programa de Afiliados tendrá derecho a negarse a considerar una reclamación si el Afiliado no proporciona pruebas de la ausencia de infracción.",
	},
    "terms_page-ol9-li4": {
		en: "The term for consideration of a complaint shall be 14 (fourteen) business days from the date of its receipt.",
		ru: "Срок рассмотрения жалобы составляет 14 (четырнадцать) рабочих дней с момента ее получения.",
		pt: "O prazo para consideração de uma reclamação será de 14 (quatorze) dias úteis a partir da data do seu recebimento.",
		ar: "تستغرق مدة النظر في الشكوى 14 (أربعة عشر) يوم عمل من تاريخ استلامها.",
		es: "El espacio de tiempo para valorar la reclamación será de 14 (catorce) días hábiles contados a partir de la fecha de recepción.",
	},
    "terms_page-ol9-li5": {
		en: "Subsequent to considering the complaint, any decisions made by the Company regarding the 1xBet Affiliate Program are final and not subject to revision. The Company reserves the right to delete any communications containing profanity, insults, incitement to violence or false accusations, and, to duly suspend cooperation with the Affiliate responsible for sending such communications.",
		ru: "Решение, принятое Компанией в рамках Партнёрской Программы после рассмотрения жалобы, является окончательным и пересмотру не подлежит. Компания оставляет за собой право удалять письма, которые содержат ненормативную лексику, оскорбления, призывы к насилию, ложные обвинения, и приостановить сотрудничество с Партнёром, от которого поступают такие сообщения.",
		pt: "Após a consideração da reclamação, quaisquer decisões tomadas pela Empresa com relação ao Programa de Afiliados 1xBet são finais e não estão sujeitas a revisão. A Empresa se reserva o direito de apagar quaisquer comunicações que contenham profanidades, insultos, incitação à violência ou falsas acusações, e de suspender devidamente a cooperação com a Afiliada responsável pelo envio de tais comunicações.",
		ar: "بعد النظر في الشكوى، تعتبر أي قرارات تتخذها الشركة بخصوص برنامج التسويق بالعمولة ‎1xBet نهائية ولا تخضع للمراجعة. تحتفظ الشركة بالحق في حذف أي مراسلات تحتوي على ألفاظ نابية أو إهانات أو تحريض على العنف أو اتهامات كاذبة، وتعليق التعاون على النحو الواجب مع المسوق بالعمولة المسؤولة عن إرسال مثل هذه المراسلات.",
		es: "Una vez considerada la reclamación, cualquier decisión que tome la Empresa con respecto al Programa de afiliados de 1xBet será definitiva y no estará sujeta a revisión. La Empresa se reserva el derecho de eliminar cualquier comunicación que contenga blasfemias, insultos, incitación a la violencia o acusaciones falsas, y de suspender debidamente la cooperación con el Afiliado responsable del envío de dichas comunicaciones.",
	},
    "terms_page-terms2": {
		en: "Terms and Conditions",
		ru: "Правила и условия",
		pt: "Termos e Condições",
		ar: "الأحكام والشروط",
		es: "Términos y Condiciones",
	},
    "terms_page-policy": {
		en: "Privacy Policy",
		ru: "Политика Приватности",
		pt: "Política de Privacidade",
		ar: "سياسة الخصوصية",
		es: "Política de Privacidad",
	},
    "terms_page-ol9-li91": {
		en: "eng",
		ru: "rus",
		pt: "port",
		ar: "11",
		es: "espan",
	},
};

const policyTexts = {
    "policy_page-advantages": {
		en: "advantages",
		ru: "преимущества",
		pt: "vantagens",
		ar: "مزايا",
		es: "ventajas",
	},
    "policy_page-terms": {
		en: "Terms & Conditions",
		ru: "Правила и условия",
		pt: "Termos e Condições",
		ar: "الأحكام والشروط",
		es: "Términos y Condiciones",
	},
    "policy_page-faq": {
		en: "faq",
		ru: "faq",
		pt: "faq",
		ar: "التعليمات",
		es: "faq",
	},
    "policy_page-instructions": {
		en: "Instructions",
		ru: "Инструкции",
		pt: "Instruções",
		ar: "تعليمات",
		es: "Instrucciones",
	},
    "policy_page-contacts": {
		en: "Contact Us",
		ru: "Контакты",
		pt: "Contacte-nos",
		ar: "اتصل بنا",
		es: "Contáctenos",
	},
    "policy_page-singUp": {
		en: "Sign up",
		ru: "Регистрация",
		pt: "Registar",
		ar: "اشتراك",
		es: "Sing up",
	},
    "policy_page-logIn": {
		en: "Log in",
		ru: "Вход",
		pt: "Login",
		ar: "تسجيل الدخول",
		es: "Log in",
	},
    "policy_page-h2-1": {
		en: "Privacy police",
		ru: "Полиция конфиденциальности",
		pt: "Política de Privacidade",
		ar: "الشرطة الخصوصية",
		es: "Policía de privacidad",
	},
    "policy_page-h3-1": {
		en: "INFORMATION STORED ON YOUR DEVICE",
		ru: "ИНФОРМАЦИЯ, ХРАНЯЩАЯСЯ НА ВАШЕМ УСТРОЙСТВЕ",
		pt: "INFORMAÇÕES ARMAZENADAS NO SEU DISPOSITIVO",
		ar: "المعلومات المخزنة على جهازك",
		es: "INFORMACIÓN ALMACENADA EN SU DISPOSITIVO",
	},
    "policy_page-p1": {
		en: "When accessing our services, with your consent we may store information on your device. This information is referred to as ‘cookies’, which are small text files containing letters and numbers for recording your preferences. Cookies are stored on your device when you use our services while visiting our websites and online pages.",
		ru: "При доступе к нашим услугам с вашего согласия мы можем хранить информацию на вашем устройстве. Эта информация называется «куки» и представляет собой небольшие текстовые файлы, содержащие буквы и цифры для записи ваших предпочтений. Файлы cookie сохраняются на вашем устройстве, когда вы пользуетесь нашими услугами при посещении наших веб-сайтов и онлайн-страниц.",
		pt: "Ao acessar nossos serviços, com o seu consentimento poderemos armazenar informações no seu dispositivo. Esta informação é chamada de ‘cookies’, que são pequenos arquivos de texto contendo letras e números para registrar suas preferências. Os cookies são armazenados no seu dispositivo quando você usa nossos serviços enquanto visita nossos sites e páginas online.",
		ar: "عند الوصول إلى خدماتنا، بموافقتك، قد نقوم بتخزين المعلومات على جهازك. ويشار إلى هذه المعلومات باسم ملفات تعريف الارتباط، وهي ملفات نصية صغيرة تحتوي على أحرف وأرقام لتسجيل تفضيلاتك. يتم تخزين ملفات تعريف الارتباط على جهازك عندما تستخدم خدماتنا أثناء زيارة مواقعنا الإلكترونية وصفحاتنا على الإنترنت.",
		es: "Al acceder a nuestros servicios, con su consentimiento podemos almacenar información en su dispositivo. Esta información se conoce como cookies, que son pequeños archivos de texto que contienen letras y números para registrar sus preferencias. Las cookies se almacenan en su dispositivo cuando utiliza nuestros servicios mientras visita nuestros sitios web y páginas en línea.",
	},
    "policy_page-p2": {
		en: "We also use local shared objects or flash cookies. Flash cookies are similar to browser cookies.They allow us to remember your visits across our sites.",
		ru: "Мы также используем локальные общие объекты или флэш-файлы cookie. Флэш-файлы cookie аналогичны файлам cookie браузера. Они позволяют нам запоминать ваши посещения наших сайтов.",
		pt: "Também usamos objetos compartilhados locais ou cookies flash. Os cookies Flash são semelhantes aos cookies do navegador. Eles nos permitem lembrar suas visitas em nossos sites.",
		ar: "نستخدم أيضًا الكائنات المشتركة المحلية أو ملفات تعريف الارتباط الفلاش. تشبه ملفات تعريف الارتباط الخاصة بالفلاش ملفات تعريف الارتباط الخاصة بالمتصفح. فهي تسمح لنا بتذكر زياراتك عبر مواقعنا.",
		es: "También utilizamos objetos compartidos locales o cookies flash. Las cookies flash son similares a las cookies del navegador. Nos permiten recordar sus visitas a nuestros sitios.",
	},
    "policy_page-p3": {
		en: "Neither cookies nor flash cookies can be used to access your device or use information on your computer.",
		ru: "Ни файлы cookie, ни флэш-куки не могут использоваться для доступа к вашему устройству или использования информации на вашем компьютере.",
		pt: "Nem cookies nem flash cookies podem ser usados para acessar seu dispositivo ou usar informações em seu computador.",
		ar: "لا يمكن استخدام ملفات تعريف الارتباط أو ملفات تعريف الارتباط الفلاش للوصول إلى جهازك أو استخدام المعلومات الموجودة على جهاز الكمبيوتر الخاص بك.",
		es: "No se pueden utilizar cookies ni cookies flash para acceder a su dispositivo o utilizar información en su computadora.",
	},
    "policy_page-p4": {
		en: "We only use cookies and flash cookies for monitoring.",
		ru: "Мы используем файлы cookie и флэш-куки только для мониторинга.",
		pt: "Utilizamos apenas cookies e flash cookies para monitoramento.",
		ar: "نحن نستخدم ملفات تعريف الارتباط وملفات تعريف الارتباط الفلاش فقط للمراقبة.",
		es: "Sólo utilizamos cookies y cookies flash para el seguimiento.",
	},
    "policy_page-p5": {
		en: "We only use these methods to track your use of our services to record your preferences.",
		ru: "Мы используем эти методы только для отслеживания использования вами наших услуг и записи ваших предпочтений.",
		pt: "Usamos esses métodos apenas para rastrear o uso de nossos serviços e registrar suas preferências.",
		ar: "نحن نستخدم هذه الطرق فقط لتتبع استخدامك لخدماتنا لتسجيل تفضيلاتك.",
		es: "Solo utilizamos estos métodos para rastrear su uso de nuestros servicios y registrar sus preferencias.",
	},
    "policy_page-p6": {
		en: "Cookies help us monitor traffic to our site, improve our services, make it easier for you to access them and increase your interest in our services.",
		ru: "Файлы cookie помогают нам отслеживать трафик на ваш сайт, улучшать наши услуги, облегчать вам доступ к ним и повышать ваш интерес к нашим услугам.",
		pt: "Os cookies ajudam-nos a monitorizar o tráfego do seu site, a melhorar os nossos serviços, a facilitar o seu acesso aos mesmos e a aumentar o seu interesse nos nossos serviços.",
		ar: "تساعدنا ملفات تعريف الارتباط في مراقبة حركة المرور إلى موقعك وتحسين خدماتنا وتسهيل وصولك إليها وزيادة اهتمامك بخدماتنا.",
		es: "Las cookies nos ayudan a monitorear el tráfico a su sitio, mejorar nuestros servicios, facilitarle el acceso a ellos y aumentar su interés en nuestros servicios.",
	},
    "policy_page-p7": {
		en: "We use flash cookies and other cookies to help us show you more relevant and targeted advertisements.",
		ru: "Мы используем флэш-файлы cookie и другие файлы cookie, чтобы показывать вам более релевантную и целенаправленную рекламу.",
		pt: "Utilizamos flash cookies e outros cookies para nos ajudar a mostrar-lhe anúncios mais relevantes e direcionados.",
		ar: "نحن نستخدم ملفات تعريف الارتباط الفلاشية وملفات تعريف الارتباط الأخرى لمساعدتنا في عرض إعلانات أكثر صلة واستهدافًا لك.",
		es: "Utilizamos cookies flash y otras cookies para ayudarnos a mostrarle anuncios más relevantes y específicos.",
	},
    "policy_page-h3-2": {
		en: "STRICTLY NECESSARY COOKIES",
		ru: "СТРОГО НЕОБХОДИМЫЕ ФАЙЛЫ COOKIE",
		pt: "COOKIES ESTRITAMENTE NECESSÁRIOS",
		ar: "ملفات تعريف الارتباط الضرورية للغاية",
		es: "COOKIES ESTRICTAMENTE NECESARIAS",
	},
    "policy_page-p8": {
		en: "Strictly necessary cookies are used to allow users to navigate the website and use its features, such as accessing secure areas of the website or making financial transactions. Without these cookies, you would not be able to use our websites efficiently.",
		ru: "Строго необходимые файлы cookie используются для того, чтобы пользователи могли перемещаться по веб-сайту и использовать его функции, такие как доступ к защищенным областям веб-сайта или совершение финансовых транзакций. Без этих файлов cookie вы не сможете эффективно использовать наши веб-сайты.",
		pt: "Os cookies estritamente necessários são utilizados para permitir aos utilizadores navegar no site e utilizar as suas funcionalidades, como aceder a áreas seguras do site ou realizar transações financeiras. Sem estes cookies, não seria capaz de utilizar os nossos websites de forma eficiente.",
		ar: "تُستخدم ملفات تعريف الارتباط الضرورية للغاية للسماح للمستخدمين بالتنقل في موقع الويب واستخدام ميزاته، مثل الوصول إلى المناطق الآمنة في موقع الويب أو إجراء معاملات مالية. وبدون ملفات تعريف الارتباط هذه، لن تتمكن من استخدام مواقعنا الإلكترونية بكفاءة.",
		es: "Se utilizan cookies estrictamente necesarias para permitir a los usuarios navegar por el sitio web y utilizar sus funciones, como acceder a áreas seguras del sitio web o realizar transacciones financieras. Sin estas cookies, no podría utilizar nuestros sitios web de manera eficiente.",
	},
    "policy_page-h3-3": {
		en: "THE REGISTRATION PROCESS",
		ru: "ПРОЦЕСС РЕГИСТРАЦИИ",
		pt: "O PROCESSO DE REGISTRO",
		ar: "عملية التسجيل",
		es: "EL PROCESO DE REGISTRO",
	},
    "policy_page-p9": {
		en: "These cookies will hold information collected during your registration and will allow us to recognize you as a customer and provide you with the services you require. We may also use this data to better understand your online interests and preferences and to constantly enhance your visits to our platforms and use of our services.",
		ru: "Эти файлы cookie будут хранить информацию, собранную во время вашей регистрации, и позволят нам распознать вас как клиента и предоставить вам необходимые услуги. Мы также можем использовать эти данные, чтобы лучше понять ваши онлайн-интересы и предпочтения, а также постоянно повышать эффективность ваших посещений наших платформ и использования наших услуг.",
		pt: "Estes cookies reterão informações recolhidas durante o seu registo e permitir-nos-ão reconhecê-lo como cliente e fornecer-lhe os serviços que necessita. Também poderemos utilizar estes dados para compreender melhor os seus interesses e preferências online e para melhorar constantemente as suas visitas às nossas plataformas e a utilização dos nossos serviços.",
		ar: "ستحتفظ ملفات تعريف الارتباط هذه بالمعلومات التي تم جمعها أثناء تسجيلك وستسمح لنا بالتعرف عليك كعميل وتزويدك بالخدمات التي تحتاجها. قد نستخدم هذه البيانات أيضًا لفهم اهتماماتك وتفضيلاتك عبر الإنترنت بشكل أفضل ولتعزيز زياراتك لمنصاتنا واستخدام خدماتنا باستمرار.",
		es: "Estas cookies contendrán información recopilada durante su registro y nos permitirán reconocerlo como cliente y brindarle los servicios que necesita. También podemos utilizar estos datos para comprender mejor sus intereses y preferencias en línea y para mejorar constantemente sus visitas a nuestras plataformas y el uso de nuestros servicios.",
	},
    "policy_page-h3-4": {
		en: "OUR WEBSITE",
		ru: "НАШ САЙТ",
		pt: "NOSSO SITE",
		ar: "موقعنا",
		es: "NUESTRA PÁGINA WEB",
	},
    "policy_page-p10": {
		en: "We use cookies to collect information for visitors to our website.",
		ru: "Мы используем файлы cookie для сбора информации о посетителях нашего сайта.",
		pt: "Utilizamos cookies para coletar informações dos visitantes do nosso site.",
		ar: "نحن نستخدم ملفات تعريف الارتباط لجمع المعلومات لزوار موقعنا.",
		es: "Utilizamos cookies para recopilar información para los visitantes de nuestro sitio web.",
	},
    "policy_page-p11": {
		en: "Our servers use three different types of cookies.",
		ru: "Наши серверы используют три разных типа файлов cookie.",
		pt: "Nossos servidores utilizam três tipos diferentes de cookies.",
		ar: "تستخدم خوادمنا ثلاثة أنواع مختلفة من ملفات تعريف الارتباط.",
		es: "Nuestros servidores utilizan tres tipos diferentes de cookies.",
	},
    "policy_page-ul1-1": {
		en: "«Session-based» cookies: This type of cookie is only allocated to your computer for the duration of your visit to our website. A session-based cookie helps you navigate our website faster and, if you are a registered customer, allows us to give you information that is more relevant to you. This cookie automatically expires when you close your browser.",
		ru: "«Сеансовые» файлы cookie: этот тип файлов cookie сохраняется на вашем компьютере только на время вашего посещения нашего веб-сайта. Сеансовые файлы cookie помогают вам быстрее перемещаться по нашему веб-сайту и, если вы являетесь зарегистрированным клиентом, позволяют нам предоставлять вам информацию, которая более актуальна для вас. Срок действия этого файла cookie автоматически истекает при закрытии браузера.",
		pt: "Cookies «baseados em sessão»: Este tipo de cookie só é atribuído ao seu computador durante a sua visita ao nosso site. Um cookie baseado em sessão ajuda-o a navegar mais rapidamente no nosso site e, se for um cliente registado, permite-nos fornecer-lhe informações mais relevantes para si. Este cookie expira automaticamente quando você fecha o navegador.",
		ar: "ملفات تعريف الارتباط «المستندة إلى الجلسة»: يتم تخصيص هذا النوع من ملفات تعريف الارتباط لجهاز الكمبيوتر الخاص بك فقط طوال مدة زيارتك لموقعنا على الويب. يساعدك ملف تعريف الارتباط المستند إلى الجلسة على تصفح موقعنا بشكل أسرع، وإذا كنت عميلاً مسجلاً، فإنه يسمح لنا بتزويدك بالمعلومات الأكثر صلة بك. تنتهي صلاحية ملف تعريف الارتباط هذا تلقائيًا عند إغلاق المتصفح الخاص بك.",
		es: "Cookies «basadas en sesiones»: este tipo de cookies sólo se asigna a su ordenador durante su visita a nuestro sitio web. Una cookie basada en sesión le ayuda a navegar más rápido en nuestro sitio web y, si es un cliente registrado, nos permite brindarle información que es más relevante para usted. Esta cookie caduca automáticamente cuando cierra su navegador.",
	},
    "policy_page-ul1-2": {
		en: "«Persistent» cookies: This type of cookie will remain on your computer for a set period of time for each cookie. Flash cookies are also persistent.",
		ru: "«Постоянные» файлы cookie: этот тип файлов cookie будет оставаться на вашем компьютере в течение определенного периода времени для каждого файла cookie. Flash-cookie также являются постоянными.",
		pt: "Cookies «persistentes»: Este tipo de cookie permanecerá no seu computador por um período de tempo determinado para cada cookie. Os cookies Flash também são persistentes.",
		ar: "ملفات تعريف الارتباط «الدائمة»: سيبقى هذا النوع من ملفات تعريف الارتباط على جهاز الكمبيوتر الخاص بك لفترة زمنية محددة لكل ملف تعريف ارتباط. ملفات تعريف الارتباط الفلاش ثابتة أيضًا.",
		es: "Cookies «persistentes»: Este tipo de cookies permanecerán en su ordenador durante un periodo de tiempo determinado para cada cookie. Las cookies flash también son persistentes.",
	},
    "policy_page-ul1-3": {
		en: "«Analytical» cookies: This type of cookie allows us to recognize and count the number of visitors to our site and see how visitors use our services. This helps us improve the way our sites work, for example, by ensuring you can log in and find what you are looking for easily.",
		ru: "«Аналитические» файлы cookie: этот тип файлов cookie позволяет нам распознавать и подсчитывать количество посетителей нашего сайта, а также видеть, как посетители используют наши услуги. Это помогает нам улучшить работу наших сайтов, например, гарантируя, что вы сможете легко войти в систему и найти то, что ищете.",
		pt: "Cookies «analíticos»: Este tipo de cookie permite-nos reconhecer e contar o número de visitantes do nosso site e ver como os visitantes utilizam os nossos serviços. Isso nos ajuda a melhorar a forma como nossos sites funcionam, por exemplo, garantindo que você possa fazer login e encontrar facilmente o que procura.",
		ar: "ملفات تعريف الارتباط «التحليلية»: يتيح لنا هذا النوع من ملفات تعريف الارتباط التعرف على عدد زوار موقعنا وإحصائه ومعرفة كيفية استخدام الزوار لخدماتنا. وهذا يساعدنا على تحسين طريقة عمل مواقعنا، على سبيل المثال، من خلال ضمان إمكانية تسجيل الدخول والعثور على ما تبحث عنه بسهولة.",
		es: "Cookies «analíticas»: Este tipo de cookies nos permite reconocer y contar el número de visitantes a nuestro sitio y ver cómo los visitantes utilizan nuestros servicios. Esto nos ayuda a mejorar la forma en que funcionan nuestros sitios, por ejemplo, asegurándonos de que pueda iniciar sesión y encontrar lo que busca fácilmente.",
	},
    "policy_page-p12": {
		en: "You make a decision and you always have a choice of whether to accept or decline cookies.",
		ru: "Вы принимаете решение, и у вас всегда есть выбор, принять или отклонить файлы cookie.",
		pt: "Você toma uma decisão e sempre tem a opção de aceitar ou recusar cookies.",
		ar: "أنت تتخذ القرار ولديك دائمًا خيار قبول ملفات تعريف الارتباط أو رفضها.",
		es: "Usted toma una decisión y siempre tiene la opción de aceptar o rechazar las cookies.",
	},
    "policy_page-p13": {
		en: "Most web browsers automatically accept cookies, but, if you prefer, you can modify your browser settings to keep control over your cookies.",
		ru: "Большинство веб-браузеров автоматически принимают файлы cookie, но при желании вы можете изменить настройки браузера, чтобы сохранить контроль над файлами cookie.",
		pt: "A maioria dos navegadores aceita cookies automaticamente, mas, se preferir, você pode modificar as configurações do seu navegador para manter o controle sobre seus cookies.",
		ar: "تقبل معظم متصفحات الويب ملفات تعريف الارتباط تلقائيًا، ولكن، إذا كنت تفضل ذلك، يمكنك تعديل إعدادات المتصفح الخاص بك للحفاظ على التحكم في ملفات تعريف الارتباط الخاصة بك.",
		es: "La mayoría de los navegadores web aceptan cookies automáticamente, pero, si lo prefiere, puede modificar la configuración de su navegador para mantener el control sobre sus cookies.",
	},
    "policy_page-p14": {
		en: "You can use your web browser to.",
		ru: "Вы можете использовать свой веб-браузер для.",
		pt: "Você pode usar seu navegador da web para.",
		ar: "يمكنك استخدام متصفح الويب الخاص بك ل.",
		es: "Puede utilizar su navegador web para.",
	},
    "policy_page-ul2-1": {
		en: "delete all cookies;",
		ru: "удалить все файлы cookie;",
		pt: "exclua todos os cookies;",
		ar: "حذف جميع ملفات تعريف الارتباط؛",
		es: "eliminar todas las cookies;",
	},
    "policy_page-ul2-2": {
		en: "block all cookies;",
		ru: "заблокировать все файлы cookie;",
		pt: "bloquear todos os cookies;",
		ar: "حظر جميع ملفات تعريف الارتباط؛",
		es: "bloquear todas las cookies;",
	},
    "policy_page-ul2-3": {
		en: "allow all cookies;",
		ru: "разрешить все файлы cookie;",
		pt: "permitir todos os cookies;",
		ar: "السماح بجميع ملفات تعريف الارتباط؛",
		es: "permitir todas las cookies;",
	},
    "policy_page-ul2-4": {
		en: "block third-party cookies;",
		ru: "блокировать сторонние файлы cookie;",
		pt: "bloquear cookies de terceiros;",
		ar: "حظر ملفات تعريف الارتباط الخاصة بالطرف الثالث؛",
		es: "bloquear cookies de terceros;",
	},
    "policy_page-ul2-5": {
		en: "clear all cookies when the browser is closed;",
		ru: "удалять все файлы cookie при закрытии браузера;",
		pt: "limpar todos os cookies quando o navegador for fechado;",
		ar: "مسح جميع ملفات تعريف الارتباط عند إغلاق المتصفح؛",
		es: "borrar todas las cookies cuando el navegador esté cerrado;",
	},
    "policy_page-ul2-6": {
		en: "open a private browsing/incognito session that allows you to browse the Internet without storing data locally;",
		ru: "открыть приватный сеанс просмотра/инкогнито, который позволит вам просматривать Интернет без локального хранения данных;",
		pt: "abrir uma sessão de navegação privada/incógnita que permite navegar na Internet sem armazenar dados localmente;",
		ar: "فتح جلسة تصفح/تصفح متخفي خاصة تسمح لك بتصفح الإنترنت دون تخزين البيانات محليًا؛",
		es: "abrir una sesión de navegación privada/incógnito que le permita navegar por Internet sin almacenar datos localmente;",
	},
    "policy_page-ul2-7": {
		en: "install add-ons and plug-ins to extend browser options.",
		ru: "устанавливайте дополнения и плагины для расширения возможностей браузера.",
		pt: "instale complementos e plug-ins para ampliar as opções do navegador.",
		ar: "تثبيت الوظائف الإضافية والمكونات الإضافية لتوسيع خيارات المتصفح.",
		es: "Instale complementos y complementos para ampliar las opciones del navegador.",
	},
    "policy_page-p15": {
		en: "Where can I find information about managing cookies.",
		ru: "Где я могу найти информацию об управлении файлами cookie.",
		pt: "Onde posso encontrar informações sobre a gestão de cookies.",
		ar: "أين يمكنني العثور على معلومات حول إدارة ملفات تعريف الارتباط.",
		es: "¿Dónde puedo encontrar información sobre la gestión de cookies?",
	},
    "policy_page-ul3-1": {
		en: "Information about cookies in Internet Explorer",
		ru: "Информация о файлах cookie в Internet Explorer",
		pt: "Informações sobre cookies no Internet Explorer",
		ar: "معلومات حول ملفات تعريف الارتباط في Internet Explorer",
		es: "Información sobre cookies en Internet Explorer",
	},
    "policy_page-ul3-2": {
		en: "Information about cookies in Chrome",
		ru: "Информация о файлах cookie в Chrome",
		pt: "Informações sobre cookies no Chrome",
		ar: "معلومات حول ملفات تعريف الارتباط في Chrome",
		es: "Información sobre cookies en Chrome",
	},
    "policy_page-ul3-3": {
		en: "Information about cookies in Firefox",
		ru: "Информация о файлах cookie в Firefox",
		pt: "Informações sobre cookies no Firefox",
		ar: "معلومات حول ملفات تعريف الارتباط في Firefox",
		es: "Información sobre cookies en Firefox",
	},"policy_page-ul3-4": {
		en: "Information about cookies in Safari",
		ru: "Информация о файлах cookie в Safari",
		pt: "Informações sobre cookies no Safari",
		ar: "معلومات حول ملفات تعريف الارتباط في Safari",
		es: "Información sobre cookies en Safari",
	},
    "policy_page-ul3-5": {
		en: "Information about cookies in Opera",
		ru: "Информация о файлах cookie в Opera",
		pt: "Informações sobre cookies no Opera",
		ar: "معلومات حول ملفات تعريف الارتباط في Opera",
		es: "Información sobre cookies en Opera",
	},
    "policy_page-p16": {
		en: "FLASH COOKIES",
		ru: "ФЛЕШ-КУКИ",
		pt: "BOLINHOS FLASH",
		ar: "ملفات تعريف الارتباط فلاش",
		es: "COOKIES FLASH",
	},
    "policy_page-p17": {
		en: "You can modify your Flash Player settings to prevent the use of flash cookies. The settings manager of your Flash Player allows you to manage your preferences.",
		ru: "Вы можете изменить настройки Flash Player, чтобы запретить использование флэш-cookie. Менеджер настроек вашего Flash Player позволяет вам управлять своими предпочтениями.",
		pt: "Você pode modificar as configurações do Flash Player para evitar o uso de cookies flash. O gerenciador de configurações do seu Flash Player permite gerenciar suas preferências.",
		ar: "يمكنك تعديل إعدادات Flash Player لمنع استخدام ملفات تعريف الارتباط الخاصة بالفلاش. يسمح لك مدير إعدادات Flash Player بإدارة تفضيلاتك.",
		es: "Puede modificar la configuración de Flash Player para evitar el uso de cookies flash. El administrador de configuración de su Flash Player le permite administrar sus preferencias.",
	},
    "policy_page-p18": {
		en: "If you choose to decline all cookies in the browser, unfortunately you will not be able to use some of the features and services on our websites, and some services will not work correctly, for example, we will not be able to save your chosen interface language.",
		ru: "Если вы решите отказаться от всех файлов cookie в браузере, к сожалению, вы не сможете использовать некоторые функции и услуги на наших веб-сайтах, а некоторые службы не будут работать корректно, например, мы не сможем сохранить выбранный вами интерфейс. язык.",
		pt: "Se você optar por recusar todos os cookies do navegador, infelizmente não poderá utilizar alguns dos recursos e serviços de nossos sites, e alguns serviços não funcionarão corretamente, por exemplo, não poderemos salvar a interface escolhida. linguagem.",
		ar: "إذا اخترت رفض جميع ملفات تعريف الارتباط في المتصفح، فلن تتمكن للأسف من استخدام بعض الميزات والخدمات الموجودة على مواقعنا الإلكترونية، ولن تعمل بعض الخدمات بشكل صحيح، على سبيل المثال، لن نتمكن من حفظ الواجهة التي اخترتها لغة.",
		es: "Si elige rechazar todas las cookies en el navegador, lamentablemente no podrá utilizar algunas de las funciones y servicios de nuestros sitios web y algunos servicios no funcionarán correctamente; por ejemplo, no podremos guardar la interfaz elegida. idioma.",
	},
    "policy_page-terms2": {
		en: "Terms and Conditions",
		ru: "Правила и условия",
		pt: "Termos e Condições",
		ar: "الأحكام والشروط",
		es: "Términos y Condiciones",
	},
    "policy_page-policy": {
		en: "Privacy Policy",
		ru: "Политика Приватности",
		pt: "Política de Privacidade",
		ar: "سياسة الخصوصية",
		es: "Política de Privacidad",
	},
    "policy_page-p188": {
		en: "eng",
		ru: "rus",
		pt: "port",
		ar: "11",
		es: "espan",
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
            case "/privacy-police.html":
			currentTexts = policyTexts;
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

// ------------- cha file main.scc -----------

document.querySelector('#arBtn').onclick = function(){
    if(localStorage.getItem('language') == "ar") {
                theme.setAttribute('href', './css/mainAR.css')
            } else {
                theme.setAttribute('href', './css/main.css')
            }
}

// document.querySelector('.langBtn').onclick = function(){
//     if(localStorage.getItem('language') == "ar") {
//                 theme.setAttribute('href', './css/mainAR.css')
//             } else {
//                 theme.setAttribute('href', './css/main.css')
//             }
// }

document.querySelector('#enBtn').onclick = function(){
    if(localStorage.getItem('language') == "ar") {
                theme.setAttribute('href', './css/mainAR.css')
            } else {
                theme.setAttribute('href', './css/main.css')
            }
}

document.querySelector('#esBtn').onclick = function(){
    if(localStorage.getItem('language') == "ar") {
                theme.setAttribute('href', './css/mainAR.css')
            } else {
                theme.setAttribute('href', './css/main.css')
            }
}

document.querySelector('#ptBtn').onclick = function(){
    if(localStorage.getItem('language') == "ar") {
                theme.setAttribute('href', './css/mainAR.css')
            } else {
                theme.setAttribute('href', './css/main.css')
            }
}

if(localStorage.getItem('language') == "ar") {
    theme.setAttribute('href', './css/mainAR.css')
} else {
    theme.setAttribute('href', './css/main.css')
}


// function changeStyle() {
//     if(localStorage.getItem('language') == "ar") {
//         theme.setAttribute('href', './css/mainAR.css')
//     } else {
//         theme.setAttribute('href', './css/main.css')
//     }
// }
// changeStyle();
// setInterval(() => {
//     if(localStorage.getItem('language') == "ar") {
//         theme.setAttribute('href', './css/mainAR.css')
//     } else {
//         theme.setAttribute('href', './css/main.css')
//     }
// }, 1000);