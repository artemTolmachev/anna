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
    
    $(document).ready(function(){
        $(".owl-carousel").owlCarousel({
            items: 1,
            nav: true,
            loop: true,
            navText: ['',''],
            navSpeed:1000
                
               
        });
      });

    //   $('#page-nav').onePageNav({  //Точки навигации
    //     currentClass: 'active',
    //     changeHash: true,
    //     scrollSpeed: 750,
    //     scrollThreshold: 0.5,
    //     filter: '',
    //     easing: 'swing',
    //     begin: function () {},
    //     end: function () {},
    //     scrollChange: function ($currentListItem) {}
    // });

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

    })

    $('#back-top').hide();  //стрелка вверх
$(window).scroll(function(){
if($(this).scrollTop() > 300 ){
  $('#back-top').fadeIn();
}
else{
$('#back-top').fadeOut();
}
}); 

    
        
   
    