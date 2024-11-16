import { Injectable, signal } from "@angular/core";


export interface ToastConfig {
    message: string,
    type: 'success' | 'danger' | 'primary'
} 

@Injectable({providedIn: 'root'})
export class ToastService {

    #toast = signal<ToastConfig | null>(null)

    toast = this.#toast.asReadonly()


    show(toast: ToastConfig) {
        this.#toast.set(toast)
    }

    close() {
        this.#toast.set(null)
    }

    
}