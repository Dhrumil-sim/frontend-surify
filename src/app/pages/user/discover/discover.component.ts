import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SearchResultsComponent } from '../../../components/search/search-results/search-results.component';
import { MusicPlayerComponent } from '../../../components/music-player/music-player.component';
import { Song } from '../../../core/services/search.service';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, SearchResultsComponent, MusicPlayerComponent],
  template: `
    <div class="discover-container">
      <div class="discover-header">
        <h1 class="discover-title">Discover Music</h1>
        <p class="discover-subtitle">Find your next favorite song</p>
      </div>

      <app-search-results [searchQuery]="searchQuery" [searchType]="searchType" (playSong)="onPlaySong($event)">
      </app-search-results>

      <app-music-player [song]="currentSong"></app-music-player>
    </div>
  `,
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchType: 'title' | 'genre' | 'artist' | 'all' = 'all';
  currentSong: Song | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get search query from URL parameters
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.searchType = params['type'] || 'all';
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPlaySong(song: Song): void {
    this.currentSong = song;
  }
}
