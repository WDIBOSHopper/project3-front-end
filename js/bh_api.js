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
      dataType: 'json'
    }, callback);
  },

   login: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  logout: function(callback) {
    this.ajax({
      method: 'DELETE',
      url: this.bh + '/logout/',
    }, callback);
  },

};

// $('#registrationForm').on('submit', function(){
//   console.log("submitted");
//   return false;
// });

$('#registrationForm').on('submit', function(e){
  e.preventDefault();
  var data = this.serialize();
  bhApi.register(data, function (err, data){    
    if (err){
      console.error(err);
      return false;
    } 
    console.log(data);
    return false;
  });
});  
