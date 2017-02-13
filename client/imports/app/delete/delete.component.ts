import { Component, Input, Output, EventEmitter } from '@angular/core'

import template from './delete.component.html'
import style from './delete.component.sass'

@Component({
    selector: 'delete-modal',
    template,
    styles: [ style ]
})
export class DeleteModalComponent {
    @Input() objectName: string
    @Output() onClick = new EventEmitter<boolean>()

    buttonClicked(yes: boolean) {
        this.onClick.emit(yes)
    }
}