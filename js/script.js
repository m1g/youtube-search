// Searchbar Handler

$(() => {
  const searchField = $('#query');
  const icon = $('#search-btn');

  // Focus Event Handler
  $(searchField).on('focus', function(){
    $(this).animate({
      width: '100%'
    }, 400)
    $(icon).animate({
      right: '10px'
    }, 400)
  })

  // Blur Event Handler
  $(searchField).on('blur', function(){
    if (searchField.val() == '') {
      $(searchField).animate({
        width: '45%'
      }, 400, function() {})
      $(icon).animate({
        right: '360px'
      }, 400, function() {})
    }
  })

  $('#search-form').submit(function(e){
    e.preventDefault()
  })
 })

 const search = () => {
   // clear results
   $('results').html('')
   $('buttons').html('')

   // Get From Input
   q = $('#guery').val()

   // Run GET request on API
   $.get(
     "https://www.googleapis.com/youtube/v3/search", {
       part: 'snippet, id',
       q: q,
       type: 'video',
       key: 'AIzaSyDT8lXVfqcbXH5nLrgeotrBuRO2iD4-ZKU'},
       function(data) {
         var nextPageToken = data.nextPageToken
         var prevPageToken = data.prevPageToken

         console.log(data)

         $.each(data.items, (i, item) => { // Custom Function for Data Output
           // Get Output
           let output = getOutput(item)

           // Display Results
           $('#results').append(output)
         })

         var buttons = getButtons(prevPageToken, nextPageToken)

         // Display Buttons
 				$('#buttons').append(buttons);
 			}
 	);
 }

 // Build Output
 function getOutput(item){
 	var videoId = item.id.videoId;
 	var title = item.snippet.title;
 	var description = item.snippet.description;
 	var thumb = item.snippet.thumbnails.high.url;
 	var channelTitle = item.snippet.channelTitle;
 	var videoDate = item.snippet.publishedAt;

 	// Build Output String
 	var output = '<li>' +
 	'<div class="list-left">' +
 	'<img src="'+thumb+'">' +
 	'</div>' +
 	'<div class="list-right">' +
 	'<h3>'+title+'</h3>' +
 	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
 	'<p>'+description+'</p>' +
 	'</div>' +
 	'</li>' +
 	'<div class="clearfix"></div>' +
 	'';

 	return output;
 }
 
// Build the buttons
function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">'+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	} else {
		var btnoutput = '<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
	}

	return btnoutput;
}
