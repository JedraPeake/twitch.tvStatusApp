var streamUsernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

$(document).ready(function(){
  //check just FCC stream first
  $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/' + "freecodecamp", function(data) {
    if(data.stream === null){
      $('#fcc').html("Freecodecamp is Offline");
    }
    else{
      $('#fcc').html("Freecodecamp is Online");
    }
  });
  
   $('#results-header').prepend("<div class='row'>"+"<div class='col-md-3'>"+"<h4>Icon</h4>"+"</div>"
                             +"<div class='col-md-3'>"+"<h4>Channel Name</h4>"+"</a>"+"</div>"
                             +"<div class='col-md-3'>"+"<h4>Status</h4>"+"</div>"
                             +"<div class='col-md-3'>"+"<h4>Viewers</h4>"+"</div>");

  //gets all the streams
  streamUsernames.forEach(function(currentStream){
    var status;
    $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/' + currentStream, function(data) {

      if(data.stream === null){
        status= "offline";
        console.log(currentStream +" offline " +status);

        $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + currentStream, function(resp){

          if (resp.status === 404) {
            resp.display_name = channel;
            resp.logo = "https://dummyimage.com/48x48/000/fff.png&text=404";
            resp.url = "";
            var status = resp.error;
          }

          var info = {
            display_name: resp.display_name,
            img: resp.logo,
            url: resp.url,
            status: ((status) ? status : 'Offline')
          }
          console.log(info)
          
          $('#results').append("<div class='row'>"+"<div class='col-md-3'>"+"<img height='42' width='42' src= '"+info.img+"' />"+"</div>"
                             +"<div class='col-md-3'>"+"<p>"+"<a href="+info.url+" target='blank'>"+info.display_name+"</p>"+"</a>"+"</div>"
                             +"<div class='col-md-3'>"+"<p>"+info.status+"</p>"+"</div>"
                             +"<div class='col-md-3'>"+"<p>-</p>"+"</div>"+"</div>");
          
          
          
        });
        
        

      }

      else {
        status= "online";
        console.log(currentStream +" online "+status);

        var myData = data.stream;
        var info = {
          game: myData.game,
          viewers: myData.viewers,
          img: myData.preview.template.replace(/{width}|{height}/g, '48'),
          status: myData.channel.status,
          display_name: myData.channel.display_name,
          views: myData.channel.views,
          url: myData.channel.url
        }
        console.log(info);
        
       

        $('#results').prepend("<div class='row'>"+"<div class='col-md-3'>"+"<img height='42' width='42' src= '"+info.img+"' />"+"</div>"
                             +"<div class='col-md-3'>"+"<p>"+"<a href="+info.url+" target='blank'>"+info.display_name+"</p>"+"</a>"+"</div>"
                             +"<div class='col-md-3'>"+"<p>"+info.status+"</p>"+"</div>"
                             +"<div class='col-md-3'>"+"<p>"+info.viewers+"</p>"+"</div>"+"</div>");
      

      }



    });


  });

});





