const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () =>
  layout(html`
    <h3>Search by Tag</h3>
    <hr />
    <form method="POST" action="/wiki/search">
      <div class="form-group">
        <label for="search" class="col-sm-2 control-label">Search</label>
        <div class="col-sm-6">
          <input id="search" name="search" type="text" class="form-control" />
        </div>
      </div>

      <span class="col-sm-2">
        <button type="submit" class="btn btn-primary">submit</button>
      </span>
    </form>
  `);
