export default class TourDTO {
    constructor({ title, description, country, thumbnail, rating_avg, rating_n }) {
        this.title = title
        this.description = description
        this.country = country
        this.thumbnail = thumbnail
        this.rating_avg = rating_avg
        this.rating_n = rating_n
    }
}