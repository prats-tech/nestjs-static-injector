import { Observable, Subject } from 'rxjs';

import { ModuleRef } from '@nestjs/core';

export class StaticInjector {
  private static instance: StaticInjector;

  public static getInstance() {
    if (!this.instance) this.instance = new StaticInjector();
    return this.instance;
  }

  public static get(provider: any) {
    return this.getInstance().get(provider);
  }

  public static getObservable(): Observable<StaticInjector> {
    return this.getInstance().subject$.asObservable();
  }

  private moduleRef: ModuleRef;

  private subject$ = new Subject<StaticInjector>();

  setModuleRef(moduleRef: ModuleRef) {
    this.moduleRef = moduleRef;
    this.subject$.next(this);
  }
  get(provider: any) {
    return this.moduleRef.get(provider, { strict: false });
  }
}
