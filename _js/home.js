// ====================================================================
// Home - js
// 
// Scripts for the home page
// ====================================================================

(() => {

  const mediaKey = '5e1bc2bb4cfae7143cefb0d2';
  const mediaServer = 'https://studiobc-77e3.restdb.io';

  const ajaxSettings = {
    async: true,
    crossDomain: true,
    url: `${mediaServer}/rest/gallery`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-apikey': '5e1bc2bb4cfae7143cefb0d2',
      'cache-control': 'no-cache'
    }
  };

  const chocolatOptions = {
    fullScreen: null,
  };
  
  const macyOptions = {
    container: '.masonry',
    columns: 5,
    trueOrder: true,
    margin: { y: 30, x: 30 },
    breakAt: {
      1200: 4,
      940: {
        margin: { x: 10, y: 10 },
        columns: 3
      },
      520: 2,
      400: 1
    },
  };

  // ============================================
  // Document ready
  // ============================================
  $(() => {

    // Generate the masonry grid and init lightbox
    getGallery();

  });// end document ready

  /**
   * Load the gallery from the server
   */
  const getGallery = () => {
    $.ajax(ajaxSettings).done((response) => {
      for (const element of response) {
        $('.masonry').append(masonryItem(element));
      }
    }).then(()=> {
      renderGrid();
    });
  }

  /**
   * Render the masonry grid
   */
  const renderGrid = () => {
    // Init Macy
    new Macy(macyOptions);
    // Init Chocolat
    $('.chocolat').Chocolat(chocolatOptions);
    // Hide page loader
    hidePageLoader();
  }

  /**
   * Hide page loader
   */
  const hidePageLoader = () => {
    $( ".page-loader-cover" ).fadeOut(500, function() {
      $( ".page-loader-cover" ).remove();
    });
  }

  /**
   * Build the masonry tile
   * @param element - the server response entry
   */
  const masonryItem = (element) => {
    return $('<a/>')
    .addClass('chocolat-image')
    .attr('href', masonryImage(element.image[0]))
    .attr('title', masonryCaption(element))
    .append(
      $('<img/>')
      .attr('src', masonryImage(element.thumbnail[0]))
    )
  }

  /**
   * Build the modal caption
   * @param element - the server response entry
   */
  const masonryCaption = (element) => {
    return `
      <span>${element.name}</span> - 
      ${element.width}x${element.height}”<br>
      ${element.sold ? 'Sold' : '$'+element.price}
    `;
  }

  /**
   * Build the image url
   * @param image - the media id
   */
  const masonryImage = (image) => {
    return `${mediaServer}/media/${image}?key=${mediaKey}`;
  }

})();
