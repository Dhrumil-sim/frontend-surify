import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../../core/services/search.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css'],
})
export class SongCardComponent {
  hover = false;
  @Input() song!: Song;
  @Output() play = new EventEmitter<Song>();
  @Output() favorite = new EventEmitter<Song>();
  @Output() addToPlaylist = new EventEmitter<Song>();
  coverError = false;

  getCoverImageUrl(coverPicture: string | undefined): string {
    if (!coverPicture || this.coverError) return 'assets/default-cover.png';
    if (coverPicture.startsWith('http')) return coverPicture;
    if (coverPicture.startsWith('public/')) {
      return `http://localhost:5000/${coverPicture.replace('public/', '')}`;
    }
    return `http://localhost:5000/uploads/${coverPicture}`;
  }

  onImageError(): void {
    this.coverError = true;
  }

  onPlay(): void {
    this.play.emit(this.song);
  }

  onFavorite(): void {
    this.favorite.emit(this.song);
  }

  onAddToPlaylist(): void {
    this.addToPlaylist.emit(this.song);
  }
}
