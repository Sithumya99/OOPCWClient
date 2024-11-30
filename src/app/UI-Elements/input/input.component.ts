import { Component, Input } from "@angular/core";
import { fieldInterface } from "../../Interfaces/BasicData.interface";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    imports: [CommonModule],
    standalone: true
})

export class InputComponent {

    @Input()
    fields: fieldInterface[] = [];

    isTextField(field: fieldInterface): boolean {
        return field.type === 'text';
    }

    isPasswordField(field: fieldInterface): boolean {
        return field.type === 'password';
    }

    isNumberField(field: fieldInterface): boolean {
        return field.type === 'number';
    }

    public saveChanges(event: Event, field: fieldInterface) {
        const inputElm = event.target as HTMLInputElement;
        field.setValue(inputElm.name, inputElm.value);
    }
}