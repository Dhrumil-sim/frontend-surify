import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from './playlist.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Song {
  _id: string;
  title: string;
  artist?: { username: string };
  // Add more fields as needed
}

@Component({
  selector: 'app-playlist-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],
})
export class PlaylistDetailsComponent implements OnInit {
  @Input() playlistId!: string;
  songs: Song[] = [];
  isLoading = false;
  errorMsg = '';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    if (this.playlistId) {
      this.fetchSongs();
    }
  }

  fetchSongs(): void {
    this.isLoading = true;
    this.playlistService.getSongsFromPlaylist(this.playlistId).subscribe({
      next: (res) => {
        this.songs = res?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Failed to fetch songs.';
        this.isLoading = false;
      },
    });
  }

  onRemoveSong(song: Song): void {
    // TODO: Implement remove song logic
    void song; // Prevent unused parameter linter error
  }

  onAddSong(): void {
    // TODO: Implement add song to playlist logic
  }
}
