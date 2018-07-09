var $=jQuery;
var scrolledTop = false;

//nav
$('#burger').focus(function(){
  $("#nav").css({"right": "0"});
  $('#burger').focusout(function(){
    $("#nav").css({"right": "-200px"});
  });
});

$('.nav-link').click(function(e){
  scrolledTop=true;
  $("#scroll").css({"display": "none"});
	e.preventDefault();
	$('html,body').animate({
		'scrollTop'	:	$($(this).children('a').attr('href')).offset().top
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
    $("#about-photo img").attr('src','img/wojtek2.jpg')
    $(".about-bold:eq(0)").css({'color': '#875a31', 'font-weight':'500', 'cursor':'default'})
    setTimeout(()=>{ 
      $("#about-photo img").attr('src','img/wojtek.jpg');
      $(".about-bold:eq(0)").css({'color': '#c56913', 'font-weight':'700','cursor':'pointer'})
    }, 5000);
});