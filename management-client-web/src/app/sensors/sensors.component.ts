import { Component, OnInit, Inject,  ChangeDetectorRef } from '@angular/core';
import { SensorService} from '../location/services/sensor.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { element } from '@angular/core/src/render3/instructions';

export interface DialogData {
  sensor: any;
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  // _id, sensor_name, ip_address
  sensors: Array<any> = [];
  sensorsColumns: string[] = ['_id', 'sensor_name', 'ip_address', 'actions'];

  constructor(private sensorService: SensorService, private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog) { }

  getSensorList(): void {
    this.sensorService.getSensorList().subscribe(data => {
      this.sensors = data;
      this.changeDetectorRefs.detectChanges();
    }, error => {
      console.log(error);
    });
  }

  deleteSensor(id): void {
    this.sensorService.deleteSensor(id).subscribe(data => {
      console.log(data);
      this.getSensorList();
    }, error => {
      console.log(error);
    });
  }

  updateSensor(id): void {
    const s = this.sensors.find( element => {
      return element.id = id;
    });
    const dialogRef = this.dialog.open(ChangeSensorNameDialog, {
      width: '250px',
      data: { sensor: s}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.sensorService.updateSensor(result).subscribe(data => {
          console.log(data);
          this.getSensorList();

        }, error => {
          console.log(error);
        });
      }
    });
  }

  onCheckboxChange(event, id) {
    const sensor =  this.sensors.find(element => {
      return element._id = id;
    });
    this.sensorService.updateSensor(sensor).subscribe(data => {
      console.log(data);
      this.getSensorList();

    }, error => {
      console.log(error);
    });
  }
  ngOnInit() {
    this.getSensorList();
    this.changeDetectorRefs.detectChanges();
  }

}


@Component({
  selector: 'app-change-sensor-name-dialog',
  templateUrl: 'dialogs/change-sensor-name-dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class ChangeSensorNameDialog {
  constructor(
    public dialogRef: MatDialogRef<ChangeSensorNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
