import { VehicleDetail } from "../interface/vehicleDetail.interface";

export class VehicleService{
  private vehicle : VehicleDetail[] = [
    {vehicleNumber: "CAD-1452",type:"car",isHybrid:true},
    {vehicleNumber: "CCC-4758",type:"car",isHybrid:false}
    ];
  setVehicle(vehicleDetailsFromDb : VehicleDetail){
    this.vehicle.push(vehicleDetailsFromDb);
  }

  addVehicle(vehicleDetailsByUser : VehicleDetail){
    this.vehicle.push(vehicleDetailsByUser);
  }

  getVehicles(){
    return this.vehicle;
  }
}
