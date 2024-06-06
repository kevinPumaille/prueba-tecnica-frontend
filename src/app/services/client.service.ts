import { Injectable } from '@angular/core';
import axios from 'axios';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly apiUrl = 'https://cfb4c081-b76a-4462-889f-9c59bb638329.mock.pstmn.io';

  constructor() { }

  // Función para obtener datos de clientes
  async getClients(): Promise<Client[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/clients`);
      // console.log( response.data)
      return response.data;
    } catch (error) {
      console.error('Error al obtener lista de clientes:');
      throw error;
    }
  }

  // Función para crear un nuevo cliente
  async createClient(clientData: Partial<Client>): Promise<Client> {
    try {
      const response = await axios.post(`${this.apiUrl}/clients/`, clientData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el cliente:');
      throw error;
    }
  }

  // Función para actualizar un cliente por ID
  async updateClient(clientId: string, clientData: Partial<Client>): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/clients/${clientId}`, clientData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar cliente con ID ${clientId}:`);
      throw error;
    }
  }

  // Función para eliminar un cliente por ID
  async deleteClient(clientId: string): Promise<void> {
    try {
      const response = await axios.delete(`${this.apiUrl}/clients/${clientId}`);

      if (response.status === 200) {
        console.log('Se elimino exitosamente');
        return;
      }

    } catch (error) {
      console.error(`Error al borrar cliente con ID ${clientId}:`, error);
      throw error;
    }
  }

}
