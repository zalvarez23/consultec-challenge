import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientModel } from 'src/domain/models/client.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  @Input() dataSource: ClientModel[];
  @Output() handlerDeleteClient = new EventEmitter<number>();
  displayedColumns: string[] = [
    'name',
    'phone',
    'email',
    'location',
    'status',
    'delete',
  ];
  constructor() {
    this.dataSource = [];
  }

  deleteClient(clientId: number) {
    this.handlerDeleteClient.emit(clientId);
  }
}
