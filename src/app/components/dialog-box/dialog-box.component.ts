import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.scss"]
})
export class DialogBoxComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  isNew: boolean = true;

  ngOnInit(): void {
    if (this.data) this.isNew = false
  }

  myForm: FormGroup = new FormGroup({ //todo formbuilder валидация формы
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ""),
    price: new FormControl(this.data?.price ?? ""),
    image: new FormControl(this.data?.image ?? ""),
    ingredients: new FormControl(this.data?.ingredients ?? ""),
  })

  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: "/assets/images/four_mayo.jpg",
      ingredients: this.myForm.value.ingredients
    }
    this.dialogRef.close(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close(null)
  }
}
