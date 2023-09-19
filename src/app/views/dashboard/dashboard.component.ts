import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { LeadtrackerService } from 'src/app/shared/helpers/service/leadtracker.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeLeads: any;
  leadsList: any;
  user: any;
  activeNumber: any;
  wonNumber: any;
  lostNumber: any;
  probabilities: any;
  presentStatus: string = 'active';
  chart: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  chartInfo: any;
  barColors: any[] = ['#D3DFFB', '#A7BFF4', '#7C9EF2', '#507EEC', '#3454CF'];
  totalLeads: number = 0;
  constructor(
    private dashboardService: LeadtrackerService,
    private _router: Router
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getUserDetail();
    this.getProbability('active');
    this.getActiveLeads();
    this.getLeadsList('active');
    this.getGraphData('active');
  }

  getProbability(type: string, call: string = 'nothing') {
    this.dashboardService.probability(type).subscribe(res => {
      if (res.code === 200) {
        this.probabilities = res?.data;
      }
    })
  }

  getActiveLeads() {
    this.dashboardService.activeLeads().subscribe(res => {
      if (res.code === 200) {
        this.activeLeads = res.data;
      }
    });
  }

  getLeadsList(type: string) {
    this.dashboardService.leadsList(type).subscribe(res => {
      if (res.code === 200) {
        this.leadsList = res.data;
        this.totalLeads = this.leadsList?.count > 4 ? 4 : this.leadsList?.count;
        console.log(this.totalLeads);
      }
    });
  }

  getUserDetail() {
    this.dashboardService.userDetail().subscribe(res => {
      if (res.code === 200) {
        this.user = res.data;
      }
    })
  }

  getGraphData(type: string) {
    this.dashboardService.graphCount(type).subscribe(res => {
      if (res.code === 200) {
        this.labeldata = [];
        this.realdata = [];
        this.colordata = [];
        this.chartInfo = res?.data;
        this.chartInfo?.stage_type_count?.filter((x: any) => {
          if (x.stage_type == 'won') {
            this.wonNumber = x?.value;
          } else if (x.stage_type == 'active') {
            this.activeNumber = x?.value;
          } else {
            this.lostNumber = x?.value;
          }
        })
        this.chartInfo?.graph?.filter((x: any, i: any) => {
          this.labeldata.push(x?.stage_name);
          this.realdata.push(x?.leads);
          this.colordata.push(this.barColors[i]);
        })
        this.createChart(this.labeldata, this.realdata, this.colordata);
      }
    })
  }

  createChart(labeldata: any, realdata: any, colordata: any) {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'No of sales',
            data: realdata,
            backgroundColor: colordata,
            barThickness: 40,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            display: false
          }
        }
      },
    });
  }

  changeStatus(type: string) {
    this.getProbability(type);
    this.getLeadsList(type);
    this.chart.destroy();
    this.getGraphData(type);
    this.presentStatus = type
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userid');
    this._router.navigate(['/']);
  }

  viewAll() {
    this.totalLeads = this.leadsList?.results?.length
  }

}
