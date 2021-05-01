import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { StaticInjector } from './static-injector.service';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class StaticInjectorModule implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    StaticInjector.getInstance().setModuleRef(this.moduleRef);
  }
}
