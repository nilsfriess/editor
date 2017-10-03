import { Injectable } from '@angular/core'
import { Observable, Subject as oSubject } from 'rxjs'
import { Meteor } from 'meteor/meteor'


import { File as mFile, Subject} from '../../../both/models/file.model'
import { Files, Subjects } from '../../../both/collections/files.collection'

@Injectable()
export class FileService {

    private files: mFile[]
    private subjects: Subject[]

    private currentFile: mFile

    private subjectSubscription
    private filesSubscription

    currentFileObservable: oSubject<any>
    subjectObservable: any

    constructor() {
        this.subscribeFilesAndSubjects()

        this.currentFileObservable = new oSubject()
    }

    subscribeFilesAndSubjects() {
        this.subjectObservable = Subjects.find({
            owner: Meteor.userId()
        })
        this.subjectSubscription = this.subjectObservable.subscribe((subject) => {
            this.subjects = Subjects.find({
                owner: Meteor.userId()
            }, {
                sort: {
                    name: 1
                }
            }).fetch()
        })
        let files = Files.find({
                owner: Meteor.userId()
            })
        this.filesSubscription = files.subscribe((file) => {
            this.files = Files.find({
                owner: Meteor.userId()
            }, {
                sort: {
                    lastSave: 1
                }
            }).fetch()
        })
    }

    getFiles(): mFile[] {
        if (!Meteor.user())
            return []
        
        return this.files.sort((a,b) => {
            if (a.name < b.name)
                return -1
            if (a.name > b.name)
                return 1
            return 0
        })
    }

    getSubjects(): Subject[] {
        if (!Meteor.user())
            return []
        return this.subjects
    }

    setCurrentFile(newFile: mFile = null) {
        this.currentFile = newFile

        this.currentFileObservable.next(newFile)
    }

    getCurrentFile(): mFile {
        if (!this.currentFile) {
            let m: mFile = {
                name: '',
                content: '',
                createdAt: new Date(),
                subjectID: '-1',
                owner: '0'
            }

            return m
        } else {
            return this.currentFile
        }
    }

    getCurrentFileObservable(): Observable<any> {
        return this.currentFileObservable
    }

    getSubjectObservable(): Observable<any> {
        return this.subjectObservable
    }

    getRecentFiles(): mFile[] {
        if (!this.files)
            return []
        if (this.files.length < 5)
            return this.files
        return this.files.slice(this.files.length - 5)
    }

    createFile(name: string, createdAt: Date, subject: Subject) {
        Files.insert({
            name: name,
            content: '',
            createdAt: createdAt,
            subjectID: subject._id,
            owner: Meteor.userId()
        })
    }

    deleteFile(file: mFile) {
        Files.remove({_id: file._id})
    }

    createSubject(name: string, color: string = '#000000') {
        name = name.toUpperCase()

        Subjects.insert({
            name: name,
            color: color,
            collapsed: true,
            owner: Meteor.userId()
        })
    }

    deleteSubject(subject: Subject) {
        this.files.forEach((file) => {
            if (file.subjectID === subject._id)
                Files.remove({
                    _id: file._id
                })
        })

        Subjects.remove({
            _id: subject._id
        })
    }

    newUser() {
        this.files = []
        this.subjects = []
        this.subjectSubscription.unsubscribe()
        this.filesSubscription.unsubscribe()

        let loggingInTimer = Observable.timer(0, 100)
        let subscription = loggingInTimer.subscribe(() => {
            if (!Meteor.loggingIn() && Meteor.user()) {
                this.subscribeFilesAndSubjects()
                subscription.unsubscribe()
            }
        })
    }

    getSubjectOfFile(file: mFile): Subject {
        return Subjects.findOne(file.subjectID)
    }
}