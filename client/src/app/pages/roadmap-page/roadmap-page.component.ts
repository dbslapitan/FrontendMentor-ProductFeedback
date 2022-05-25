import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-roadmap-page',
  templateUrl: './roadmap-page.component.html',
  styleUrls: ['./roadmap-page.component.css']
})
export class RoadmapPageComponent implements OnInit {

  constructor(private pagesService: PagesService) { }

  ngOnInit(): void {
    this.pagesService.pagesSubject.next('Roadmap');
  }

  selectStatus(status: string, planned: HTMLDivElement, inProgress: HTMLDivElement, live: HTMLDivElement){
    
    console.log(status);
    switch(status){
      case 'planned':
        planned.classList.contains('hidden') ? planned.classList.remove('hidden') : console.log('');
        inProgress.classList.contains('hidden') ? console.log('') : inProgress.classList.add('hidden');
        live.classList.contains('hidden') ? console.log('') : live.classList.add('hidden');
      break;
      case 'in-progress':
        planned.classList.contains('hidden') ? console.log('') : planned.classList.add('hidden');
        inProgress.classList.contains('hidden') ? inProgress.classList.remove('hidden') : console.log('');
        live.classList.contains('hidden') ? console.log('') : live.classList.add('hidden');
      break;
      case 'live':
        planned.classList.contains('hidden') ? console.log('') : planned.classList.add('hidden');
        inProgress.classList.contains('hidden') ? console.log('') : inProgress.classList.add('hidden');
        live.classList.contains('hidden') ? live.classList.remove('hidden') : console.log('');
      break;
    }
  }

}
