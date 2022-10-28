import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
//or
// import Chart from 'chart.js'

@Component({
  selector: 'app-donnees-historique',
  templateUrl: './donnees-historique.component.html',
  styleUrls: ['./donnees-historique.component.css'],
})
export class donnesHistoriqueComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }
  public chart: any;
  public chart2: any;
  public chart3: any;

  createChart() {
    // get data from database
    var dataSets: any = [];
    const data: any = fetch('http://localhost:8000/BI/CA', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dataSets.push({
          label: data.map((item: any) => item[5]),
          price: data.map((item: any) => item[4]),
        });
        localStorage.setItem(
          'price',
          JSON.stringify(data.map((item: any) => item[4]))
        );
        localStorage.setItem(
          'label',
          JSON.stringify(data.map((item: any) => item[5]))
        );
        return data;
      });

    console.log('dataSets', dataSets);

    const price = JSON.parse(localStorage.getItem('price') || '{}');
    const label = JSON.parse(localStorage.getItem('label') || '{}');

    // print first json object
    console.log('label', price[0]);
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: label,
            data: price,

            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const benef: any = fetch('http://localhost:8000/BI/benef', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dataSets.push({
          label: data.map((item: any) => item[5]),
          price: data.map((item: any) => item[4]),
        });
        localStorage.setItem(
          'priceBenf',
          JSON.stringify(data.map((item: any) => item[4]))
        );
        localStorage.setItem(
          'labelBenf',
          JSON.stringify(data.map((item: any) => item[5]))
        );
        return data;
      });
    

    const priceBenf = JSON.parse(localStorage.getItem('priceBenf') || '{}');
    const labelBenf = JSON.parse(localStorage.getItem('labelBenf') || '{}');
    this.chart2 = new Chart('MyChart2', {
      type: 'line',
      data: {
        labels: labelBenf,
        datasets: [
          {
            label: label,
            data: priceBenf,

            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });


    const impot = fetch('http://localhost:8000/BI/impot', {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => { 
        dataSets.push({
          label: data.map((item: any) => item[5]),
          price: data.map((item: any) => item[4]),
        });
        localStorage.setItem(
          'priceImpot',
          JSON.stringify(data.map((item: any) => item[0]))
        );
        localStorage.setItem(
          'labelImpot',
          JSON.stringify(data.map((item: any) => item[1]))
        );
        return data;
      }

      );

    let priceImpot = JSON.parse(localStorage.getItem('priceImpot') || '{}');
    const labelImpot = JSON.parse(localStorage.getItem('labelImpot') || '{}');
    (priceImpot == 0) ? priceImpot = 100 : priceImpot = priceImpot;
    console.log('priceImpot', priceImpot);
    this.chart3 = new Chart('MyChart3', {
      type: 'doughnut',
      data: {
        labels: labelBenf,
        datasets: [
          {
            label: labelImpot,
            data: [
              priceImpot,
            ],
            backgroundColor: [
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  }
}
