var direction = "left";
var active = false;
var vidas = 0;
var puntos = 0;
var audio = document.getElementById("audio");
var disolver = document.getElementsByClassName("disolver")[0];
var speed = "";

$(".shield-float").css("left", getRamdom());

function getRamdom() {
    var minNumber = 0;
    var maxNumber = 950;
    var randomnumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
    return randomnumber;
}
var contShield = 0;
var timeShield = false;
var statusShield = 0;

function velocidad() {
    /*ancho de la persona 70px */
    var shield = $(".shield-float");
    var person = $(".person");
    var shieldPos = $(".shield-float").position().left;

    var personPos = person.position().left;
    var posFinal = 0;
    var maximo = 1000;
    var personaw = 70;
    var velnormal = 3;
    var aleatorio = Math.round(Math.random() * 8);
    // var shieldFloat = setInterval(function(){ 

    // }, 1000);

    perOut = personPos + 75;
    shieldOut = shieldPos + 50;
    //console.log(timeShield);
    if (timeShield) {
        if (statusShield == 500) {
            shield.css("left", getRamdom());
            shield.css("opacity", 1);
            statusShield = 0;
            timeShield = false;
        } else {
            statusShield++;
        }
    }

    if ((shieldPos < personPos && personPos < shieldOut) ||
        (shieldPos > personPos && perOut > shieldOut)) {
        timeShield = true;
        contShield++;
        if (contShield < 5) {
            shield.css("left", -70);
            shield.css("opacity", 0);
            $(`.shieldwin_${contShield}`).css("background-image", "url('img/escudo2.png')");
        } else {
            active = false;
            window.clearInterval(speed);
            speed = "";
            audio.setAttribute("src", "audio/conitowin.mp4");

            audio.play();
            $(".disolver ").css("background-image", 'url("img/TOBINOWINS.png")');
            $(".disolver ").css("display", "block");
            $(".loser").each(function() {
                $(this).hide();
            });
            $(".return").css("display", "block");
            $(".con ").css("display", "none");

            $(".person").css("background-image", 'url("img/tubinofeliz.gif")');
            vidas = 0;
            $(".life_1").removeClass("life_down");
            $(".life_2").removeClass("life_down");
            return false;

        }

        //console.log(contShield);
    }
    if (aleatorio == 50) {
        var velnormal = 15;
    }
    if (direction == "left") {
        posFinal = personPos + velnormal;

        if (posFinal + personaw > maximo) {
            direction = "right";
            person.css("background-image", 'url("img/TUBINOGIF1.gif")');
        }
    } else if (direction == "right") {
        posFinal = personPos - velnormal;

        if (posFinal < 0) {
            direction = "left";
            person.css("background-image", 'url("img/TUBINOGIF2.gif")');

        }
    }
    person.css("left", posFinal);

}

$(document).ready(function() {

    $(".return").css("display", "none");
    // speed = setInterval(velocidad, 6);
    // $( ".hide" ).on( "", function(e) {
    //     console.log("holi");
    //     $( e ).css( "display", "none" );
    // });

    $(".hide").each(function() {
        $(this).hide();
    });

});

function show() {
    return $(this).css("display", "block");
}

function hide() {
    return $(this).css("display", "none");
}


$(".action").on("click", function() {
    active = true;
    audio.play();
    speed = setInterval(velocidad, 6);
    $(".hide").each(function() {
        $(this).show();
    });
    $(".message, .action ").each(function() {
        $(this).hide();
    });
    $(".buttons, .return").css("display", "none");
});
// $(document).keypress(function(e) {
//     if (e.which == 13) {
//         speed = setInterval(velocidad, 6);
//     }
// });

$(".return").on("click", function() {
    location.reload();
});

var pane = $('.fondo'),
    box = $('.hand'),
    con = $('.con'),
    w = pane.width() - box.width(),
    d = {},
    x = 3;

function newv(v, a, b) {
    if (active) {
        var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
        return n < 0 ? 0 : n > w ? w : n;
    }

}

$(window).keydown(function(e) {
    d[e.which] = true;

    if (e.which == 40 && active) {
        box.css("background-image", 'url("img/hand_a.png")');
        perpos = $(".person").position();
        conpos = $(".con").position();

        window.clearInterval(speed);
        active = false;
        conposlefac = conpos.left;
        conpostopac = conpos.top;
        perIn = perpos.left;
        conIn = conpos.left;
        perOut = perIn + 75;
        conOut = conIn + 75;

        //console.log(conIn+"-"+perIn+"  "+perOut+"-"+conOut);
        //console.log(conIn < perIn && perIn < conOut);
        //console.log(conIn > perIn && perOut > conIn);
        if (
            conIn == perIn ||
            (conIn < perIn && perIn < conOut) ||
            (conIn > perIn && perOut > conOut)) {

            // var bgImage = $(".person").css("background-image");
            // var indeximg = bgImage.indexOf("img");
            // var ruta = bgImage.substring(indeximg, bgImage.length - 2);
            // $(".person").css("background-image", `url("${ruta}")`);

            $(".con").animate({ "left": perIn, "top": 520 }, function() {
                $(".con").fadeOut(function() {
                    // $(".person").css("background-image", 'url("../img/tubino_4.png")');
                    $(".person").css("transform", "rotateY(0deg)");

                    $(".con").css({ "top": conpostopac, "left": conposlefac });

                    // $(".con").fadeIn();
                    $(".person").css("background-image", 'url("img/tobino_sad.gif")');
                    $(".person").css("width", "100px");
                    $(".person").css("height", "280px");
                    $(".person").css("background-size", "100% 100%");


                    active = false;
                    speed = "";
                    audio.setAttribute("src", "audio/DISOLVER.mp4");
                    audio.play();
                    $(".disolver").css("display", "block");
                    $(".return").css("display", "block");
                    $(".loser").each(function() {
                        $(this).hide();
                    });

                });

            });
        } else {
            $(".con").animate({ "top": 690 }, function() {
                $(".con").fadeOut(function() {
                    $(".con").css({ "top": conpostopac, "left": conposlefac });
                    con.css("background-image", 'url("img/cono.png")');
                    vidas = vidas + 1;
                    if (vidas >= 3) {
                        active = false;
                        audio.setAttribute("src", "audio/conitowin.mp4");
                        audio.play();
                        $(".disolver ").css("background-image", 'url("img/TOBINOWINS.png")');
                        $(".disolver ").css("display", "block");
                        $(".loser").each(function() {
                            $(this).hide();
                        });
                        $(".return").css("display", "block");
                        $(".con ").css("display", "none");

                        $(".person").css("background-image", 'url("img/tubinofeliz.gif")');
                        vidas = 0;
                        $(".life_1").removeClass("life_down");
                        $(".life_2").removeClass("life_down");
                        return false;

                    } else {
                        $(".life_" + vidas).addClass("life_down");
                        active = true;
                        $(".con").fadeIn();

                        speed = window.setInterval(velocidad, 6);
                    }

                });
                con.css("background-image", 'url("img/cono4.png")');
            });
        }


    }
});
$(window).keyup(function(e) { d[e.which] = false; });

setInterval(function() {
    box.css({
        left: function(i, v) { return newv(v, 37, 39); }
    });
    con.css({
        left: function(i, v) { return newv(v, 37, 39); }
    });

}, 10);