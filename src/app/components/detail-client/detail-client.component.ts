import { Component, OnInit, inject, input } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { PrimengComponentsModule } from '../../primeng-components/primeng-components.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [
    PrimengComponentsModule,
    ReactiveFormsModule
  ],
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.css'
})
export class DetailClientComponent implements OnInit{

  public client = input<Client>();

  private clientService = inject(ClientService);
  private fb = inject(FormBuilder);

  
  public formEditClient: FormGroup;

  dialogEditVisible: boolean = false;
  dialogConfirmVisible: boolean = false;

  ngOnInit(): void {

    this.formEditClient = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(8)]],
      last_name: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.min(18)]],
      phone_number: ['', [Validators.required]]
    });

  }

  // Funcion que maneja la visibilidad del dialog para editar un cliente
  // y se mapea los campos con datos del cliente seleccionado
  showDialogEdit() {
    this.dialogEditVisible = true;

    this.formEditClient = this.fb.group({
      first_name: [this.client().first_name, [Validators.required, Validators.minLength(3)]],
      last_name: [this.client().last_name, [Validators.required, Validators.minLength(3)]],
      address: [this.client().address, [Validators.required, Validators.min(8)]],
      phone_number: [this.client().phone_number, [Validators.required]]
    });

  }

  // Funcion que edita informacion de un cliente
  async formEditSubmit(): Promise<void> {
    console.log(this.formEditClient);
    if (this.formEditClient.valid) {
      try {
        const updatedClient = await this.clientService.updateClient(this.client().id, this.formEditClient.value);
        console.log('Cliente actualizado correctamente');
        this.dialogEditVisible = false;
      } catch (error) {
        console.error('Error al actualizar el cliente:');
      }
    }
  }

  // Funcion que maneja la visibilidad del dialog para eliminar un cliente
  showDialogDelete() {
    this.dialogConfirmVisible = true;
  }

  // Funcion para confirmar que quiere borrar el cliente
  showConfirm() {
    this.clientService.deleteClient(this.client()!.id);
    this.dialogConfirmVisible = false;
  }
}
