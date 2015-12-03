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

 var fakePostUpdateData = {
  title: "UPDATE DATA test",
  entry: "We updated a post from the front end!"
 };

var fakePostId = "5660683bcfb42add8d9ed4ab";
var fakePostDeleteId = "5660672fcfb42add8d9ed4a8";

var fakePostUpdateData = {
  page: '56605e2b5309dfd1878b0842',
  owner: '5660572cd7e2bb7882989d99',
  title: "UPDATEtest",
  entry: "We updated a post from the front end!"

 };

 // fake data ends HERE
var userData = {userName: null, userPage: null, userId: null};

var bhHelpers = {
  wrap: function (root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  },

  form2object: function(form) {
    var data = {};
    $(form).find('input').each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  }
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

  dashboard: function(callback){
    this.ajax({
      method: 'GET',
      url: this.bh + '/dashboard',
      xhrFields: {
        withCredentials: true
      },
      dataType: 'json',
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

  deletePost: function(postId, callback) {
    this.ajax({
      method: 'DELETE',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/post/' + postId,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
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


var dashboardHandlers = function(){
  $(document).ready(function(){
    $('#create-post').on('submit', function(e) {
      console.log('you have entered the handler');

      e.preventDefault();
      var postData = bhHelpers.form2object(this);
      postData.owner = userData.userId;
      console.log(postData);
      var callback = function(err, data) {
        if (err){console.error}
        else {
          console.log("You have created a Post!");
        }
      };
      bhApi.createPost(postData, callback);
    });

    $('.edit-post').on('click', function(e) {
     e.preventDefault();
     var postId = $(e.target).data('postid');
     console.log("postid" + postId);
     bhApi.updatePost(fakePostUpdateData, postId, function (err, data){
      if (err){
        console.error(err);
      } else {
        console.log("UPDATED");
         }
      });
    });


    $('.delete-post').on('click', function(e) {
     e.preventDefault();
     var postId = $(e.target).data('postid');
     console.log("postid" + postId);
     bhApi.deletePost(postId, function (err, data){
      if (err){
        console.error(err);
      } else {
        console.log("DELTETED");
         }
      });
    });
  });
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
        bhApi.dashboard(function(err, data){
          if(err){console.error}
          else{
            console.log("this data is passed to handlebars");
            console.log(data);
            userData.userName = data.userName;
            userData.userId = data._id;
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

  $('#logout').on('click', function(e){
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

  bhApi.deletePost(fakePostDeleteId, function(err, data){
    if (err){
    console.error(err);
    } else {
    console.log('You deleted a post. FOR REALS.', data);
    }
  });
});
