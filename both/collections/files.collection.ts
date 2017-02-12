import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'

import { File, Subject } from '../models/file.model'

export const Files = new MongoObservable.Collection<File>('files')
export const Subjects = new MongoObservable.Collection<Subject>('subjects')

function loggedIn() {
    return !!Meteor.user()
}

Files.allow({
    insert: loggedIn,
    remove: loggedIn,
    update: loggedIn
})

Subjects.allow({
    insert: loggedIn,
    remove: loggedIn,
    update: loggedIn
})