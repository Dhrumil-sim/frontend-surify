import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SearchFilters {
  title?: string;
  genre?: string;
  artist?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface Song {
  _id: string;
  title: string;
  artist: {
    _id: string;
    username: string;
    email: string;
  };
  album?: {
    _id: string;
    title: string;
  };
  genre: string[];
  language: string;
  releaseDate: string;
  duration: number;
  coverPicture: string;
  filePath: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    songs: Song[];
    total: number;
    page: number;
    limit: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://localhost:5000/api/song';

  constructor(private http: HttpClient) {}

  /**
   * Search songs with filters
   */
  searchSongs(filters: SearchFilters): Observable<SearchResponse> {
    let params = new HttpParams();

    // Add search parameters
    if (filters.title) {
      params = params.set('title', filters.title);
    }
    if (filters.genre) {
      params = params.set('genre', filters.genre);
    }
    if (filters.artist) {
      params = params.set('artist', filters.artist);
    }
    if (filters.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }
    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }
    if (filters.limit) {
      params = params.set('limit', filters.limit.toString());
    }

    return this.http.get<SearchResponse>(this.apiUrl, { params });
  }

  /**
   * Search songs by title
   */
  searchByTitle(title: string, page: number = 1, limit: number = 10): Observable<SearchResponse> {
    return this.searchSongs({ title, page, limit });
  }

  /**
   * Search songs by genre
   */
  searchByGenre(genre: string, page: number = 1, limit: number = 10): Observable<SearchResponse> {
    return this.searchSongs({ genre, page, limit });
  }

  /**
   * Search songs by artist
   */
  searchByArtist(artist: string, page: number = 1, limit: number = 10): Observable<SearchResponse> {
    return this.searchSongs({ artist, page, limit });
  }

  /**
   * Get all songs with pagination
   */
  getAllSongs(page: number = 1, limit: number = 10): Observable<SearchResponse> {
    return this.searchSongs({ page, limit });
  }

  /**
   * Get songs by artist ID
   */
  getSongsByArtistId(artistId: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.apiUrl}/artist/${artistId}`);
  }
}
