$('#registerLink').click(function() {
  $('#registration-div').show();
});

$(document).ready(function(){
  
  $('#login-form').on('submit', function(e){
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    bhApi.login(data, function (err, data){
      if (err){
        console.error(err);
        return false;
      }
        console.log('login response data ' + data);
        userData.userName = data.userName;
        userData.userId = data._id;
        bhApi.dashboard(function(err, data){
          if(err){console.error}
          else{
            console.log("this data is passed to handlebars");
            console.log(data);

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
    console.log(data);
    bhApi.register(data, function (err, data){
      if (err){
        console.error(err);
        $('#errorAlert').show();
        setTimeout(function(){
          $('#errorAlert').hide();
        }, 3000);
      } else {
      $('#successAlert').show();
       setTimeout(function(){
        $('#registration-div').hide();
        }, 3000);
        $('#successAlert').hide();
        console.log(data.user._id);
        console.log(data);
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



