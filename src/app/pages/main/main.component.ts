import { Component, OnInit, inject } from '@angular/core';
import { DetailClientComponent } from '../../components/detail-client/detail-client.component';
import { ItemListClientComponent } from '../../components/item-list-client/item-list-client.component';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interfaces/client.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimengComponentsModule } from '../../primeng-components/primeng-components.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    DetailClientComponent,
    ItemListClientComponent,
    ReactiveFormsModule,
    PrimengComponentsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit{
  
  private clientService = inject( ClientService );
  private fb = inject(FormBuilder);

  selectedClient: Client;

  public formAddClient: FormGroup;

  public listClient: Client[] = [];

  public dialogAddVisible: boolean = false;
  public messageWarnin: string;
  
  ngOnInit(): void {
    // this.getClients();

    this.formAddClient = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(8)]],
      last_name: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.min(18)]],
      phone_number: ['', [Validators.required]]
    });
  }

  // Funcion para obtener lista de clientes
  async getClients() {
    try {
      this.listClient = await this.clientService.getClients();
      // console.log('Data fetched:', this.listClient);
    } catch (error) {
      console.error('Error al obtener lista de clientes');
    }
  }

  // Funcion para agregar un cliente
  async formAddSubmit(): Promise<void> {

    if (this.formAddClient.valid) {
      try {
        const newClient = await this.clientService.createClient(this.formAddClient.value);
        console.log('Client created successfully:', newClient);
        this.dialogAddVisible = false;
      } catch (error) {
        console.error('Error al crear el cliente:');
        this.messageWarnin = "Ha ocurrido un problema. Intentelo mas tarde"
      }
    }
  }

  // Funcion que selecciona un cliente en la lista
  onClientSelected(client: Client) {
    this.selectedClient = client;
  }

  showDialogAdd() {
    this.formAddClient.reset();
    this.messageWarnin = "";
    this.dialogAddVisible = true;
  }
}
