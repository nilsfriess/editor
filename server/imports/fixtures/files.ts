import { Files } from '../../../both/collections/files.collection'
import { File } from '../../../both/models/file.model'

export function loadFiles() {
    if (Files.find().cursor.count() === 0) {
        const files: File[] = [{
            name: 'Zusammenfassung 1',
            content: 'Test Test 123',
            createdAt: new Date(),
            subject: {name: 'Kategorie 1'}
        }, {
            name: 'Fragen zur Klausur',
            content: 'Frage 123',
            createdAt: new Date(),
            subject: {name: 'Kategorie 2'}
        },{
            name: 'Zusammenfassung 3',
            content: 'Test',
            createdAt: new Date(),
            subject: {name: 'Kategorie 1'}
        }]

        files.forEach((file: File) => Files.insert(file))
    }
}