import { moduleFor, test } from 'ember-qunit';

moduleFor('route:dc/acls/policies/create', 'Unit | Route | dc/acls/policies/create', {
  // Specify the other units that are required for this test.
  needs: [
    'service:policies',
    'service:tokens',
    'service:dc',
    'service:feedback',
    'service:logger',
    'service:settings',
    'service:flashMessages',
  ],
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
