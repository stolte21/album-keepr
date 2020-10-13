export default (albums) => {

    // artists
    const uniqueArtists = new Set();

    albums.forEach(({ artist }) => {
        uniqueArtists.add(artist);
    });

    const artistOptions = Array.from(uniqueArtists).sort().map(artist => (
        { title: artist, value: artist }
    ));

    // years
    const thisYear = new Date().getFullYear();
    const minYear = 1900;

    let years = [];
    for (let year = minYear; year <= thisYear; year++) {
        years.push(year.toString());
    }

    const yearOptions = years.reverse().map(year => (
        { title: year, value: year }
    ));

    const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    const ratingOptions = ratings.map(rating => (
        { title: rating, value: rating }
    ));

    return { artistOptions, yearOptions, ratingOptions };
};