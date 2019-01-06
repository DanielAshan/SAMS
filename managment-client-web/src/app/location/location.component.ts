import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { LocationService } from './services/location.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  id: string;
  newLocationName: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit {
  name = new FormControl('');
  locationList: Array<any> = [];
  locationListColumns: string[] = ['_id', 'name', 'actions'];
  constructor(private locationService: LocationService, private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  getLocationList(): void {
    this.locationService.getLocationList().subscribe(data => {
      console.log(data);
      this.locationList = data;
      this.changeDetectorRefs.detectChanges();
    }, error => {
      console.log(error);
    });
  }

  createLocation(): void {
    console.log('test ' + this.name.value);
    this.locationService.createLocation(this.name.value).subscribe(data => {
      console.log(data);
      this.getLocationList();
    }, error => {
      console.log(error);
    });
  }

  updateLocation(id): void {
    const dialogRef = this.dialog.open(ChangeLocationNameDialog, {
      width: '250px',
      data: {id: id, newLocationName: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.locationService.updateLocation(result.id, result.newLocationName).subscribe(data => {
        console.log(data);
        this.getLocationList();
      }, error => {
        console.log(error);
      });
    });
  }

  deleteLocation(id): void {
    this.locationService.deleteLocation(id).subscribe(data => {
      console.log(data);
      this.getLocationList();
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.getLocationList();
  }

}

@Component({
  selector: 'app-change-location-name-dialog',
  templateUrl: 'dialogs/change-location-name-dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class ChangeLocationNameDialog {
  constructor(
    public dialogRef: MatDialogRef<ChangeLocationNameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
