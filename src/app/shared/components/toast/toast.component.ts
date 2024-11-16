import { Component, computed, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3 top-0 start-50 translate-middle-x', style: 'z-index: 1200' },
})
export class ToastComponent {

  toast = inject(ToastService)

  config = computed(() => {
    const cfg = this.toast.toast()
    if(!cfg) {return null}
    return {
      ...cfg, 
      classname: cfg?.type === 'success' ? "bg-success text-light" : cfg?.type === 'danger' ? "bg-danger text-light" : cfg?.type === 'primary' ? "bg-primary text-light" : ""
    }
  })


  close() {
    this.toast.close()
  }
    
}
