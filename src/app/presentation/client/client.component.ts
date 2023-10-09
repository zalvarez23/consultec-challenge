import { Component, OnInit, inject } from '@angular/core';
import { ClientModel } from 'src/domain/models/client.model';
import { DeleteClientsUseCase } from 'src/domain/usecases/delete-clients.usecase';
import { GetClientsUseCase } from 'src/domain/usecases/get-clients.usecase';
import * as pdfMake from 'pdfmake/build/pdfmake';
import {
  DISPLAYED_COLUMNS,
  HEADER_PDF,
  ROBOTO_FONT,
} from 'src/constans/constans';

const fonts = {
  Roboto: {
    normal:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.3/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.3/fonts/Roboto/Roboto-Bold.ttf',
    italics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.3/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.3/fonts/Roboto/Roboto-BoldItalic.ttf',
  },
};

@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  private getClient = inject(GetClientsUseCase);
  private deleteClient = inject(DeleteClientsUseCase);
  private dataSourceC: ClientModel[];
  displayedColumns: string[] = DISPLAYED_COLUMNS;
  dataSource: ClientModel[];
  constructor() {
    this.dataSource = [];
    this.dataSourceC = [];
  }

  getClients() {
    this.getClient.execute().subscribe((clients) => {
      this.dataSource = clients;
      this.dataSourceC = [...clients];
    });
  }
  onHandlerDeleteClient(idClient: number) {
    this.deleteClient.execute(idClient).subscribe(() => {
      const newDataSource = this.dataSource.map((client) => {
        if (client.id === idClient) {
          client.isActive = false;
        }
        return client;
      });
      this.dataSource = newDataSource;
    });
  }

  getMatTableContent() {
    const content = {
      head: HEADER_PDF,
      body: this.dataSource.map((item: any) => [
        item.email,
        item.id,
        item.isActive ? 'Sí' : 'No',
        item.location?.name || '',
        item.name,
        item.phone,
      ]),
    };
    return content;
  }

  onHandlerDownloadClients() {
    const content = this.getMatTableContent();
    const documentDefinition = {
      content: [
        {
          table: {
            body: content.body,
          },
        },
      ],
      defaultStyle: {
        font: 'Roboto',
        fontSize: 12,
      },
      styles: {},
    };

    const fonts = {
      Roboto: {
        normal: ROBOTO_FONT,
      },
    };

    const tableLayouts = {
      customLayout: {
        hLineWidth: function (i: any, node: any) {
          return i === 0 || i === node.table.body.length ? 2 : 1;
        },
        vLineWidth: function (i: any, node: any) {
          return i === 0 || i === node.table.widths.length ? 2 : 1;
        },
        hLineColor: function (i: any, node: any) {
          return i === 0 || i === node.table.body.length ? 'black' : 'gray';
        },
        vLineColor: function (i: any, node: any) {
          return i === 0 || i === node.table.widths.length ? 'black' : 'gray';
        },
      },
    };

    pdfMake.createPdf(documentDefinition, tableLayouts, fonts).open();
  }

  onHandlerSearchClients(value: string): void {
    this.dataSource = this.dataSourceC.filter((data) =>
      data.name.toUpperCase().includes(value.toUpperCase())
    );
  }
  ngOnInit(): void {
    this.getClients();
  }
}
