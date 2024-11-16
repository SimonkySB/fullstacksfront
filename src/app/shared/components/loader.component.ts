import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  template: `
    @if(loading$ | async; as loading) {
    <div class="loader-container" [ngClass]="{show: loading}">
        <div class="spin-loader"></div>
    </div>
}
  `,
  styles: [`
    .loader-container {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100vw;
      height: 100vh;
      justify-content: center;
      align-items: center;
      display: none;
      transition: all linear 1s;

    }

    .loader-container.show {
      display: flex;
      backdrop-filter: blur(3px);
      z-index: 2000;
    }

    .loader-container .spin-loader {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 20px solid green;
      border-top-color: transparent;
      animation: normal .75s linear spin infinite;
    }

    @keyframes spin {
      to {
        transform: rotateZ(360deg);
      }
    }
  `]
})
export class LoaderComponent {
  #loaderService = inject(LoaderService)

  loading$ = this.#loaderService.loading$;
}
