import { Observable, Subject } from 'rxjs';

import { ModuleRef } from '@nestjs/core';

export class StaticInjector {
  private static instance: StaticInjector;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new StaticInjector();
    }
    return this.instance;
  }

  public static get<Provider = any, Result = any>(
    provider: Provider,
    strict = false,
  ) {
    return this.getInstance().get<Provider, Result>(provider, strict);
  }

  public static getObservable(): Observable<StaticInjector> {
    return this.getInstance().subject.asObservable();
  }

  private moduleRef: ModuleRef;
  private subject = new Subject<StaticInjector>();

  setModuleRef(moduleRef: ModuleRef) {
    this.moduleRef = moduleRef;
    this.subject.next(this);
  }

  get<Provider = any, Result = any>(provider: any, strict = false) {
    return this.moduleRef.get<Provider, Result>(provider, { strict });
  }
}
