import { MongoObservable } from 'meteor-rxjs'

import { File, Subject } from '../models/file.model'

export const Files = new MongoObservable.Collection<File>('files')
export const Subjects = new MongoObservable.Collection<Subject>('subjects')