var $ = jQuery;
var scrolledTop = false;

//nav
$(".burger").on("click",function() {
  $("nav").toggleClass('show');
  $(".burger").toggleClass('burger-show');
});

$(".nav-link").click(function(e) {
  scrolledTop = true;
  $("#scroll").css({ display: "none" });
  $(".burger").toggleClass('burger-show');
  $("nav").toggleClass('show');
  e.preventDefault();
  $("html,body").animate({
    scrollTop: $(
      $(this)
        .parent("a")
        .attr("href")
    ).offset().top
  });
});

$(window).on("scroll", checkHighlightLink);

function checkHighlightLink() {
  var pos = $(window).scrollTop();
  if (pos >= $("#top").offset().top) {
    highlightLink("0");
  }
  if (pos >= $("#snake").offset().top) {
    highlightLink("1");
  }
  if (pos >= $("#about").offset().top) {
    highlightLink("2");
  }
  // if (pos >= $("#projects").offset().top) {
  //   highlightLink("3");
  // }
  if (
    pos >= $("#form").offset().top ||
    pos + $(window).height() === $(document).height()
  ) {
    highlightLink("4");
  }

  function highlightLink(number) {
    $(".nav-link").removeClass("active");
    $(".nav-link:eq(" + number + ")").addClass("active");
  }
}

//top

window.addEventListener("load", function(evt) {
  var pos = $(window).scrollTop();
  if (pos > $("#top").offset().top) {
    scrolledTop = true;
    $("#scroll").css({ display: "none" });
  }
});

window.addEventListener("scroll", function(evt) {
  var pos = $(window).scrollTop();
  if (!scrolledTop) {
    if (pos < $("#snake").offset().top) {
      scrolledTop = true;
      $("#scroll").css({ display: "none" });
      $("html,body").animate({
        scrollTop: $("#snake").offset().top
      });
    }
  }
});

//snake

window.addEventListener("resize", resizeSnake);
window.addEventListener("load", resizeSnake);

function resizeSnake() {
  if ($(document).width() <= 1024 || $("#snake-game").css('display') == 'none') {
    $("#skills-box").css({
      "padding-left": "0"
    });
    skills.forEach(element => {
      let image = $("#" + element.alt);
      image.fadeOut(0, function() {
        image.attr("src", "icon-black/logo-" + element.alt + "2.png");
        image.fadeIn(2000);
      });
      image.siblings().css({ color: "#111" });
      $("#" + element.alt + "-battery .battery-green:eq(3)").css({
        "background-color": "#649655"
      });
      setTimeout(() => {
        $("#" + element.alt + "-battery .battery-green:eq(2)").css({
          "background-color": "#649655"
        });
      }, 300);
      setTimeout(() => {
        $("#" + element.alt + "-battery .battery-green:eq(1)").css({
          "background-color": "#649655"
        });
      }, 600);
      setTimeout(() => {
        $("#" + element.alt + "-battery .battery-green:eq(0)").css({
          "background-color": "#649655"
        });
      }, 900);
      $("#" + element.alt + "-battery .battery-yellow:eq(1)").css({
        "background-color": "#c1b051"
      });
      setTimeout(() => {
        $("#" + element.alt + "-battery .battery-yellow:eq(0)").css({
          "background-color": "#c1b051"
        });
      }, 500);
      $("#" + element.alt + "-battery .battery-red").css({
        "background-color": "#af6057"
      });
    });
  } else {
    $("#skills-box").css({
      "padding-left": "5em"
    });
    skills.forEach(element => {
      let image = $("#" + element.alt);
      jQuery("#" + element.alt).fadeOut(0, function() {
        image.attr("src", "icon-black/logo-" + element.alt + ".png");
        image.fadeIn(2000);
      });
      image.siblings().css({ color: "#2b2b2b" });
      $("#" + element.alt + "-battery .battery-green").css({
        "background-color": "#434343"
      });
      $("#" + element.alt + "-battery .battery-yellow").css({
        "background-color": "#434343"
      });
      $("#" + element.alt + "-battery .battery-red").css({
        "background-color": "#434343"
      });
    });
  }
}

//projects

window.addEventListener("resize", resizeProject);
window.addEventListener("load", resizeProject);

function resizeProject() {
  if ($(document).width() <= 768) {
    $(".project-overlay").css({ display: "none" });
    $(".projects-container").css({ "grid-template-columns": "1fr 1fr" });
    $(".project").unbind("click");
  } else {
    $(".project-overlay").css({ display: "flex" });
    $(".projects-container").css({ "grid-template-columns": "1fr 1fr 2fr" });
    $(".project-big .project-overlay").css({ display: "none" });

    $(".project").bind("click", function() {
      let index = $(".project").index(this);
      let indexBig = $(".project-big").index();
      let actualProject = $(".project:eq(" + index + ")");

      $(".project:eq(" + indexBig + ")").css({
        "grid-column": actualProject.css("grid-column"),
        "grid-row": actualProject.css("grid-row")
      });
      $(".project-big .project-overlay").css({ display: "flex" });
      $(".project:eq(" + indexBig + ")").removeClass("project-big");
      actualProject.css({ "grid-column": "3 / auto", "grid-row": "1 / 3" });
      actualProject.addClass("project-big");
      $(".project-big .project-overlay").css({ display: "none" });
    });
  }
}

$(".project").click(function() {
  let index = $(".project").index(this);
  let indexBig = $(".project-big").index();
  let actualProject = $(".project:eq(" + index + ")");

  $(".project:eq(" + indexBig + ")").css({
    "grid-column": actualProject.css("grid-column"),
    "grid-row": actualProject.css("grid-row")
  });
  $(".project-big .project-overlay").css({ display: "flex" });
  $(".project:eq(" + indexBig + ")").removeClass("project-big");
  actualProject.css({ "grid-column": "3 / auto", "grid-row": "1 / 3" });
  actualProject.addClass("project-big");
  $(".project-big .project-overlay").css({ display: "none" });
});

//form

$("#message").focus(function() {
  $(this).attr("placeholder", "");
});
$("#message").focusout(function() {
  $(this).attr("placeholder", "Wiadomość");
});

$("#name").focus(function() {
  $(this).attr("placeholder", "");
});
$("#name").focusout(function() {
  $(this).attr("placeholder", "Imię");
});

$("#mail").focus(function() {
  $(this).attr("placeholder", "");
});
$("#mail").focusout(function() {
  $(this).attr("placeholder", "Email");
});

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault(); 
  alert('Niestety ta opcja jest niedostępna, skontaktuj sie za pomocą LinkedIn lub napisz na maila wojciech.lasak@outlook.com');
});

//about

$(".about-bold:eq(0)").click(function() {
  $("#about-container img").attr("src", "img/rysy.jpeg");
  $(".about-bold:eq(0)").css({
    color: "#875a31",
    "font-weight": "500",
    cursor: "default"
  });
  setTimeout(() => {
    $("#about-container img").attr("src", "img/wojtek.jpg");
    $(".about-bold:eq(0)").css({
      color: "#c56913",
      "font-weight": "700",
      cursor: "pointer"
    });
  }, 5000);
});

window.addEventListener("load", checkHighlightLink);
