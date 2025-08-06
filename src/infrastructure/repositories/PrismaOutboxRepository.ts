// import { OutboxRepository } from '../../domain/repositories/OutboxRepository';
// import { OutboxEvent } from '../../domain/entities/OutboxEvent';
// import { DatabaseClient } from '../database/DatabaseClient';

// export class PrismaOutboxRepository implements OutboxRepository {
//   private readonly prisma = DatabaseClient.getInstance();

//   async save(event: OutboxEvent): Promise<OutboxEvent> {
//     const savedEvent = await this.prisma.outboxEvent.create({
//       data: {
//         id: event.id,
//         event_type: event.eventType,
//         event_data: event.eventData,
//         metadata: event.metadata as any,
//         processed: event.processed,
//         processed_at: event.processedAt,
//       },
//     });

//     return new OutboxEvent(
//       savedEvent.id,
//       savedEvent.event_type,
//       savedEvent.event_data,
//       savedEvent.metadata as any,
//       savedEvent.processed,
//       savedEvent.processed_at || undefined,
//       savedEvent.created_at
//     );
//   }

//   async findUnprocessed(): Promise<OutboxEvent[]> {
//     const events = await this.prisma.outboxEvent.findMany({
//       where: { processed: false },
//       orderBy: { created_at: 'asc' },
//     });

//     return events.map(
//       (event) =>
//         new OutboxEvent(
//           event.id,
//           event.event_type,
//           event.event_data,
//           event.metadata as any,
//           event.processed,
//           event.processed_at || undefined,
//           event.created_at
//         )
//     );
//   }

//   async markAsProcessed(eventId: string): Promise<void> {
//     await this.prisma.outboxEvent.update({
//       where: { id: eventId },
//       data: {
//         processed: true,
//         processed_at: new Date(),
//       },
//     });
//   }
// }
