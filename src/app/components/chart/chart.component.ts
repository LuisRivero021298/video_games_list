import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Array<Label> = [
    'PlayStation one', 
    'Xbox 360', 
    'Play Station two'
  ];
  pieChartData: Array<number> = [10, 6, 8];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  //pieChartPlugins = [pluginDataLabels];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 
                        'rgba(0,255,0,0.3)', 
                        'rgba(0,0,255,0.3)'
                       ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
