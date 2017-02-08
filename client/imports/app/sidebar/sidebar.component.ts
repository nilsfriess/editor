import { Component, ElementRef } from '@angular/core'
import template from './sidebar.component.html'
import style from './sidebar.component.sass'

import { Observable } from 'rxjs/Observable'

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
        'Zuletzt verwendet',
        'Übersicht',
        //'Einstellungen'
    ]
    private currentCategory: string

    private type: string = "category"
    private showModal: boolean = false

    constructor(private fileService: FileService, private elementRef: ElementRef) {
        this.currentCategory = this.categories[1]

        document.addEventListener('click', (event) => {
            if (!this.elementRef.nativeElement.contains(event.target))
                this.showModal = false
        })
    }

    changeCategory(category: string) {
        this.currentCategory = category
    }

    deleteFileClicked(file) {
        this.fileService.deleteFile(file)
    }

    deleteSubjectClicked(subject) {
        this.fileService.deleteSubject(subject)
    }

    getNameOfSubjectID(subjectID) {
        if (Subjects.findOne(subjectID))
            return Subjects.findOne(subjectID).name

        return ''
    }
}