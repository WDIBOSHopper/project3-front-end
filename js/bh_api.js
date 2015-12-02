var signupData = {
  username: "sam2",
  email: "s@s",
  password: "1"
};

var signinData = {
  email: 'rachel3',
  password: 123
};



var bhApi = {

  bh: 'http://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/signup',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
  },

  login: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/login',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, function() {
        $.ajaxSetup({
            xhrFields : {
                withCredentials : true
            }
        });
        callback.apply(this, arguments);
    });
  },

  logout: function(callback) {
    this.ajax({
      method: 'DELETE',
      url: this.bh + '/logout/',
    }, callback);
  }

  // retrieve all posts
  getPosts: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.bh + '/post',
      dataType: 'json',
    }, callback);
  }
};


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
      console.log("you have logged in");
      console.log(data);
      bhHandlebars.displayDashboard(data);
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
      }
    });
  });

  $('#logout').on('click', function(){
    bhApi.logout(function(err, data){
      if (err){console.error}
        else {
          console.log("You have logged out");
        }
    });
  });
  // initial rendering of posts onto homepage
  bhApi.getPosts(function (err, data) {
  if (err){
    console.error(err);
    } else {
    console.log('successful return of get Post request', data);
    bhHandlebars.displayHomepage(data);
    };
  });
  // end of get posts for homepage rendering

  $('#logout').on('click', function(){
    bhApi.logout(function(err, data){
      if (err){console.error}
        else {
          console.log("You have logged out");
        }
    });
  });
});
