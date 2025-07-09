import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService, Playlist } from './playlist.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css'],
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  isLoading = false;
  errorMsg = '';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.fetchPlaylists();
  }

  fetchPlaylists(): void {
    this.isLoading = true;
    this.playlistService.getPlaylists().subscribe({
      next: (res) => {
        this.playlists = res?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Failed to fetch playlists.';
        this.isLoading = false;
      },
    });
  }

  onView(playlist: Playlist): void {
    // TODO: Navigate to playlist details
    void playlist;
  }

  onEdit(playlist: Playlist): void {
    // TODO: Open edit modal or navigate to edit page
    void playlist;
  }

  onDelete(playlist: Playlist): void {
    // TODO: Implement delete logic
    void playlist;
  }
}
