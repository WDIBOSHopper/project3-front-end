$('#registerLink').click(function() {
  $('#registration-div').show();
});

$(document).ready(function(){
  
  $('#login-form').on('submit', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    bhApi.login(data, function (err, data){
      if (err){
        console.error(err);
        return false;
      }
        userData.userName = data.userName;
        userData.userId = data._id;
        bhApi.dashboard(function(err, data){
          if(err){console.error}
          else{

            bhHandlebars.displayDashboard(data);
            dashboardHandlers();
          }
      });

      return false;
    });
  });

  $('#registration-form').on('submit', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $("#wait").show();
    bhApi.register(data, function (err, data){
      if (err){
        console.error(err);
        $("#wait").hide();
        $('#errorAlert').show();
        setTimeout(function(){
          $('#errorAlert').hide();
        }, 3000);
      } else {
      $("#wait").hide();  
      $('#successAlert').show();
       setTimeout(function(){
        $('#registration-div').hide();
        $('#successAlert').hide();
        }, 3000);
        
  
        bhApi.createPage({title: "My Blog", content: "A blog for me.", url: data.user.userName,  owner: data.user._id}, function(err, data){
            if (err){
            console.error(err);
            } else {
              console.log('my page created');
            }
        });
      }
    });
  });


});



