import { Component, input, output } from '@angular/core';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-item-list-client',
  standalone: true,
  imports: [],
  templateUrl: './item-list-client.component.html',
  styleUrl: './item-list-client.component.css'
})
export class ItemListClientComponent {

  public client = input<Client>();
  public clientSelected = output<Client>();

  // Funcion para emitir cliente seleccionado en la lista
  selectClient(client: any) {
    // console.log(client)
    this.clientSelected.emit(client);
  }
}
