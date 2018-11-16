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
  
  $("#lensup").click(function(){
    console.log('vote up');
    vote('lensflare', true);
    getVotes('lensflare', 'lensupvotes', 'lensdownvotes');
  });
  
  $("#lensdown").click(function(){
    console.log('vote down');
    vote('lensflare', false);
    getVotes('lensflare', 'lensupvotes', 'lensdownvotes');
  });
  
  $("#knucklesup").click(function(){
    console.log('vote up');
    vote('knuckles', true);
    getVotes('knuckles', 'knucklesupvotes', 'knucklesdownvotes');
  });
  
  $("#knucklesdown").click(function(){
    console.log('vote down');
    vote('knuckles', false);
    getVotes('knuckles', 'knucklesupvotes', 'knucklesdownvotes');
  });
  
  $("#hitmarkerup").click(function(){
    console.log('vote up');
    vote('hitmarker', true);
    getVotes('hitmarker', 'hitmarkerupvotes', 'hitmarkerdownvotes');
  });
  
  $("#hitmarkerdown").click(function(){
    console.log('vote down');
    vote('hitmarker', false);
    getVotes('hitmarker', 'hitmarkerupvotes', 'hitmarkerdownvotes');
  });
  
  $("#trapup").click(function(){
    console.log('vote up');
    vote('trap', true);
    getVotes('trap', 'trapupvotes', 'trapdownvotes');
  });
  
  $("#trapdown").click(function(){
    console.log('vote down');
    vote('trap', false);
    getVotes('trap', 'trapupvotes', 'trapdownvotes');
  });
  
  
  $("#deleteComments").click(function() {
      $.getJSON('delete', function(data) {
        var everything  = data;
        $("#status").html(everything);
        $("#comments").html(null);
      });
  });
  
  //initialize comments from DB
  getComments("lensflare", "lenscomments");
  getComments("knuckles", "knucklescomments");
  getComments("hitmarker", "hitmarkercomments");
  getComments("trap", "trapcomments");
  
  getVotes('lensflare', 'lensupvotes', 'lensdownvotes');
  getVotes('knuckles', 'knucklesupvotes', 'knucklesdownvotes');
  getVotes('hitmarker', 'hitmarkerupvotes', 'hitmarkerdownvotes');
  getVotes('trap', 'trapupvotes', 'trapdownvotes');

});

function getVotes(type, outputup, outputdown) {
  console.log('retrieve votes');
  var json = {Type:type};
  //var json = JSON.stringify(obj);
  
  $.getJSON('vote', json, function(data) {
    $('#'+outputup).html(data[0].Up);
    $('#'+outputdown).html(data[0].Down);
  });
}

function vote(type, up) {
  var obj = {Type:type, Vote:up};
  var json = JSON.stringify(obj);
  
  $.ajax({
    url:'vote',
    type:"POST",
    data:json,
    contentType:"application/json; charset=utf-8",
    success: function(data, textStatus) {
        console.log(data);
    }
  });
  
}

function getComments(memetype, output) {
  var json = {
    Type:memetype
  };
  
  $.getJSON('query', json, function(data) {
    //console.log(data);
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
