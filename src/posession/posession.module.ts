import { Module, Global } from '@nestjs/common';
import { PosessionService } from './posession.service';
import { TrainingPlanModule } from 'src/trainingplan/trainingplan.module';

@Global()
@Module({
    imports: [TrainingPlanModule],
    providers: [PosessionService],
    exports: [PosessionService]
})
export class PosessionModule {}