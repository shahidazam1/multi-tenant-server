import { Module } from '@nestjs/common';
import { CornService } from './corn.service';

@Module({
  imports: [],
})
export class CornModule {
  static register(): any {
    return {
      module: CornModule,
      providers: [CornService],
      exports: [],
    };
  }
}
