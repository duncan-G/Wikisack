const html = require('html-template-tag');
const layout = require('./layout');

module.exports = (slug) =>
  layout(html`
    <div id="error">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you requested ${slug ? `'${slug}'` : ''} was not found</p>
      <button class="btn" onclick="window.location='/'">Browse Wiki</button>
    </div>
    ;
  `);
