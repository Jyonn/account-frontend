import {Injectable} from '@angular/core';
import {ToastService} from './toast.service';
import {Toast} from '../models/toast';

@Injectable()
export class OneWorker {
  static workers = new Set();

  constructor(
    private toastService: ToastService,
  ) {}

  do(identifier: string, worker, busyHandler = null) {
    if (OneWorker.workers.has(identifier)) {
      if (typeof busyHandler === 'function') {
        busyHandler();
      } else if (busyHandler instanceof Toast) {
        this.toastService.show(busyHandler);
      }
      return;
    }

    OneWorker.workers.add(identifier);

    const callback = () => {
      OneWorker.workers.delete(identifier);
    };
    worker(callback);
  }
}
