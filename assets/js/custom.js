jQuery(document).ready(function($) {
    // if (document.querySelector(".offer")) {
    //     GetClientCounter();
    // }

    $(".testi-slider .slick-arrow").click((e) => {
        e.preventDefault();

        $(".testi-slider .slick-arrow").removeClass("testiActive");
        setTimeout(() => {
            $(this).addClass("testiActive");
        }, 200);

        console.log("clicking");
    });

    $(".toggle-password").click(function() {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    if ($("#back-to-top").length) {
        var scrollTrigger = 500, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $("#back-to-top").addClass("show");
                } else {
                    $("#back-to-top").removeClass("show");
                }
            };
        backToTop();
        $(window).on("scroll", function() {
            backToTop();
        });
        $("#back-to-top").on("click", function(e) {
            e.preventDefault();
            $("html,body").animate(
                {
                    scrollTop: 0,
                },
                700
            );
        });
    }

    // $('.faqs-container .faq-singular:first-child')
    //   .addClass('active')
    //   .children('.faq-answer')
    //   .slideDown(); //Remove this line if you dont want the first item to be opened automatically.
    // $('.faq-question').on('click', function () {
    //   if ($(this).parent().hasClass('active')) {
    //     $(this).next().slideUp();
    //     $(this).parent().removeClass('active');
    //   } else {
    //     $('.faq-answer').slideUp();
    //     $('.faq-singular').removeClass('active');
    //     $(this).parent().addClass('active');
    //     $(this).next().slideDown();
    //   }
    // });

    // function search() {
    //   // var searchInp = $(".faq_search").val()..trim();
    //   // if (searchInp === "") {
    //   //   $(".faq_grid").show();
    //   //   return true;
    //   // }

    //   // $(".faq_grid:not(:contains(" + searchInp + "))").hide();
    //   // $(".faq_grid:contains(" + searchInp + ")").show();
    //   // return true;

    //   var searchInp = $('.faq_search').val().toLowerCase();
    //   if (searchInp.length > 0) {
    //     $('.faq_grid').filter(function () {
    //       $(this).toggle($(this).text().toLowerCase().indexOf(searchInp) > -1);

    //       $('.faqs-container .faq-singular:first-child')
    //         .removeClass('active')
    //         .children('.faq-answer')
    //         .slideUp();
    //     });
    //   }
    //   return true;
    // }

    // $('.faq_search').on('keyup', search);
    // $('.icon').on('click', search);

    // COUNTER

    // function GetClientCounter() {
    //     var x = 0;
    //     $(window).scroll(() => {
    //         let topO = $(".offer").offset().top - window.innerHeight;

    //         if (x == 0 && $(window).scrollTop() > topO) {
    //             $(".value-counter").each(function() {
    //                 var $this = $(this),
    //                     countTo = $this.attr("data-count");

    //                 $({
    //                     countNum: $this.text(),
    //                 }).animate(
    //                     {
    //                         countNum: countTo,
    //                     },
    //                     {
    //                         duration: 6000,
    //                         easing: "swing",
    //                         step: function() {
    //                             $this.text(Math.floor(this.countNum));
    //                         },
    //                         complete: function() {
    //                             $this.text(this.countNum);
    //                         },
    //                     }
    //                 );
    //             });
    //             x = 1;
    //         }
    //     });
    // }
});
