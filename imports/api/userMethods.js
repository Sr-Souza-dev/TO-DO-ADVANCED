import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
    'user.update'(name, lastname, company, email, birthday, gender, imageUrl){
        if (!this.userId) throw new Meteor.Error('Not authorized.');
        check(name, String);
        check(lastname, String);
        check(company, String);
        check(email, String);
        check(birthday, String);
        check(imageUrl, String);
        check(gender, String);
        
        Meteor.users.update({_id: Meteor.userId()}, {
            $set: {
                profile: {
                    name: name,
                    lastname: lastname,
                    company: company,
                    email: email,
                    birthday: birthday,
                    gender: gender,
                    image: imageUrl
                }
            }
        });
    }
    
});
