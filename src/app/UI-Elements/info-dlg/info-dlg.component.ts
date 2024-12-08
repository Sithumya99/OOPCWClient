import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-info-dlg',
    templateUrl: './info-dlg.component.html',
    imports: [],
    standalone: true
})

export class InfoDlgComponent {
    @Input()
    message: string = "";

    @Output()
    closeDlg: EventEmitter<boolean> = new EventEmitter();

    closeDialog() {
        this.closeDlg.emit(true);
    }
}