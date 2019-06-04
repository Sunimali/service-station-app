import { LogItem } from '../interface/logItem.interface';

export class LogService{
  logDetail : LogItem [] = [
    {vehicleNumber:"CAD-1452",date:"2019-05-22",totalAmount:10000,packageName:"Fill Service",oilChanged:true,airFilterChanged:false,preMillage:36000,nextMillage:40000,nextDate:"2019-09-22"},
    {vehicleNumber:"CAD-1452",date:"2019-05-23",totalAmount:10000,packageName:"Fill Service",oilChanged:true,airFilterChanged:false,preMillage:40120,nextMillage:45000,nextDate:"2019-09-23"},
    {vehicleNumber:"CAD-1452",date:"2019-05-24",totalAmount:10000,packageName:"Fill Service",oilChanged:true,airFilterChanged:false,preMillage:45600,nextMillage:50000,nextDate:"2019-09-24"},
    {vehicleNumber:"CAD-1452",date:"2019-05-25",totalAmount:10000,packageName:"Fill Service",oilChanged:true,airFilterChanged:false,preMillage:50100,nextMillage:55000,nextDate:"2019-09-25"},
    {vehicleNumber:"CCC-4758",date:"2019-05-26",totalAmount:10000,packageName:"Fill Service",oilChanged:true,airFilterChanged:false,preMillage:36000,nextMillage:40000,nextDate:"2019-09-26"},
    {vehicleNumber:"CCC-4758",date:"2019-05-27",totalAmount:10000,packageName:"Fill Service",oilChanged:true,airFilterChanged:false,preMillage:40120,nextMillage:45120,nextDate:"2019-09-27"},
    {vehicleNumber:"CCC-4758",date:"2019-05-28",totalAmount:10000,packageName:"Fill Service",oilChanged:true,airFilterChanged:false,preMillage:46000,nextMillage:51000,nextDate:"2019-09-28"}

  ];

  addLogItem(vehicleNumber:string,date:string,totalAmount:number,packageName:string,oilChanged:boolean,airFilterChanged:boolean,preMillage:number,nextMillage:number,nextDate:string){
    this.logDetail.push({
      vehicleNumber:vehicleNumber,
      date:date,
      totalAmount : totalAmount,
      packageName : packageName,
      oilChanged : oilChanged,
      airFilterChanged : airFilterChanged,
      preMillage : preMillage,
      nextMillage : nextMillage,
      nextDate : nextDate
    });
  }

  getLogItems(){
    return this.logDetail;
  }
}
