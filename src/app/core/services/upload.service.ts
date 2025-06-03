import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = environment.uploadThingUrl;
  private apiKey = environment.uploadThingApiKey;

  constructor(private http: HttpClient) { }

  uploadPdf(file: File): Observable<any> {
    // Crear un objeto FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', file);
    
    // Configurar los headers con el API key
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });

    // Realizar la petición POST sin observe:events para simplificar el manejo de respuesta
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
