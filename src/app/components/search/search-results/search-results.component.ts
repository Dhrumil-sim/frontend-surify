import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { SearchService, Song, SearchResponse } from '../../../core/services/search.service';
import { LoaderService } from '../../../core/services/loader.service.ts.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  @Input() searchQuery: string = '';
  @Input() searchType: 'title' | 'genre' | 'artist' | 'all' = 'all';
  @Output() playSong = new EventEmitter<Song>();

  songs: Song[] = [];
  totalSongs: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  isLoading: boolean = false;
  errorMessage: string = '';
  componentId = 'search-results';

  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService
      .getComponentLoader(this.componentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });

    // Load initial data
    this.loadSongs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSongs(): void {
    if (!this.searchQuery.trim() && this.searchType === 'all') {
      // Load all songs if no search query
      this.loaderService
        .handleComponentApiCall(this.componentId, this.searchService.getAllSongs(this.currentPage, this.pageSize))
        .subscribe({
          next: (response: SearchResponse) => {
            this.handleSearchResponse(response);
          },
          error: (error: unknown) => {
            this.handleSearchError(error);
          },
        });
    } else if (this.searchQuery.trim()) {
      // Perform search based on type
      this.performSearch();
    }
  }

  performSearch(): void {
    const searchObservable = this.getSearchObservable();

    if (searchObservable) {
      this.loaderService.handleComponentApiCall(this.componentId, searchObservable).subscribe({
        next: (response: SearchResponse) => {
          this.handleSearchResponse(response);
        },
        error: (error: unknown) => {
          this.handleSearchError(error);
        },
      });
    }
  }

  private getSearchObservable() {
    switch (this.searchType) {
      case 'title':
        return this.searchService.searchByTitle(this.searchQuery, this.currentPage, this.pageSize);
      case 'genre':
        return this.searchService.searchByGenre(this.searchQuery, this.currentPage, this.pageSize);
      case 'artist':
        return this.searchService.searchByArtist(this.searchQuery, this.currentPage, this.pageSize);
      default:
        return this.searchService.searchSongs({
          title: this.searchQuery,
          page: this.currentPage,
          limit: this.pageSize,
        });
    }
  }

  private handleSearchResponse(response: SearchResponse): void {
    if (response.success && response.data) {
      this.songs = response.data.songs || [];
      this.totalSongs = response.data.total || 0;
      this.currentPage = response.data.page || 1;
      this.pageSize = response.data.limit || 10;
      this.errorMessage = '';
    } else {
      this.songs = [];
      this.totalSongs = 0;
      this.errorMessage = response.message || 'No results found';
    }
  }

  private handleSearchError(error: unknown): void {
    this.songs = [];
    this.totalSongs = 0;
    // Type guard for error structure
    if (
      error &&
      typeof error === 'object' &&
      'error' in error &&
      typeof (error as { error: unknown }).error === 'object' &&
      (error as { error: { message?: unknown } }).error &&
      'message' in (error as { error: { message?: unknown } }).error
    ) {
      const errObj = error as { error: { message?: unknown } };
      this.errorMessage =
        typeof errObj.error.message === 'string' ? errObj.error.message : 'An error occurred while searching';
    } else {
      this.errorMessage = 'An error occurred while searching';
    }
    console.error('Search error:', error);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadSongs();
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getCoverImageUrl(coverPicture: string): string {
    if (!coverPicture) {
      return '';
    }

    // Handle different cover picture path formats
    if (coverPicture.startsWith('http')) {
      return coverPicture;
    }

    if (coverPicture.startsWith('public/')) {
      const cleanPath = coverPicture.replace('public/', '');
      return `http://localhost:5000/${cleanPath}`;
    }

    if (coverPicture && coverPicture !== 'dummy_path') {
      return `http://localhost:5000/uploads/${coverPicture}`;
    }

    return '';
  }

  onPlaySong(song: Song): void {
    this.playSong.emit(song);
  }

  onAddToPlaylist(song: Song): void {
    // TODO: Implement add to playlist functionality
    console.log('Adding to playlist:', song.title);
  }

  onFavorite(song: Song): void {
    // TODO: Implement favorite functionality
    console.log('Favoriting song:', song.title);
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.style.display = 'none';
    }
  }
}
