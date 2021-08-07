import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  itemForm = new FormGroup({
    nome: new FormControl(''),
  });
  itens: Item[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getAllItens().subscribe((itens: Item[]) => this.itens = itens);
  }
  getAllItens(): Observable<Item[]> {
    return this.http.get<Item[]>(environment.apiUrl + '/itens')
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
