import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatListModule,
    MatAutocompleteModule
  ],
  declarations: [ContactListComponent],
  exports:[ContactListComponent]
})
export class ContactListModule { }