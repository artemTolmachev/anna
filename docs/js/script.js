



$(document).ready(function(){
    const toggleMenu = document.querySelector('.toggle-menu'); //иконкагамбургер
    const mobMenu = document.querySelector('.mobile-menu'); //мобильное меню
    const overlay = document.querySelector('.mobile-overlay'); //затемняющий фон при активном мобильном меню
    const nonescroll = document.querySelector('body'); //блокировка скролла при активном моб меню


    toggleMenu.addEventListener('click', function(){
        this.classList.toggle('active');
        mobMenu.classList.toggle('active-menu');
        overlay.classList.toggle('active');
        nonescroll.classList.toggle('nonescroll');
        
    });
    mobMenu.addEventListener('click', function(){
        this.classList.remove('active-menu');
        toggleMenu.classList.remove('active');
        overlay.classList.remove('active');
        nonescroll.classList.remove('nonescroll');
        
    });
    overlay.addEventListener('click', function(){
        this.classList.remove('active');
        toggleMenu.classList.remove('active');
        mobMenu.classList.remove('active-menu');
        nonescroll.classList.remove('nonescroll');
        
    });

    function testWebP(callback) {   // функция присваевает класс webp для body если браузер поддерживает формат webp

        var webP = new Image();
        webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
        
        testWebP(function (support) {
        
        if (support == true) {
        document.querySelector('body').classList.add('webp');
        }else{
        document.querySelector('body').classList.add('no-webp');
        }
        });



    $(".owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        navText: ['',''],
        navSpeed:1000
    });


    $('#nav').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
        begin: function() {
            //I get fired when the animation is starting
        },
        end: function() {
            //I get fired when the animation is ending
        },
        scrollChange: function($currentListItem) {
            //I get fired when you enter a section and I pass the list item of the section
        }
    });


    $('#back-top').hide();  //стрелка вверх
    $(window).scroll(function(){
    if($(this).scrollTop() > 300 ){
    $('#back-top').fadeIn();
    }
    else{
    $('#back-top').fadeOut();
    }
    });


});

    
    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
    if (!event.target.matches('.drop__btn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
    }
    };    

     
$(document).ready(function(){
    const formItems = document.querySelectorAll('.form-field');
     
    for(let item of formItems){
        const thisParent = item.closest('.form-item');
    }
    
    //form validate
    $('.form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            },
            phone: {
                required: true
            }
          
        },
        messages: {
            email: {
                required: 'Введите email',
                email: 'отсутствует символ @'
            },
            subject: {
                required: 'Введите имя'
            },
            phone: {
                required: 'Введите номер телефона',
                email: 'отсутствует символ @'
            },
            
            message: {
                required: 'Введите текст сообщения'
            }
        },
        submitHandler: function (form) {
            ajaxFormSubmit();
        }
    })
    // функция AJAX запроса на сервер 
    function ajaxFormSubmit() {
    let string = $(".contact-form").serialize(); //сохраняем данные введенные в форму в строку
    // формируем ajax запрос
    $.ajax({
    type: "POST", //тип запросса - POST
    url: "php/mail.php",//куда отправляем запрос
    data: string, //какие данные щтправляем,в данном случае переменнная string
    // функция если все прошло успешно
    success: function (html) {
        $(".contact-form").slideUp(800);
        $('#answer').html(html);
    }
    });
    return false;
    }
})   
   
    