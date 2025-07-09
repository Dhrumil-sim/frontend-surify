import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  _id: string;
  title: string;
  artist?: { username: string };
  // Add more fields as needed
}

export interface Playlist {
  _id: string;
  name: string;
  description?: string;
  coverImage?: string;
  songs?: Song[];
  // Add more fields as needed
}

export interface PlaylistPayload {
  name: string;
  description?: string;
  coverImage?: string;
}

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private baseUrl = `http://localhost:5000/api/playlist`;

  constructor(private http: HttpClient) {}

  createPlaylist(payload: PlaylistPayload): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.baseUrl}/create`, payload);
  }

  getPlaylists(): Observable<{ data: Playlist[] }> {
    return this.http.get<{ data: Playlist[] }>(`${this.baseUrl}`);
  }

  updatePlaylist(id: string, payload: Partial<PlaylistPayload>): Observable<Playlist> {
    return this.http.patch<Playlist>(`${this.baseUrl}/${id}`, payload);
  }

  deletePlaylist(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addSongToPlaylist(playlistId: string, songId: string): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.baseUrl}/${playlistId}/songs/${songId}`, {});
  }

  removeSongFromPlaylist(playlistId: string, songId: string): Observable<Playlist> {
    return this.http.delete<Playlist>(`${this.baseUrl}/${playlistId}/songs/${songId}`);
  }

  getSongsFromPlaylist(playlistId: string): Observable<{ data: Song[] }> {
    return this.http.get<{ data: Song[] }>(`${this.baseUrl}/${playlistId}/songs`);
  }
}
