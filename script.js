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

        });

      }

      else{
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

      }

    });


  });

});





