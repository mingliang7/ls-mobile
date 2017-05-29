import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    console.log(process.env.METEOR_SETTINGS)  
    let mail = process.env.METEOR_SETTINGS;
    process.env.MAIL_URL=JSON.parse(mail).mail_url
    console.log(process.env.MAIL_URL)
});
