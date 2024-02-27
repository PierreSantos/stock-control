import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient, private cookie: CookieService) { }

  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  // Método que retorna um observable de todos os produtos da API
  //.pipe permite manipular os dados emitidos pelo observable
  // o operador map é usado para transformar os dados recebidos, ele filtra o objeto products para remover os produtos com amount menor que 0
  //o "?" é usado como acesso seguroque garante que a expressão seja avaliada apenas se data não for nulo ou indefinido
  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http.get<Array<GetAllProductsResponse>>(`${this.API_URL}/products`,
    this.httpOptions
    )
    .pipe(
      map((product)=> product.filter((data)=> data?.amount > 0))
    );
  }
}
