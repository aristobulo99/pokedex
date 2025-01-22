import { AfterViewInit, Component, Input } from '@angular/core';
import { Data } from '@angular/router';
import Chart from 'chart.js/auto';
import { Datasets } from '../../../../core/interfaces/radarSkipPoints.interface';

@Component({
  selector: 'app-radar-skip-points',
  standalone: true,
  imports: [],
  templateUrl: './radar-skip-points.component.html',
  styleUrl: './radar-skip-points.component.scss'
})
export class RadarSkipPointsComponent implements AfterViewInit{

  @Input() labels!: string[];
  @Input() data!: number[];
  @Input() datasets!: Datasets

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('radarChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Estadísticas',
              data: this.data,
              backgroundColor: this.datasets.backgroundColor,
              borderColor: this.datasets.borderColor,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              pointLabels: {
                font: {
                  size: 9,
                  weight: 'bold',
                },
                color: 'white', 
              },
              ticks: {
                color: 'black',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
          },
        },
      });
    }

  }
  

}
