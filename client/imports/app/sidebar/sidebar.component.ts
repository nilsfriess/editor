import { Component, ElementRef, ViewChild, ComponentRef } from '@angular/core'
import template from './sidebar.component.html'
import style from './sidebar.component.sass'

import { Observable } from 'rxjs/Observable'

import { AddModalComponent } from '../modal/modal.component'

import { Files, Subjects } from '../../../../both/collections/files.collection'
import { File, Subject } from '../../../../both/models/file.model'

import { FileService } from '../files.service'

@Component({
    selector: "sidebar",
    template,
    styles: [ style ]
})
export class SidebarComponent {

    private categories: string[] = [
        'Einstellungen',
        'Übersicht',
        'Zuletzt verwendet'
    ]
    private currentCategory: string

    private type: string = "category"
    private showModal: boolean = false

    private deleteModalObject: any = undefined
    private showDeleteModal: boolean = false
    
    constructor(private fileService: FileService, private elementRef: ElementRef) {
        this.currentCategory = this.categories[1]
    }

    changeCategory(category: string) {
        this.currentCategory = category
    }

    deleteFileClicked(file) {
        this.showDeleteModal = true
        this.deleteModalObject = file
        //
    }

    deleteSubjectClicked(subject) {
        this.showDeleteModal = true
        this.deleteModalObject = subject
        //this.fileService.deleteSubject(subject)
    }

    deleteModalClicked(yes: boolean) {
        if (yes) {
            if (this.deleteModalObject.subjectID) {
                this.fileService.deleteFile(this.deleteModalObject)
            } else {
                this.fileService.deleteSubject(this.deleteModalObject)
            }
        }
        this.showDeleteModal = false
    }

    getNameOfSubjectID(subjectID) {
        if (Subjects.findOne(subjectID))
            return Subjects.findOne(subjectID).name

        return ''
    }

    clickShowModal(modal: AddModalComponent) {
        this.showModal = true
        setTimeout(() => {
            modal.listenToClickEvent()
        }, 50)
    }

    clickedOutside(modal: AddModalComponent) {
        this.showModal = false
        modal.stopListenToClickEvent()
    }

    colorChange(subject: Subject, color) {
        console.log(subject.name, color)

        Subjects.update(subject._id, {
            $set: {
                color: color
            }
        })
    }

    onTitleChanged(subject: Subject, value: string) {
        Subjects.update(subject._id, {
            $set: { name: value }
        })
    }
}