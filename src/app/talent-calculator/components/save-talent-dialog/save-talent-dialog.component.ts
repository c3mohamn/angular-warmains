import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewTalent } from '../../../shared/models/talent.model';
import { TalentMetaInfo } from '../../../state/talent-calculator/talent-calculator.reducer';

@Component({
  selector: 'app-save-talent-dialog',
  templateUrl: './save-talent-dialog.component.html',
  styleUrls: ['./save-talent-dialog.component.scss']
})
export class SaveTalentDialogComponent {
  meta: TalentMetaInfo;
  username: string;
  description = '';
  name = '';

  constructor(
    public dialogRef: MatDialogRef<SaveTalentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.username = data.username;
    this.meta = data.meta;
  }

  saveTalent(): void {
    const newTalent: NewTalent = {
      username: this.username,
      name: this.name,
      description: this.description,
      glyph_param: this.meta.glyphUrlParam,
      talent_param: this.meta.talentUrlParam,
      spec: this.meta.spec,
      class_id: this.meta.classId.toString(),
      preview: this.meta.preview
    };

    this.dialogRef.close(newTalent);
  }
}
