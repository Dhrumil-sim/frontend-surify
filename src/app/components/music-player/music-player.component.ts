import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../core/services/search.service';
import { ListeningHistoryService } from '../../core/services/listening-history.service';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
})
export class MusicPlayerComponent implements OnChanges {
  @Input() song: Song | null = null;
  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;

  audioUrl: string = '';
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  coverError: boolean = false;

  constructor(private listeningHistoryService: ListeningHistoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['song'] && this.song) {
      this.audioUrl = `http://localhost:5000/api/song/stream/${this.song._id}`;
      console.log(this.song._id);
      this.isPlaying = false;
      this.currentTime = 0;
      this.duration = 0;
      this.coverError = false;
      // Add to listening history when a new song is loaded
      this.listeningHistoryService.addToHistory(this.song._id, new Date()).subscribe({
        next: () => {},
        error: (err) => {
          console.error('Failed to add to listening history', err);
        },
      });
      setTimeout(() => {
        if (this.audioRef?.nativeElement) {
          this.audioRef.nativeElement.load();
        }
      });
    }
  }

  play(): void {
    if (this.audioRef?.nativeElement) {
      this.audioRef.nativeElement.play();
      this.isPlaying = true;
    }
  }

  pause(): void {
    if (this.audioRef?.nativeElement) {
      this.audioRef.nativeElement.pause();
      this.isPlaying = false;
    }
  }

  togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  onTimeUpdate(): void {
    if (this.audioRef?.nativeElement) {
      this.currentTime = this.audioRef.nativeElement.currentTime;
    }
  }

  onLoadedMetadata(): void {
    if (this.audioRef?.nativeElement) {
      this.duration = this.audioRef.nativeElement.duration;
    }
  }

  onEnded(): void {
    this.isPlaying = false;
    this.currentTime = 0;
  }

  onSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    const seekTime = Number(input.value);
    if (this.audioRef?.nativeElement) {
      this.audioRef.nativeElement.currentTime = seekTime;
      this.currentTime = seekTime;
    }
  }

  formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  onImageError(): void {
    this.coverError = true;
  }

  getCoverImageUrl(coverPicture: string | undefined): string {
    if (!coverPicture || this.coverError) return 'assets/default-cover.png';
    if (coverPicture.startsWith('http')) return coverPicture;
    if (coverPicture.startsWith('public/')) {
      return `http://localhost:5000/${coverPicture.replace('public/', '')}`;
    }
    return `http://localhost:5000/uploads/${coverPicture}`;
  }
}
