import { Component } from '@angular/core';
import { RankingComponent, ScheduleComponent } from '@mfernandez69/fractal-library';
/* import { RankingComponent } from "../components/ranking/ranking.component";
import { ScheduleComponent } from "../components/schedule/schedule.component"; */
@Component({
  selector: 'app-layout',
  imports: [ScheduleComponent,RankingComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export default class LayoutComponent {

}
