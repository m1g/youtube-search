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

 function search() {
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

         $.each(data.items, function(i, item) { // Custom Function for Data Output
           // Get Output
           var output = getOutput(item)

           // Display Results
           $('#results').append(output)
         })
       }
   )
 }
