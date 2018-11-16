/* global $ */
$(document).ready(function(){
  $("#postlens").click(function(){
      postComment("lensflare",$("#lenscomment").val(), "lenscomments");
  });
  
  $("#postknuckles").click(function(){
      postComment("knuckles",$("#knucklescomment").val(), "knucklescomments");
  });
  
  $("#posthitmarker").click(function(){
      postComment("hitmarker",$("#hitmarkercomment").val(), "hitmarkercomments");
  });
  
  $("#posttrap").click(function(){
      postComment("trap",$("#trapcomment").val(), "trapcomments");
  });
  
  $("#getComments").click(function() {
      $.getJSON('comment', function(data) {
          var everything = "<ul>";
          for (var comment in data) {
              var com = data[comment];
              everything += "<li>" + com.Comment + "</li>";
          }
          everything += "</ul>";
          $("#status").html("Updated all comments");
          $("#comments").html(everything);
      });
  });
  
  $("#deleteComments").click(function() {
      $.getJSON('delete', function(data) {
        var everything  = data;
        $("#status").html(everything);
        $("#comments").html(null);
      });
  });
  
  $("#queryComments").click(function() {
      var url = "query";
      var name = $("#query").val();
      var json = {
        Name:name
      };
      
      $.getJSON('query', json, function(data) {
        
        var everything = "<ul>";
        for (var comment in data) {
          var com = data[comment];
          everything += "<li>" + com.Name + "<br>" + com.Comment + "</li>";
        }
        everything += "</ul>";
        
        $("#status").html("Retrieved comments for: " + name);
        $("#comments").html(everything);
      });
  });
  
  //grab lens flare comments
  $("#test").html("completed");
  getComments("lensflare", "lenscomments");
  getComments("knuckles", "knucklescomments");
  getComments("hitmarker", "hitmarkercomments");
  getComments("trap", "trapcomments");
});

function getComments(memetype, output) {
  var json = {
    Type:memetype
  };
  
  $.getJSON('query', json, function(data) {
    console.log(data);
    if (data[0] == null) {
      $('#' + output).html("No comments have been posted yet. Be the first!");
      return;
    }
    var everything = "<ul>";
    for (var comment in data) {
      var com = data[comment];
      everything += "<li>" + com.Comment + "</liv>";
    }
    everything += "</ul>";
    $('#' + output).html(everything);
  })
}

function postComment(type, comment, output) {
  var myobj = {Type:type,Comment:comment};
  var jobj = JSON.stringify(myobj);
  var url = "comment";
  $.ajax({
      url:url,
      type:"POST",
      data:jobj,
      contentType:"application/json; charset=utf-8",
      success: function(data, textStatus) {
          getComments(type, output);
      }
  });
}

  $("#postComment").click(function(){
      var myobj = {Type:"lensflare",Comment:$("#comment").val()};
      var jobj = JSON.stringify(myobj);
      
      var url = "comment";
      $.ajax({
          url:url,
          type:"POST",
          data:jobj,
          contentType:"application/json; charset=utf-8",
          success: function(data, textStatus) {
              $("#status").html("Posted comment");
              $("#comments").html("");
          }
      });
  });