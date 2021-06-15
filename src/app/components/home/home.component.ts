import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/globaldata';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0
  totalDeaths= 0
  totalActive= 0
  totalRecovered = 0
  GlobalData: GlobalDataSummary[]

  constructor(private dataservice: DataServiceService) { }

   ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe({
      next: (result)=>{
        // console.log(result);
        
        this.GlobalData=result
        result.forEach(cs=>{
          // console.log(cs.active);
          if(!Number.isNaN(cs.confirmed)){
            this.totalActive+= cs.active
            this.totalConfirmed+= cs.confirmed
            this.totalDeaths+=cs.deaths
            this.totalRecovered+=cs.recovered
          }

        })
        // console.log(this.totalDeaths);
        
      }
    })
  }


}
