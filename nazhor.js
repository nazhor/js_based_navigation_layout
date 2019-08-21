$(document).ready(function(){
    var pages = [ "#page0", "#page1" ];
    var currentPage = 0;
    var navToPage = 0;
    var isPlaying = false;
    var animDuration = 750;
    var direction = {
        Right: 0,
        Left: 1
    };

    $("#nav-right").click(function(){
        navigate(direction.Right);
    });

    $("#nav-left").click(function(){
        navigate(direction.Left);
    });

    function navigate( currentDire ) {

        if (!isPlaying){
            var formWith = $(window).width();
            var destinyX = 0;

            if (currentPage == 0){
                navToPage = 1;
            }else {
                navToPage = 0;
            }

            if (currentDire == direction.Right) {
                $(pages[navToPage]).css("left", -formWith);
                destinyX = formWith;
            }else {
                $(pages[navToPage]).css("left", formWith);
                destinyX = -formWith;
            }

            $(pages[navToPage]).show();

            isPlaying = true;
            $(pages[navToPage]).animate(
                {
                    left: 0
                },
                {
                    duration: animDuration
                }
            );
            $(pages[currentPage]).animate(
                {
                    left: destinyX
                },
                {
                    duration: animDuration,
                    complete: function() { hide_element() }
                }
            );

            function hide_element() {
                $(pages[currentPage]).hide();
                currentPage = navToPage;
                isPlaying = false;
            };
        }
    };

    //Touch gesture via hammer.js
    var let_the_hammer = new Hammer(document);
    let_the_hammer.on('panright panleft', function(e) {
        e.preventDefault();
        if (e.type == 'panright') {
            navigate(direction.Right);
        } else {
            navigate(direction.Left);
        }
    });

});