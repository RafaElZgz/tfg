import { Directus } from '@directus/sdk';
import directusConfig from '~~/config/directus.config';

const directus = new Directus(directusConfig.url);

export default defineNuxtPlugin(() => {
    return {
        provide: { directus },
    };
});
