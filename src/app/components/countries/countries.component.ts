import { Component, OnInit } from '@angular/core';
import { DateViseData } from 'src/app/models/date-vise-data';
import { GlobalDataSummary } from 'src/app/models/globaldata';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  data: GlobalDataSummary[]
  countries :string[] = []
  totalConfirmed = 0
  totalDeaths= 0
  totalActive= 0
  totalRecovered = 0
  dateViseData
  selectedcon: DateViseData[]
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.service.getDateData().subscribe(result=>{
      this.dateViseData=result
      // console.log(result);
      
    })
    this.service.getGlobalData().subscribe(result=>{
      this.data=result
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })
      
    })
  }
  updateValues(country: string){
    // console.log(country);
    
    this.data.forEach(cs=>{
    if(cs.country==country){
      this.totalConfirmed=cs.confirmed
      this.totalActive=cs.active
      this.totalDeaths=cs.deaths
      this.totalRecovered=cs.recovered
    }})
    this.selectedcon = this.dateViseData[country]
    // console.log(this.selectedcon);
    
  }

}
