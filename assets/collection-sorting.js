$(function(){

  if( $('#CollectionSort').length ) {

      var collectionSort = $('#CollectionSort'),
        $sortSelect = $('#SortSelect'),
        $noResults = $('.no-results'),
        $container = $('#collectionSortContainer');

	var hash = location.hash;
    var settings = {
    	
	animation: {
		duration: 310,
		effects: 'fade',
		easing: 'cubic-bezier(0.47, 0, 0.745, 0.715)'
	}
    };
    if( hash.search('filter-') != -1 ) {
		hash = '.' + hash.replace('#filter-', '');
      var settings = {
        load: {
          filter: hash
        },
        
	animation: {
		duration: 310,
		effects: 'fade',
		easing: 'cubic-bezier(0.47, 0, 0.745, 0.715)'
	}
      };
    } 
    $container.mixItUp(settings);

    collectionSort.on('change', function(){
      $container.mixItUp('filter', this.value);
    });


  }
  var didLoad = false;
  $container.one('mixLoad', function(){
    console.log('run');
    if( didLoad == false && hash != '') { 
      collectionSort.find('option[value="' + hash + '"]').attr('selected', true)
    	didLoad = true;
    }
  });
  
  $container.on('mixEnd', function(e, state){
    if( state.totalShow < 1 ) {
		$noResults.addClass('-show');
    } else {
		$noResults.removeClass('-show');
    }
});
  
  $(window).on('hashchange', function(e){
	var hash = location.hash;
    if( hash.search('filter-') != -1 ) {
		hash = '.' + hash.replace('#filter-', '');
      	$container.mixItUp('filter', hash, false);
        collectionSort.find('option[value="' + hash + '"]').attr('selected', true);
    } 
  });
  
  
});
