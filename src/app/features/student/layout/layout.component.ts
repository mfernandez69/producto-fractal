import { Component } from '@angular/core';
import { RankingComponent } from "../components/ranking/ranking.component";
import { ScheduleComponent } from "../components/schedule/schedule.component";

@Component({
  selector: 'app-layout',
  imports: [ScheduleComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export default class LayoutComponent {

}
