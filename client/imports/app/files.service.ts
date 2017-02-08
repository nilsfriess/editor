import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { File as mFile, Subject} from '../../../both/models/file.model'
import { Files, Subjects } from '../../../both/collections/files.collection'

@Injectable()
export class FileService {

    private files: mFile[]
    private subjects: Subject[]

    private currentFile: mFile

    constructor() {
        Subjects.find().subscribe((subject) => {
            this.subjects = Subjects.find().fetch()
        })
        Files.find().subscribe((file) => {
            this.files = Files.find().fetch()
        })
    }

    getFiles(): mFile[] {
        return this.files
    }

    getSubjects(): Subject[] {
        return this.subjects
    }

    setCurrentFile(newFile: mFile) {
        this.currentFile = newFile
    }

    getCurrentFile(): mFile {
        if (!this.currentFile) {
            let m: mFile = {
                name: '',
                content: '',
                createdAt: new Date(),
                subjectID: '-1'
            }

            return m
        } else {
            return this.currentFile
        }
    }

    createFile(name: string, createdAt: Date, subject: Subject) {
        Files.insert({
            name: name,
            content: '',
            createdAt: createdAt,
            subjectID: subject._id
        })
    }

    deleteFile(file: mFile) {
        Files.remove({_id: file._id})
    }

    createSubject(name: string, color: string = '') {
        Subjects.insert({
            name: name,
            color: color,
            collapsed: true
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
}