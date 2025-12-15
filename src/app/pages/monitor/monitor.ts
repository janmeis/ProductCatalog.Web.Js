import { Component } from '@angular/core';
import { MonitorGridComponent } from '../../components/monitor-grid/monitor-grid.component';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [MonitorGridComponent],
  templateUrl: './monitor.html',
  styleUrl: './monitor.less',
})
export class Monitor {}
