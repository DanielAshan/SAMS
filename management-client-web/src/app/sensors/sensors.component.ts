import { Component, OnInit, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  // _id, sensor_name, ip_address
  sensors: Array<any> = [{ _id: '5c3223809fb67f16e07b813e2', sensor_name: 'Sensor A1', ip_address: '192.168.0.101' },
  { _id: '5c3223809fb67f16e07b85f4', sensor_name: 'Sensor A2', ip_address: '192.168.0.128' },
  { _id: '5c3223809fb67f16e07b899a', sensor_name: 'Sensor B', ip_address: '192.168.0.153' }];
  sensorsColumns: string[] = ['_id', 'sensor_name', 'ip_address', 'actions'];

  constructor(private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.changeDetectorRefs.detectChanges();
  }

}
