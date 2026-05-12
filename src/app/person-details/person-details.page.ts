import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cloudOfflineOutline, heart } from 'ionicons/icons';
import { firstValueFrom, forkJoin } from 'rxjs';

import { PersonDetails, PersonMovieCredit } from '../core/models/tmdb.models';
import { TmdbService } from '../core/services/tmdb.service';
import { ageBetween, formatLongDate, todayIsoDate } from '../core/utils/dates';
import { initialsFromName } from '../core/utils/initials';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class PersonDetailsPage implements OnInit {
  person: PersonDetails | null = null;
  otherMovies: PersonMovieCredit[] = [];
  isLoading = true;
  errorMessage = '';
  isBioExpanded = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tmdbService: TmdbService,
  ) {
    addIcons({ heart, cloudOfflineOutline });
  }

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    const personId = Number(idParam);

    if (!personId) {
      this.errorMessage = 'Invalid person ID.';
      this.isLoading = false;
      return;
    }

    try {
      const { person, credits } = await firstValueFrom(
        forkJoin({
          person: this.tmdbService.getPersonDetails(personId),
          credits: this.tmdbService.getPersonMovieCredits(personId),
        }),
      );
      this.person = person;
      this.otherMovies = credits;
    } catch {
      this.errorMessage = 'Could not load person details.';
    } finally {
      this.isLoading = false;
    }
  }

  getProfileUrl(path: string | null): string | null {
    return this.tmdbService.getImageUrl(path);
  }

  initials(name: string): string {
    return initialsFromName(name);
  }

  get bornLine(): string | null {
    const p = this.person;
    if (!p?.birthday) {
      return null;
    }
    const formatted = formatLongDate(p.birthday);
    const place = p.place_of_birth ? ` · ${p.place_of_birth}` : '';
    if (p.deathday) {
      const age = ageBetween(p.birthday, p.deathday);
      return `Born ${formatted}${place} (aged ${age} at death)`;
    }
    const age = ageBetween(p.birthday, todayIsoDate());
    return `Born ${formatted}${place} (age ${age})`;
  }

  get diedLine(): string | null {
    const p = this.person;
    if (!p?.deathday) {
      return null;
    }
    return `Died ${formatLongDate(p.deathday)}`;
  }

  toggleBio(): void {
    this.isBioExpanded = !this.isBioExpanded;
  }
}
