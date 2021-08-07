import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  carregando = true;
  itemSearchForm = new FormGroup({
    nome: new FormControl(''),
  });
  itemForm = new FormGroup({
    nome: new FormControl(''),
  });
  itens: Item[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getAllItens()
  }
  getAllItens() {
    this.http.get<Item[]>(environment.apiUrl + '/itens').subscribe((itens: Item[]) => { this.itens = itens; this.carregando = false; });
  }
  create() {
    let novoItem = this.itemForm.value;
    let id = this.itens.length + 1;
    this.itens.push({ id: id, nome: novoItem.nome });
    this.http.post<Item>(environment.apiUrl + '/itens', { id: id, nome: novoItem.nome }).subscribe(res => console.log(res));
  }
  delete(id: Number) {
    this.http.delete(environment.apiUrl + '/itens/' + id);
    let index = this.itens.findIndex(d => d.id === id);
    this.itens.splice(index, 1);
  }
  update(item: Item) {
    this.http.put(environment.apiUrl + '/itens/' + item.id, item).subscribe(res => console.log(res));
  }
  search() {
    var q = this.itemSearchForm.value;
    if (q.nome) {
      this.http.get<Item[]>(environment.apiUrl + '/itens?q=' + q.nome).subscribe((itens: Item[]) => this.itens = itens);
    } else {
      this.getAllItens();
    }
  }
}
