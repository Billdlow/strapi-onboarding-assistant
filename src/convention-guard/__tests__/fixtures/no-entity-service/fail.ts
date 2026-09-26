// fixture: fails no-entity-service
const result = await strapi.entityService.findMany('api::article.article');
export {};
