import { ICommandHandler } from "@nestjs/cqrs";
import { IncrementViewCommand } from "./IncrementViewCommand";

export interface IncrementView extends ICommandHandler<IncrementViewCommand, void> {}
