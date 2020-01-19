// ====================================================================
// Home - js
// 
// Scripts for the home page
// ====================================================================

(() => {

  var mediaKey = '5e1bc2bb4cfae7143cefb0d2';
  var mediaServer = 'https://studiobc-77e3.restdb.io';
  var ajaxSettings = {
    async: true,
    crossDomain: true,
    url: `${mediaServer}/rest/gallery`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-apikey': '5e1bc2bb4cfae7143cefb0d2',
      'cache-control': 'no-cache'
    }
  }

  // ============================================
  // Document ready
  // ============================================
  $(() => {

    renderGrid();

    // Generate the masonry grid
    getGallery();

    // lightbox options
    var animDuration = 300;
    lightbox.option({
      showImageNumberLabel: false,
      fadeDuration: animDuration,
      imageFadeDuration: animDuration,
      resizeDuration: animDuration,
      maxHeight: 700,
    })

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
    new Macy({
      container: '.masonry',
      columns: 4,
      trueOrder: true,
      margin: {
        y: 30,
        x: 30,
      },
      breakAt: {
        1200: 4,
        940: {
          margin: {
            x: 10,
            y: 10,
          },
          columns: 3
        },
        520: 2,
        400: 1
      },
    });
  }

  /**
   * Build the masonry tile
   * @param element - the server response entry
   */
  const masonryItem = (element) => {
    return $('<a/>')
    .attr('href', masonryImage(element.image[0]))
    .attr('data-title', masonryCaption(element))
    .attr('data-lightbox', 'masonry-set')
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
