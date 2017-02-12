import { CollectionObject } from './collection-object.model'

export interface File extends CollectionObject {
    name: string,
    content: string,
    createdAt: Date,
    subjectID: string,
    owner: string,
    lastSave?: Date
}

export interface Subject extends CollectionObject {
    name: string,
    color?: string,
    collapsed: boolean,
    owner: string
}