import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { DateViseData } from '../models/date-vise-data';
import { GlobalDataSummary } from '../models/globaldata';
// import { GlobalDataSummary } from '../models/globaldata';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globaldataurl= 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv'
  private datedataurl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
  constructor(private http: HttpClient) { }
  getGlobalData(){
    
    return this.http.get(this.globaldataurl, {responseType: 'text'}).pipe(
      map(result => {
        // let data: GlobalDataSummary[] = []
        let rows= result.split('\n')
        let raw: any = {}
        rows.splice(0,1)
        // console.log(rows)
        rows.forEach(row=>{
          let cols= row.split(/,(?=\S)/)
          // console.log(cols);
          let cs= {
            country : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered: +cols[9],
            active : +cols[10]
          }
          let temp : GlobalDataSummary= raw[cs.country]
          if(temp){
            temp.active = cs.active + temp.active
            temp.confirmed=cs.confirmed + temp.confirmed
            temp.deaths=cs.deaths + temp.deaths
            temp.recovered=cs.recovered + temp.recovered
            raw[cs.country] = temp 
          }
          else{
            raw[cs.country]= cs
          }
        })
        return <GlobalDataSummary[]>Object.values(raw)
        
        
      })
    )
  }
  getDateData(){
    return this.http.get(this.datedataurl, {responseType: 'text'}).pipe(
      map(result=>{
        let rows= result.split('\n')
        // console.log(rows);
        let mainData={}
        let header= rows[0]
        let headerValues= header.split(/,(?=\S)/)
        headerValues.splice(0,4)
        // console.log(headerValues);
        rows.splice(0,1)
        rows.forEach(row=>{
          let cols = row.split(/,(?=\S)/)
          let con= cols[1]
          cols.splice(0,4)
          // console.log(con, cols);
          mainData[con]=[]
          cols.forEach((values,index)=>{
            let dw: DateViseData={
              cases: +values,
              country: con,
              date : new Date(Date.parse(headerValues[index]))
              
            }
            mainData[con].push(dw)
          })
        })
        
        // console.log(mainData);
        
        return mainData
      })
    )
  }
}
