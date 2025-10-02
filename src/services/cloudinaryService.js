import mime from 'mime'; // npm install mime

export async function uploadSingleMedia(fileUri) {
  // Detect MIME type
  const mimeType = mime.getType(fileUri);
  if (!mimeType) throw new Error('Unsupported file type');

  // Extract file name (fallback to media.ext)
  const fileName =
    fileUri.split('/').pop() ||
    `media.${mime.getExtension(mimeType) || ''}`;

  // Choose resource type based on MIME
  const resourceType = mimeType.startsWith('video')
    ? 'video'
    : mimeType.startsWith('image')
    ? 'image'
    : 'raw';

  // Build form data
  const data = new FormData();
  data.append('file', {
    uri: fileUri,
    type: mimeType,
    name: fileName,
  });
  data.append('upload_preset', 'unsigned_preset');

  // Send to correct endpoint
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/drllaq8do/${resourceType}/upload`,
    {
      method: 'POST',
      body: data,
    }
  );

  // Parse JSON response
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || 'Upload failed');

  return json.secure_url; // the hosted file URL
}

export async function uploadMultipleMedia(fileUris = []) {
  // Returns an array of uploaded URLs
  const uploadedUrls = await Promise.all(
    fileUris.map(async (uri) => {
      if (uri.startsWith('http')) return uri; // already uploaded
      return await uploadSingleMedia(uri);
    })
  );
  return uploadedUrls;
}


export function getCloudinaryUrl(pathOrUrl) {
  if (!pathOrUrl) return null;

  if (pathOrUrl.startsWith('http')) return pathOrUrl;

  return `https://res.cloudinary.com/drllaq8do/${pathOrUrl}`;
}

export function getCloudinaryUrls(urls = []) {
  return urls.map(getCloudinaryUrl);
}
