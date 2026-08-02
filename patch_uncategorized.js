const fs = require('fs');
const file = 'frontend/components/pages/dashboard/media/Uncategorized.vue';
let content = fs.readFileSync(file, 'utf8');

// We just rename the dialog button and title slightly for clarity, but in Uncategorized, move and link are basically the same since there's no old gallery.
content = content.replace('Move to gallery', 'Add to gallery');
content = content.replace('Move to Gallery</DialogTitle>', 'Add to Gallery</DialogTitle>');
content = content.replace('Move the selected images to an existing gallery or create a new one.', 'Add the selected images to an existing gallery or create a new one.');
content = content.replace('Move Images</Button>', 'Add Images</Button>');
// Wait, the API call should probably use `/medias/link-images` now, because `move-images` requires old_gallery_id to disconnect?
// No, `move-images` with no old_gallery_id just connects and doesn't disconnect. Both will work, but link-images is semantic.
content = content.replace("await axios.post('/medias/move-images'", "await axios.post('/medias/link-images'");
content = content.replace("'Images moved successfully'", "'Images added successfully'");
content = content.replace("'Failed to move images'", "'Failed to add images'");

fs.writeFileSync(file, content);
