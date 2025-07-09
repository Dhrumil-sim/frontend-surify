import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeningHistoryService, ListeningHistoryRecord } from '../../../core/services/listening-history.service';
import { SongCardComponent } from '../../../components/search/song-card/song-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Song } from '../../../core/services/search.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recently-played',
  standalone: true,
  imports: [CommonModule, SongCardComponent, MatPaginatorModule, MatIconModule],
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.css'],
})
export class RecentlyPlayedComponent implements OnInit {
  @Output() playSong = new EventEmitter<Song>();
  history: ListeningHistoryRecord[] = [];
  total: number = 0;
  page: number = 1;
  limit: number = 12;
  loading = false;
  error = '';

  constructor(private historyService: ListeningHistoryService) {}

  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory(): void {
    this.loading = true;
    this.error = '';
    this.historyService.getHistory(this.page, this.limit).subscribe({
      next: (res) => {
        this.history = res.records;
        this.total = res.total;
        this.page = res.page;
        this.limit = res.limit;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load history.';
        this.loading = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchHistory();
  }

  onPlay(song: Song): void {
    this.playSong.emit(song);
  }

  onDelete(record: ListeningHistoryRecord): void {
    this.historyService.deleteHistory(record._id).subscribe({
      next: () => {
        this.fetchHistory();
      },
      error: () => {
        this.error = 'Failed to delete record.';
      },
    });
  }
}
