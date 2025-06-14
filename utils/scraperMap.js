import * as byPopular from '../scrapers/popular/index.js';

// params ?type=
export const scraperMap = {
    popular: {
        _default: 'mostfollow',
        mostfollow: byPopular.getPopularMostFollow,
        rating: byPopular.getPopularByRating,
    }
};

// no use, but ill keep it anyway