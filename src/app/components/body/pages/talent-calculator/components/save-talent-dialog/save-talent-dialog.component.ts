import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-talent-dialog',
  templateUrl: './save-talent-dialog.component.html',
  styleUrls: ['./save-talent-dialog.component.scss']
})
export class SaveTalentDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SaveTalentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
