import * as byPopular from '../scrapers/popular/index.js';

export const scraperMap = {
    popular: {
        _default: 'mostfollow',
        mostfollow: byPopular.getPopularMostFollow,
        highestrating: byPopular.getPopularByRating,
    }
};
