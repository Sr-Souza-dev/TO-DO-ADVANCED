import {TasksCollection} from '/imports/api/db/tasksCollection';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
    'tasks.insert'(title, description, date, type, status){   
        if (!this.userId) throw new Meteor.Error('Not authorized.');
        check(title, String);
        check(description, String);
        check(date, String);
        check(type, Boolean);
        check(status, Number);
        TasksCollection.insert({
            title: title,
            description: description,
            date: date,
            type: type,
            status: status,
            user: {
                id: Meteor.userId(),
                name: Meteor.user()?.profile?.name || Meteor.user()?.username,
                image: Meteor.user()?.profile?.image 
            }
        });
    },

    'tasks.update'(id, title, description, date, type, status){   

        if (!this.userId) throw new Meteor.Error('Not authorized.');
        const task = TasksCollection.findOne({_id: id, 'user.id': this.userId});

        if(!task) throw new Meteor.Error('Access denied.');

        check(title, String);
        check(description, String);
        check(date, String);
        check(type, Boolean);
        check(status, Number);
        TasksCollection.update(id,{
            $set:{
                title: title,
                description: description,
                date: date,
                type: type,
                status: status,
                user: {
                    id: Meteor.userId(),
                    name: Meteor.user()?.profile?.name || Meteor.user()?.username,
                    image: Meteor.user()?.profile?.image 
                }
            }
        });
    },

    'tasks.remove'(id){
        if (!this.userId) throw new Meteor.Error('Not authorized.');
        const task = TasksCollection.findOne({_id: id});

        if(!task) throw new Meteor.Error('Access denied.');

        TasksCollection.remove(id);
    }
})