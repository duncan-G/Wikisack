const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () =>
  layout(html`
    <h3>Search by Tag</h3>
    <hr />
    <form method="POST" action="/wiki/search">
      <div class="form-group">
        <label for="search" class="col-sm-2 control-label">Search</label>
        <div class="col-sm-10">
          <input id="search" name="search" type="text" class="form-control" />
        </div>
      </div>

      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </form>
  `);
