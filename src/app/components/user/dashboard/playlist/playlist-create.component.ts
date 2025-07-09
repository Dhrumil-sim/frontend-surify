import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlaylistService } from './playlist.service';

@Component({
  selector: 'app-playlist-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.css'],
})
export class PlaylistCreateComponent {
  playlistForm: FormGroup;
  isSubmitting = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService
  ) {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      coverImage: [''],
    });
  }

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';
    if (this.playlistForm.invalid) return;
    this.isSubmitting = true;
    this.playlistService.createPlaylist(this.playlistForm.value).subscribe({
      next: () => {
        this.successMsg = 'Playlist created successfully!';
        this.playlistForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Failed to create playlist.';
        this.isSubmitting = false;
      },
    });
  }
}
