import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() title: string;
  @Input() showButton: boolean;
  @Output() handlerDownloadClients = new EventEmitter<void>();
  @Output() handlerSearchClients = new EventEmitter<string>();
  private searchTerms = new Subject<string>();
  searchClient: string;
  constructor() {
    this.title = '';
    this.showButton = true;
    this.searchClient = '';

    this.searchTerms
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.handlerSearchClients.emit(this.searchClient);
      });
  }

  onSearchClient(): void {
    this.searchTerms.next(this.searchClient);
  }
  downloadClients() {
    this.handlerDownloadClients.emit();
  }
}
