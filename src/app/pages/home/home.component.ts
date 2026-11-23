import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { HealthResponse } from '../../core/models/health-response';
import { HealthService } from '../../core/services/health.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly healthService = inject(HealthService);

  readonly loading = signal(true);
  readonly health = signal<HealthResponse | null>(null);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.refreshHealth();
  }

  refreshHealth(): void {
    this.loading.set(true);
    this.error.set(null);

    this.healthService.getHealth()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: response => this.health.set(response),
        error: () => {
          this.health.set(null);
          this.error.set('Back-end non raggiungibile. Avvia Spring Boot sulla porta 8080.');
        }
      });
  }
}
