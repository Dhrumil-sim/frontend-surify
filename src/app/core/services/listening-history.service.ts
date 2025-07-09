import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './search.service';

export interface ListeningHistoryRecord {
  _id: string;
  userId: string;
  songId: Song; // Populated song object
  playedAt: string;
}

export interface ListeningHistoryResponse {
  code: number;
  message: string;
  records: ListeningHistoryRecord[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ListeningHistoryService {
  private apiUrl = 'http://localhost:5000/api/listening-history';

  constructor(private http: HttpClient) {}

  getHistory(page: number = 1, limit: number = 10): Observable<ListeningHistoryResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<ListeningHistoryResponse>(this.apiUrl, { params });
  }

  deleteHistory(id: string): Observable<{ code: number; message: string }> {
    return this.http.delete<{ code: number; message: string }>(`${this.apiUrl}/${id}`);
  }

  addToHistory(
    songId: string,
    playedAt: Date = new Date()
  ): Observable<{ code: number; message: string; data: ListeningHistoryRecord }> {
    return this.http.post<{ code: number; message: string; data: ListeningHistoryRecord }>(this.apiUrl, {
      songId,
      playedAt,
    });
  }
}
