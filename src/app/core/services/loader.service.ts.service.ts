// src/app/core/services/loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private globalLoadingSubject = new BehaviorSubject<boolean>(false);
  private componentLoaders = new Map<string, BehaviorSubject<boolean>>();

  // Global loader methods
  get globalLoading$(): Observable<boolean> {
    return this.globalLoadingSubject.asObservable();
  }

  showGlobalLoader(): void {
    this.globalLoadingSubject.next(true);
  }

  hideGlobalLoader(): void {
    this.globalLoadingSubject.next(false);
  }

  // Component-specific loader methods
  getComponentLoader(componentId: string): Observable<boolean> {
    if (!this.componentLoaders.has(componentId)) {
      this.componentLoaders.set(componentId, new BehaviorSubject<boolean>(false));
    }
    return this.componentLoaders.get(componentId)!.asObservable();
  }

  showComponentLoader(componentId: string): void {
    if (!this.componentLoaders.has(componentId)) {
      this.componentLoaders.set(componentId, new BehaviorSubject<boolean>(false));
    }
    this.componentLoaders.get(componentId)!.next(true);
  }

  hideComponentLoader(componentId: string): void {
    if (this.componentLoaders.has(componentId)) {
      this.componentLoaders.get(componentId)!.next(false);
    }
  }

  // Utility method to automatically handle API calls with global loader
  handleApiCall<T>(apiCall: Observable<T>): Observable<T> {
    this.showGlobalLoader();
    return new Observable((subscriber) => {
      apiCall.subscribe({
        next: (value) => {
          this.hideGlobalLoader();
          subscriber.next(value);
        },
        error: (error) => {
          this.hideGlobalLoader();
          subscriber.error(error);
        },
        complete: () => {
          this.hideGlobalLoader();
          subscriber.complete();
        },
      });
    });
  }

  // Utility method for component-level API calls
  handleComponentApiCall<T>(componentId: string, apiCall: Observable<T>): Observable<T> {
    this.showComponentLoader(componentId);
    return new Observable((subscriber) => {
      apiCall.subscribe({
        next: (value) => {
          this.hideComponentLoader(componentId);
          subscriber.next(value);
        },
        error: (error) => {
          this.hideComponentLoader(componentId);
          subscriber.error(error);
        },
        complete: () => {
          this.hideComponentLoader(componentId);
          subscriber.complete();
        },
      });
    });
  }
}
