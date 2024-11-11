import { Module } from '@nestjs/common';
import { LeaveTypesController } from './leave-types.controller';
import { LeaveTypesService } from './providers/leave-types.service';

@Module({
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService]
})
export class LeaveTypesModule {}
