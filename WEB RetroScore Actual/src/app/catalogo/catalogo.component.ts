import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jersey } from '../models/Jersey';
import { ApiService } from '../Services/api.service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SidebarFilterComponent } from '../sidebar-filter/sidebar-filter.component';
import { JerseyComponent } from '../jersey/jersey.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [SidebarFilterComponent, CommonModule, JerseyComponent, SearchBarComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiService = inject(ApiService);
  private titleService = inject(Title);
  jerseys = signal<Jersey[]>([]); // Signal = Reactive variable that can be subscribed to
  filteredJerseys = signal<Jersey[]>([]);

  ngOnInit(): void {
    this.titleService.setTitle('RetroScore | Catálogo');
    this.loadShirts();
    this.route.queryParams.subscribe(params => {
      const teamName = params['team'];
      if (teamName) {
        this.onSearch(teamName);
      }
    });
  }

  loadShirts(): void {
    this.apiService.getAllJerseys().subscribe((data: { results: Jersey[] }) => {
      console.log('Jerseys loaded:', data.results);
      this.jerseys.set(data.results);
      this.filteredJerseys.set(data.results);

      const teamName = this.route.snapshot.queryParamMap.get('team'); // Checking if there is a team name in the query params
      if (teamName) {
        this.onSearch(teamName); // If there is, we call the onSearch method with the team name
      }
    });
  }

  onFilterChanged(filter: any): void {
    const filtered = this.jerseys().filter((jersey: Jersey) => {
      return (!filter.liga || jersey.league === filter.liga);
    });
    this.filteredJerseys.set(filtered);
  }

  onSearch(teamName: string): void {
    this.filteredJerseys.set(this.jerseys().filter((jersey: Jersey) => jersey.team.toLowerCase().includes(teamName.toLowerCase())));
  }
}
