import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";

const minIngredientsLength = 15

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html"
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

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? "", [
      Validators.required,
    ]),
    price: new FormControl(this.data?.price ?? "", [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    image: new FormControl(this.data?.image ?? ""), //todo выберите изображение
    ingredients: new FormControl(this.data?.ingredients ?? "", [
      Validators.required,
      Validators.pattern("^[А-Яа-яA-Za-z]*$"),
      Validators.minLength(minIngredientsLength)
    ]),
  })

  readonly errorTitleMap: { [key: string]: string } = {
    required: "напиши какое-нибудь название"
  }
  readonly errorPriceMap: { [key: string]: string } = {
    required: "укажите цену",
    pattern: "должно быть число"
  }

  readonly errorIngredientsMap: { [key: string]: string } = {
    required: "перечислите ингредиенты в составе",
    pattern: "должны быть ингредиенты, перечисленные через запятую",
    minlength: `минимум ${minIngredientsLength} символов`
  }

  get titleControl(): FormControl {
    return this.myForm.get("title") as FormControl
  }

  get titleControlError(): string | null {
    const errors = this.titleControl.errors ?? {}
    const errorKeys = Object.keys(errors)
    return errorKeys.length ? errorKeys[0] : null
  }

  get priceControl(): FormControl {
    return this.myForm.get("price") as FormControl
  }

  get priceControlError(): string | null {
    const errors = this.priceControl.errors ?? {}
    const errorKeys = Object.keys(errors)
    return errorKeys.length ? errorKeys[0] : null
  }

  get ingredientsControl(): FormControl {
    return this.myForm.get("ingredients") as FormControl
  }

  get ingredientsControlError(): string | null {
    const errors = this.ingredientsControl.errors ?? {}
    const errorKeys = Object.keys(errors)
    return errorKeys.length ? errorKeys[0] : null
  }

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
