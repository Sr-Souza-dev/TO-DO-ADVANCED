import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/db/tasksCollection';

Meteor.publish('tasks', function publishTasks(justCompleted, textFilter){

    const filters = [
        {
            $or: [
                justCompleted ? {type: true, 'user.id': this.userId, status: 3} : {type: true, 'user.id': this.userId, status: {$ne: 3}},
                justCompleted ? {type: false, status: 3} : {type: false, status: {$ne: 3}}
            ]
        }
    ]

    if(textFilter){
        // filters.push({
        //     $text: {
        //         $search: { $regex: textFilter, $options: 'i' }
        //     }
        // })

        filters.push({
            title: { $regex: textFilter, $options: 'i' }
        })
    }

    return TasksCollection.find({
        $and: filters
    });
})