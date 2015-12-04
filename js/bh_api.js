

var userData = {userName: null, userId: null};

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
  },

  refreshPosts: function(){
    bhApi.getPosts(function (err, data) {
      if (err){
      console.error(err);
      } else {
      console.log('successful return of get Post request', data);
      bhHandlebars.refreshPosts(data);
      $(document).ready(function(){
        postHandler();
      });
      }
    });
  },

  refreshPages: function(){
    bhApi.getPages(function (err, data) {
      if (err){
      console.error(err);
      } else {
      console.log('successful return of get pages request', data);
      bhHandlebars.refreshPages(data);
      $(document).ready(function(){
        //page handlers go here
      });
      }
    });
  }

};


var bhApi = {

  bh: 'https://lit-brook-2992.herokuapp.com',

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

  getOnePost: function(postId, callback) {
    this.ajax({
      method: 'GET',
      url: this.bh + '/post/' + postId,
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

  getPages: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.bh + '/page',
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


var postHandler = function(){
  $('.delete-post').on('click', function(e) {
     e.preventDefault();
     var postId = $(e.target).data('postid');
     console.log("postid" + postId);
     bhApi.getPost(postId, function (err, data){
      if (err){
        console.error(err);
      } else {
        console.log("DELTETED");
         }
      });
    });

  $('.edit-post').on('click',function(e) {
     e.preventDefault();
     var postId = $(e.target).data('postid');
     console.log("postid" + postId);
     bhApi.getOnePost(postId, function (err, data){
      if (err){
        console.error(err);
      } else {
        console.log(data);
        bhHandlebars.editPost(data);
        $(document).ready(function(){
          $('#edit-post').on('click', function(e){
              e.preventDefault();
              var postData = bhHelpers.form2object(this);
              var postId = $(e.target).data('postid');

              var callback = function(err, data) {
                if (err){
                  console.log("Flagrant system error.");
                  console.error}
                else {
                  bhHelpers.refreshPosts();
                  console.log("You updated a Post!");
                }
              };
              bhApi.updatePost(postData, postId, callback);
           });
        });
       }
      });
    });

};



var dashboardHandlers = function(){
  $(document).ready(function(){
    postHandler();

    $('#create-post').on('submit', function(e) {
      e.preventDefault();
      var postData = bhHelpers.form2object(this);
      postData.owner = userData.userId;
      console.log(postData);
      var callback = function(err, data) {
        if (err){
          console.error
          $("#createPostMessage").val("Post created.");
        }
        else {
          console.log("You have created a Post!");
          $("#createPostMessage").html("Post created.");
          setTimeout(function(){
            $('#createPostMessage').html('');
            }, 3000);

          bhHelpers.refreshPosts();
        }
      };
      bhApi.createPost(postData, callback);

    });




    $('#create-page').on('submit', function(e) {
      console.log('you have entered the handler');

      e.preventDefault();
      var pageData = bhHelpers.form2object(this);
      pageData.owner = userData.userId;
      console.log(pageData);
      var callback = function(err, data) {
        if (err){console.error}
        else {
          console.log("You have created a Page!");
          $("#createPageMessage").html("Page created.");
          setTimeout(function(){
            $('#createPageMessage').html('');
            }, 3000);
          bhHelpers.refreshPages();
        }
      };
      bhApi.createPage(pageData, callback);
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

});
