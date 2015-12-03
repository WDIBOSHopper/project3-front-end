var signupData = {
  username: "sam2",
  email: "s@s",
  password: "1"
};

var signinData = {
  email: 'rachel3',
  password: 123
};

var fakePostData = {
  page: '56605e2b5309dfd1878b0842',
  owner: '5660572cd7e2bb7882989d99',
  title: "test",
  entry: "We posted from the front end!"

 };

var fakePostId = "5660683bcfb42add8d9ed4ab";

var fakePostUpdateData = {
  page: '56605e2b5309dfd1878b0842',
  owner: '5660572cd7e2bb7882989d99',
  title: "UPDATEtest",
  entry: "We updated a post from the front end!"

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
  },

  // retrieve all posts
  getPosts: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.bh + '/post',
      dataType: 'json',
    }, callback);
  },

  createPost: function(data, callback) {
   this.ajax({
        method: 'POST',
        // url: 'http://httpbin.org/post',
        url: this.bh + '/post',
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
      }, callback);
  },

  updatePost: function(data, postId, callback) {
   this.ajax({
        method: 'PATCH',
        // url: 'http://httpbin.org/post',
        url: this.bh + '/post/' + postId,
        xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
      }, callback);
  },

  createPage: function(data, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/page',
      xhrFields: {
          withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
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
        $('#successAlert').hide();
        console.log(data.user._id);
        
        bhApi.createPage({title: "My Blog", content: "A blog for me.", owner: data.user._id}, function(err, data){
            if (err){
            console.error(err);
            } else {
            console.log('You created a post. FOR REALS.', data);
            }
        });
      }
    });
  });

  $('#logout').on('click', function(){
    e.preventDefault();
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

  $('#createPostForm').on('submit', function(e){
    e.preventDefault();
    var newPost = {

    };
  });

  bhApi.updatePost(fakePostUpdateData, fakePostId, function(err, data){
    if (err){
    console.error(err);
    } else {
    console.log('You updated a post. FOR REALS.', data);
    }
  });
});
