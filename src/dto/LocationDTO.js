// LocationDTO.js
export default class LocationDTO {
  constructor({ id, name, description, category, mediaUrls, latitude, longitude }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.mediaUrls = mediaUrls ?? [];
    this.latitude = latitude;
    this.longitude = longitude;

    // Split media types
    this.images = this.mediaUrls.filter(url =>
      url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );
    this.videos = this.mediaUrls.filter(url =>
      url.match(/\.(mp4|mov|avi|mkv)$/i)
    );
    this.audios = this.mediaUrls.filter(url =>
      url.match(/\.(mp3|wav|ogg)$/i)
    );


  }

  getThumbnail() {
    return this.media.length > 0 ? this.media[0] : null;
  }
}
