var $=jQuery;
var scrolledTop = false;

//nav
$('.burger').focus(function(){
  $("#nav").css({"right": "0"});
  $('.burger').focusout(function(){
    $("#nav").css({"right": "-200px"});
  });
});

$('.nav-link').click(function(e){
  scrolledTop=true;
  $("#scroll").css({"display": "none"});
	e.preventDefault();
	$('html,body').animate({
		'scrollTop'	:	$($(this).parent('a').attr('href')).offset().top
	});
});

$(window).on('scroll', function () {
  var pos = $(window).scrollTop();
  if (pos >= $('#top').offset().top)       { highlightLink('0'); }
  if (pos >= $('#snake').offset().top)      { highlightLink('1'); }
  if (pos >= $('#about').offset().top)  { highlightLink('2'); }
  if (pos >= $('#projects').offset().top)       { highlightLink('3'); }
  if (pos >= $('#form').offset().top ||
      pos + $(window).height() === $(document).height()) {
        highlightLink('4');}

  function highlightLink(number) {
    $('.nav-link').removeClass('active');
    $(".nav-link:eq("+number+")").addClass('active');
  }
});

//top

window.addEventListener('load', function(evt) {
  var pos = $(window).scrollTop();
  if (pos > $('#top').offset().top){
    scrolledTop=true;
    $("#scroll").css({"display": "none"});
} 

});

window.addEventListener('scroll', function(evt) {
  var pos = $(window).scrollTop();
  if(!scrolledTop){
    if (pos < $('#snake').offset().top){
        scrolledTop=true;
        $("#scroll").css({"display": "none"});
        $('html,body').animate({
          'scrollTop'	:	$("#snake").offset().top
        });
    } 
  }
});

//snake

window.addEventListener('resize',resizeSnake);
window.addEventListener('load',resizeSnake);

function resizeSnake(){
  if($(document).width()<=992){
    $("#snake-game").hide();
    $("#skills-box").removeClass('col-md-5');
    $("#skills-box").addClass('col-md-6');
    $('.battery-container ').removeClass('mr-4');
    $('.battery-container ').addClass('mr-3');
    $("#snake-button-container").hide();
    skills.forEach((element)=>{
      let image = $("#"+element.alt);
      image.fadeOut(0, function () {
        image.attr('src','icon-black/logo-'+element.alt+"2.png");
        image.fadeIn(2000);
      });
      image.siblings().css({"color": "#111"});
      $("#"+element.alt+"-battery .battery-green:eq(3)").css({"background-color": "#649655"});
      setTimeout(()=>{$("#"+element.alt+"-battery .battery-green:eq(2)").css({"background-color": "#649655"})},300);
      setTimeout(()=>{$("#"+element.alt+"-battery .battery-green:eq(1)").css({"background-color": "#649655"})},600);
      setTimeout(()=>{$("#"+element.alt+"-battery .battery-green:eq(0)").css({"background-color": "#649655"})},900);
      $("#"+element.alt+"-battery .battery-yellow:eq(1)").css({"background-color": "#c1b051"});
      setTimeout(()=>{$("#"+element.alt+"-battery .battery-yellow:eq(0)").css({"background-color": "#c1b051"})},500);
      $("#"+element.alt+"-battery .battery-red").css({"background-color": "#af6057"});
    
    });
  }else{
    $("#snake-button-container").show();
    $("#snake-game").show();
    $("#skills-box").addClass('col-md-5');
    $("#skills-box").removeClass('col-md-6');
    $('.battery-container ').addClass('mr-3');
    $('.battery-container ').removeClass('mr-4');
    skills.forEach((element)=>{
      let image = $("#"+element.alt);
      image.fadeOut(0, function () {
        image.attr('src','icon-black/logo-'+element.alt+".png");
        image.fadeIn(2000);
      });
      image.siblings().css({"color": "#2b2b2b"});
      $("#"+element.alt+"-battery .battery-green").css({"background-color": "#434343"});
      $("#"+element.alt+"-battery .battery-yellow").css({"background-color": "#434343"});
      $("#"+element.alt+"-battery .battery-red").css({"background-color": "#434343"});
    
    });
  }
  if($(document).width()<=768){
    $('.skills-icon').removeClass('col-md-2');
    $('.battery-container ').removeClass('col-md-1');
  }
  else{
    $('.skills-icon').addClass('col-md-2');
    $('.battery-container ').addClass('col-md-1');
  }

 
}

//projects

$(".project-big .project-overlay").css({'display': 'none'})

$('.project').click(function(){
  let index=$( ".project" ).index( this );
  let indexBig=$( ".project-big").index();
  let actualProject=$('.project:eq('+index+')');
  

  $( '.project:eq('+indexBig+')' ).css({"grid-column": actualProject.css("grid-column"), 'grid-row': actualProject.css("grid-row")})
  $(".project-big .project-overlay").css({'display': 'flex'})
  $( '.project:eq('+indexBig+')' ).removeClass('project-big');
  actualProject.css({"grid-column": '3 / auto', 'grid-row': '1 / 3'})
  actualProject.addClass("project-big");
  $(".project-big .project-overlay").css({'display': 'none'})

})

//form

$('#message').focus(function(){
    $(this).attr('placeholder','');
  });
  $('#message').focusout(function(){
    $(this).attr('placeholder','Wiadomość');
  });

  $('#name').focus(function(){
    $(this).attr('placeholder','');
  });
  $('#name').focusout(function(){
    $(this).attr('placeholder','Imię');
  });

  $('#mail').focus(function(){
    $(this).attr('placeholder','');
  });
  $('#mail').focusout(function(){
    $(this).attr('placeholder','Email');
  });


//about

$('.about-bold:eq(0)').click(function(){
    $("#about-container img").attr('src','img/wojtek2.jpg')
    $(".about-bold:eq(0)").css({'color': '#875a31', 'font-weight':'500', 'cursor':'default'})
    setTimeout(()=>{ 
      $("#about-container img").attr('src','img/wojtek.jpg');
      $(".about-bold:eq(0)").css({'color': '#c56913', 'font-weight':'700','cursor':'pointer'})
    }, 5000);
});

window.addEventListener('resize',resizeAbout);
window.addEventListener('load',resizeAbout);

function resizeAbout(){
  if($(document).width()<=768){
    $("#about-container").css({"display":"block"});
  }else $("#about-container").css({"display":"flex"});
}
