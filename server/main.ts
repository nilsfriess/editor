import { Meteor } from 'meteor/meteor'

import { loadFiles } from './imports/fixtures/files'

Meteor.startup(() => {
    loadFiles()
})