import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-error-dlg',
    templateUrl: './error-dlg.component.html',
    imports: [],
    standalone: true
})

export class ErrorDlgComponent{
    @Input()
    message: string = "";

    @Output()
    closeDlg: EventEmitter<boolean> = new EventEmitter();

    closeDialog() {
        this.closeDlg.emit(true);
    }
}