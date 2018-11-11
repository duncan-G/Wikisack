const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () =>
  layout(html`
    <div id="error">
      <h1>500</h1>
      <h2>Internal Server Error :(</h2>
      <p>Something went wrong. If problem persists please don't hesitate to conatct us.</p>
      <button class="btn" onclick="window.location='/'">Browse Wiki</button>
    </div>
    ;
  `);
