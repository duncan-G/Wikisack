const html = require('html-template-tag');
const layout = require('./layout');

module.exports = (page, author) =>
  layout(html`
    <h3>Edit a Page</h3>
    <hr />
    <form id="update-form" method="POST" action="/wiki/${page.slug}">
      <div class="form-group">
        <label for="author" class="col-sm-2 control-label">Author</label>
        <div class="col-sm-10">
          <input
            id="author"
            name="author"
            type="text"
            value="${author.name}"
            class="form-control"
            readonly
          />
        </div>
      </div>

      <input
        id="email"
        name="email"
        type="hidden"
        class="form-control"
        value="${author.email}"
        disabled/>

      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Page Title</label>
        <div class="col-sm-10">
          <input
            id="title"
            name="title"
            type="text"
            class="form-control"
            value="${page.title}"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="content" class="col-sm-2 control-label">Page Content</label>
        <div class="col-sm-10">
          <textarea
            id="content"
            name="content"
            type="text"
            class="form-control"
            rows="10">${page.content}</textarea>
        </div>
      </div>

      <div class="form-group">
        <label for="tags" class="col-sm-2 control-label">Page Tags</label>
        <div class="col-sm-10">
          <input
            id="tags"
            name="tags"
            type="text"
            value="${page.tags.join(' ')}"
            placeholder="Enter space separated tags"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="content" class="col-sm-2 control-label">Status</label>
        <div class="col-sm-10">
          <select d="status" name="status" name="status" class="form-control">
            <option ${page.status === 'open' ? 'selected' : ''}>open</option>
            <option ${page.status === 'closed' ? 'selected' : ''}>closed</option>
          </select>
        </div>
      </div>

      <div class="col-sm-offset-2 col-sm-10">
        <button id='update-btn' type="submit" class="btn btn-primary" disabled>Update</button>
        <button onclick="window.locaton='/wiki/${page.slug}'" class="btn">Cancel</button>
      </div>

    </form>
    <script src="/js/editPage.js"> </script>
  `);
