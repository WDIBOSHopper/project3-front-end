createPage: function(data, callback) {
 this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/page',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
}

createPost: function(data, callback) {
 this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/post',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
}


updatePage: function(data, callback) {
 this.ajax({
      method: 'PATCH',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/page',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
}

updatePost: function(data, callback) {
 this.ajax({
      method: 'PATCH',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/post',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
}


deletePage: function(callback) {
 this.ajax({
      method: 'DELETE',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/page',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
}

deletePost: function(callback) {
 this.ajax({
      method: 'DELETE',
      // url: 'http://httpbin.org/post',
      url: this.bh + '/post',
      data: credentials,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
}

var dashboardHandlers = $(document.ready){
  $('#createPostForm').on('submit'){
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    bhApi.createPost(data, function (err, data){    
      if (err){
        console.error(err);
        return false;
      } 
      console.log(data);
      return false;
    });
  }

  $('#createPageForm').on('submit'){
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    bhApi.createPost(data, function (err, data){    
      if (err){
        console.error(err);
        return false;
      } 
      console.log(data);
      return false;
    });
  }


}



