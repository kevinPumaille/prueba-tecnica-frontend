import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ConfirmDialogModule,
    DialogModule,
    
  ]
})
export class PrimengComponentsModule { }
