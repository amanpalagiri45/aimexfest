// Compatibility loader for the previously misnamed JavaScript file.
// The source file is loaded as text so it works even when served with a .crdownload extension.
fetch('Unconfirmed%20828016.crdownload')
  .then(response => {
    if (!response.ok) throw new Error(`Could not load application code (${response.status})`);
    return response.text();
  })
  .then(source => Function(source)())
  .catch(error => {
    console.error(error);
    document.body.insertAdjacentHTML('beforeend', '<p style="padding:1rem;color:#b00020">The application could not load. Rename <code>Unconfirmed 828016.crdownload</code> to <code>app.js</code> if this error persists.</p>');
  });
