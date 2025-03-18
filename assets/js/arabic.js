

var transparent = true;
var big_image;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
  backgroundOrange = false,
  toggle_initialized = false;

$(document).ready(function() {
  window_width = $(window).width();
  var big_image;

  //  Activate the tooltips
  if ($('[data-toggle="tooltip"]').length != 0) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  //  Activate regular switches
  if ($("[data-toggle='switch']").length != 0) {
    $("[data-toggle='switch']").bootstrapSwitch();
  }

  //  Append modals to <body>
  if ($(".modal").length != 0) {
    $('.modal').appendTo('body');
  }

  // Init noUiSlider
  pk.initSliders();

  // Init popovers
  pk.initPopovers();

  // Activate the image for the navbar-collapse
  pk.initNavbarImage();

  // Navbar color change on scroll
  if ($('.navbar[color-on-scroll]').length != 0) {
    $(window).on('scroll', pk.checkScrollForTransparentNavbar);
  }

  $('.navbar-collapse').click(function() {
    setTimeout(function() {
      if (pk.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        pk.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
          $toggle.removeClass('toggled');
        }, 550);
      }
    }, 550);
  });

  // Change the collor of navbar collapse
  $('#navbarToggler').on('show.bs.collapse', function() {
    if ($('nav').hasClass('navbar-transparent') && $(document).scrollTop() < 50) {
      $('.navbar').addClass('no-transition');
      $('nav').removeClass('navbar-transparent');
    }
  }).on('hidden.bs.collapse', function() {
    if ($(document).scrollTop() < 50) {
      $('.navbar').removeClass('no-transition');
      $('nav:first-of-type').addClass('navbar-transparent');
    }
  });

  $navbar = $('.navbar[color-on-scroll]');
  scroll_distance = $navbar.attr('color-on-scroll') || 500;

  // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

  if ($('.navbar[color-on-scroll]').length != 0) {
    pk.checkScrollForTransparentNavbar();
    $(window).on('scroll', pk.checkScroll)
  }

  $('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
  }).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
  });


  if (window_width >= 768) {
    big_image = $('.page-header[data-parallax="true"]');

    if (big_image.length != 0) {
      $(window).on('scroll', pk.checkScrollForPresentationPage);
    }
  }
  // Activate Carousel
  $('.carousel').carousel({
    interval: 4000
  });

});

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);

  if (pk.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    pk.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo('body').click(function() {
      $('html').removeClass('nav-open');
      pk.misc.navbar_menu_visible = 0;
      setTimeout(function() {
        $toggle.removeClass('toggled');
        $('#bodyClick').remove();
      }, 550);
    });

    $('html').addClass('nav-open');
    pk.misc.navbar_menu_visible = 1;
  }
});

pk = {
  misc: {
    navbar_menu_visible: 0
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > $(".navbar").attr("color-on-scroll")) {
      if (transparent) {
        transparent = false;
        $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar[color-on-scroll]').addClass('navbar-transparent');
      }
    }
  }, 17),

  initNavbarImage: function() {
    var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
    var background_image = $navbar.data('nav-image');

    if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
      if (background_image != undefined) {
        $navbar.css('background', "url('" + background_image + "')")
          .removeAttr('data-nav-image')
          .css('background-size', "cover")
          .addClass('has-image');
      }
    } else if (background_image != undefined) {
      $navbar.css('background', "")
        .attr('data-nav-image', '' + background_image + '')
        .css('background-size', "")
        .removeClass('has-image');
    }
  },

  initPopovers: function() {
    if ($('[data-toggle="popover"]').length != 0) {
      $('body').append('<div class="popover-filter"></div>');

      //    Activate Popovers
      $('[data-toggle="popover"]').popover().on('show.bs.popover', function() {
        $('.popover-filter').click(function() {
          $(this).removeClass('in');
          $('[data-toggle="popover"]').popover('hide');
        });
        $('.popover-filter').addClass('in');
      }).on('hide.bs.popover', function() {
        $('.popover-filter').removeClass('in');
      });

    }
  },

  initSliders: function() {
    // Sliders for demo purpose in refine cards section
    if ($('#sliderRegular').length != 0) {
      var rangeSlider = document.getElementById('sliderRegular');
      noUiSlider.create(rangeSlider, {
        start: [5000],
        range: {
          'min': [2000],
          'max': [10000]
        }
      });
    }
    if ($('#sliderDouble').length != 0) {
      var slider = document.getElementById('sliderDouble');
      noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
          'min': 0,
          'max': 100
        }
      });
    }

  },


  // Javascript for the parallax

  checkScroll: debounce(function() {
    big_image = $('.page-header[data-parallax="true"]');
    oVal = ($(window).scrollTop() / 3);
    big_image.css({
      'transform': 'translate3d(0,' + oVal + 'px,0)',
      '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
      '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
    });
  }, 4),
}

demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

function hasScrolled() {
  var st = $(this).scrollTop();
  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('.navbar.nav-down').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('.navbar.nav-up').removeClass('nav-up').addClass('nav-down');
    }
  }

  lastScrollTop = st;
};
let date=new Date();
const d=date.getDate();
const m=date.getUTCMonth()

const y=date.getUTCFullYear();
let weekday=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
let Month=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober",
"November","Dezember"]
var day=weekday[date.getUTCDay()];
const month=Month[date.getUTCMonth()];

var h4=document.querySelector("h4");
function h2Tag () {

  h4.innerText="Salamu Alaikum wr br heute ist der " + ""+day+""+" "+d+" "+" "+month+" "+y;
// alert("nicht vergessen Whatsapp support")
}
document.addEventListener("DOMContentLoaded",h2Tag)


function message()
{
 
      
  
  /*let Swal1=*/
  Swal.fire({
    title:"أي صلاة جمعة تود التسجيل فيها",
    text: "بالضغط على أحد الأزرار ، فإنك توافق على أنه يمكننا تسجيل بياناتك ومعالجتها داخليًا فقط وليس مع جهات خارجية. إذا كنت لا تريد ذلك ، فالرجاء ترك الصفحة",
    allowOutsideClick:false,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'الساعة 14:45',
    confirmButtonText: 'الساعة 14:00 ',  
  
    
  }).then((result) => {
  
  
    
    if (result.isConfirmed) {
      Swal.fire(
        'شكرًا',
        'ستتم إعادة توجيهك إلى استمارة التسجيل الساعة 14:00 مساءً',
        'success'
      )
      setTimeout(function(){

  window.open("../routing/freitagsgebet.html",'_blank')
      




    },3000)


    }
   
    if(!result.isConfirmed)
    {

      Swal.fire(
        'شكرًا',
        'ستتم إعادة توجيهك إلى استمارة التسجيل في الساعة 14:45 مساءً',
        'success'
      )
      setTimeout(function(){

  window.open("../routing/freitagsgebet14_45_uhr.html",'_blank')
      




    },3000)

    }
 
    
    })

   
   
  

    // return true;

  
  
}

function spend(){


  return Swal.fire({
      title: 'جزاك الله خيران على تبرعكم ،'+"</br>",
      text:" "+"IBAN:"+" "+"DEXXXXXXXXXXXXXXX"+""+"أو عبر"+"PayPal"+"يمكنك التبرع عبر  "+"بالضغط على زر التبرع ، فإنك توافق بموجبه على أن بياناتك ستتم معالجتها بواسطة موفري الدفع هؤلاء ، إذا كنت لا تريد ذلك ، فاضغط على إلغاء",
      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'إلغاء',
      confirmButtonText: '<button class="btn btn-primary" href="https://www.google.de"><svg xmlns="http://www.w3.org/2000/svg"   width="18" height="18" fill="blue" class="bi bi-paypal" viewBox="0 0 16 16"><path href="https://www.google.de" d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z"/></svg>PayPal</button>'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "شكرا جزاك الله خيران",
          'إن الله يجازي الذين ينفقون أموالهم في سبيل الله😊 '+' '+'',
          'success'
    
        )
      setTimeout(()=> {

        window.open("https://www.paypal.com/pools/c/8In6O5IFpd")


      },4000)
      
      }

  
    });}    



    let button=document.querySelectorAll("button")


function buttonAction(){

  for(var i=0;i<button.length;i++)
  {

button[1].addEventListener("click",message)
button[2].addEventListener("click",spend)



  }

  


}


// bilder funktion ebenfalls wie die Buttons machen
buttonAction();
// h2Tag();
// spend();


//brauch man vielleicht
// let arabic=document.querySelector(".arabic");

// function lang(){

//   window.open('./routing/arabic.html')


// }
// arabic.addEventListener("click",lang)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};
