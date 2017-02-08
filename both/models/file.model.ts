import { CollectionObject } from './collection-object.model'

export interface File extends CollectionObject {
    name: string,
    content: string,
    createdAt: Date,
    subjectID: string
}

export interface Subject extends CollectionObject {
    name: string,
    color?: string,
    collapsed: boolean
}