import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { TasksCollection } from '/imports/api/db/tasksCollection';

import '/imports/api/userMethods';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

Meteor.startup(async () => {
  ServiceConfiguration.configurations.upsert({
    service: 'facebook'
  },{
    $set: {
      loginStyle: 'popup',
      appId: Meteor.settings.facebook.appId,
      secret: Meteor.settings.facebook.secret
    }
  })
  TasksCollection.createIndex({ title: 'text'});
});
