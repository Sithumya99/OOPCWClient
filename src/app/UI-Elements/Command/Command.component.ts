import { Component, Input } from "@angular/core";
import { command } from "../../Interfaces/BasicData.interface";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'app-command',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './Command.component.html',
})

export class CommandComponent {

    @Input()
    command: command | undefined;

    constructor() {}

    onCmdClick() {
        this.command?.execute();
    }
}