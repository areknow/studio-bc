var handlebars  = require('handlebars');

handlebars.registerHelper('caption', function() {
  return `
    <span>${this.name}</span> - 
    ${this.width}x${this.height}”<br>
    ${this.sold ? 'Sold' : '$'+this.price}
  `;
});

module.exports = handlebars;