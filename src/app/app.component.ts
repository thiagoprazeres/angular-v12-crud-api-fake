import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from './item';
import { ITENS } from './item.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  itemForm = new FormGroup({
    nome: new FormControl(''),
  });
  itens: Item[] = ITENS;
  constructor() { }
  ngOnInit() {
  }
  onSelect(item: Item): void {
    console.log(item);
  }
  create() {
    this.itens.push(this.itemForm.value);
    this.itemForm.reset();
  }
  delete(index: number) {
    this.itens.splice(index, 1)
  }
}
