import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { get } from '@ember/object';
import WithTokenActions from 'consul-ui/mixins/token/with-actions';
export default Route.extend(WithTokenActions, {
  repo: service('tokens'),
  settings: service('settings'),
  queryParams: {
    s: {
      as: 'filter',
      replace: true,
    },
  },
  model: function(params) {
    const repo = get(this, 'repo');
    return hash({
      ...repo.status({
        items: repo.findAllByDatacenter(this.modelFor('dc').dc.Name),
      }),
      isLoading: false,
      currentAccessorID: get(this, 'settings').findBySlug('accessor_id'),
    }).then(function(model) {
      return hash({
        ...model,
        ...{
          isLegacy: model.items.find(function(item) {
            return get(item, 'Legacy') === true;
          }),
        },
      });
    });
  },
  setupController: function(controller, model) {
    this._super(...arguments);
    controller.setProperties(model);
  },
});
