import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOCATIONS } from 'src/constans/constans';
import { ClientModel } from 'src/domain/models/client.model';
import { LocationModel } from 'src/domain/models/location';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output() handlerNewClient = new EventEmitter<ClientModel>();
  locations: LocationModel[] = [];
  public registroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.locations.push(...LOCATIONS);
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      idLocation: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.registroForm.valid) {
      const newClient = this.registroForm.value as ClientModel;
      newClient.location = this.locations.find(
        (location) => location.id === newClient.idLocation
      );
      this.handlerNewClient.emit(newClient);
    }
  }
}
