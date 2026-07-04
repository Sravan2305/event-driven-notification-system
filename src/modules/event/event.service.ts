import type { CreateEventDto } from "./event.schema";
import { EventRepository } from "./event.repository";

export class EventService {
  constructor(
    private readonly eventRepository: EventRepository
  ) {}

  async create(dto: CreateEventDto) {
    return this.eventRepository.create(dto);
  }
}