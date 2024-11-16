import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { LoaderService } from "../shared/services/loader.service";
import { ToastConfig, ToastService } from "../shared/services/toast.service";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class UtilService {

    private loader = inject(LoaderService)
    private toast = inject(ToastService)

    trimControlValue(formControl: AbstractControl<string>){
        formControl.setValue(formControl.value.trim(), {emitEvent: false})
        formControl.updateValueAndValidity()
    }

    trimControlsValues(form: FormGroup){
        for(const c of Object.values(form.controls)){
            if(typeof c.value === "string") {
                this.trimControlValue(c)
            }
        }
    }


    loaderShow() {
        this.loader.show()
    }

    
    loaderHide() {
        this.loader.hide()
    }


    toastShow(cfg: ToastConfig) {
        this.toast.show(cfg)
    }

    toastClose() {
        this.toast.close()
    }

    handleError(err: any) {
        if(err instanceof HttpErrorResponse) {
            if(err.status === 422) {
                this.toast.show({message: JSON.stringify(err.error), type: 'danger'})
            }
            else {
                this.toast.show({message: err.error, type: 'danger'})
            }
        }
    }


}