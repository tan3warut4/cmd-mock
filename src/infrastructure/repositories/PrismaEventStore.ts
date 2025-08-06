// import { EventStore, EventStream } from '../../domain/repositories/EventStore';
// import { DomainEvent } from '../../domain/events/DomainEvent';
// import { DatabaseClient } from '../database/DatabaseClient';
// import { PrismaClient } from '@prisma/client';
// import pino from 'pino';

// const logger = pino({ name: 'PrismaEventStore' });

// export class PrismaEventStore implements EventStore {
//   private readonly prisma: PrismaClient;

//   constructor() {
//     this.prisma = DatabaseClient.getInstance();
//   }

//   private extractUpdatedBy(event_data: any): any {
//     if (event_data.updatedBy) {
//       return event_data.updatedBy;
//     }
//     if (event_data.deletedBy) {
//       return event_data.deletedBy;
//     }
//     return null;
//   }

//   async saveEvents(aggregate_id: string, events: DomainEvent[], expectedVersion: number): Promise<void> {
//     if (events.length === 0) {
//       return;
//     }

//     try {
//       await this.prisma.$transaction(async (tx) => {
//         // Check current version for optimistic concurrency control
//         const lastEvent = await tx.eventLog.findFirst({
//           where: { aggregate_id },
//           orderBy: { event_version: 'desc' },
//         });

//         const currentVersion = lastEvent?.event_version || 0;
//         if (currentVersion !== expectedVersion) {
//           throw new Error(
//             `Concurrency conflict. Expected version ${expectedVersion}, but current version is ${currentVersion}`
//           );
//         }

//         // Save all events
//         const eventRecords = events.map((event, index) => ({
//           id: event.id,
//           aggregate_id: event.aggregateId,
//           event_type: event.eventType,
//           event_version: expectedVersion + index + 1,
//           event_data: event.eventData,
//           metadata: event.metadata || {},
//           occurred_at: event.occurredAt,
//           updated_by: this.extractUpdatedBy(event.eventData),
//         }));

//         await tx.eventLog.createMany({
//           data: eventRecords,
//         });

//         logger.info(
//           {
//             aggregate_id,
//             eventCount: events.length,
//             newVersion: expectedVersion + events.length,
//           },
//           'Events saved to event store'
//         );
//       });
//     } catch (error) {
//       logger.error({ error, aggregate_id, expectedVersion }, 'Failed to save events');
//       throw error;
//     }
//   }

//   async getEvents(aggregate_id: string, fromVersion?: number): Promise<DomainEvent[]> {
//     const where: any = { aggregate_id };
//     if (fromVersion !== undefined) {
//       where.event_version = { gt: fromVersion };
//     }

//     const eventRecords = await this.prisma.eventLog.findMany({
//       where,
//       orderBy: { event_version: 'asc' },
//     });

//     return eventRecords.map((record: any) => ({
//       id: record.id,
//       aggregateId: record.aggregate_id,
//       eventType: record.event_type,
//       eventVersion: record.event_version,
//       eventData: record.event_data,
//       metadata: record.metadata as any,
//       occurredAt: record.occurred_at,
//     }));
//   }

//   async getAllEvents(fromPosition?: number, maxCount?: number): Promise<DomainEvent[]> {
//     const where: any = {};
//     if (fromPosition !== undefined) {
//       where.position = { gt: fromPosition };
//     }

//     const eventRecords = await this.prisma.eventLog.findMany({
//       where,
//       orderBy: { position: 'asc' },
//       take: maxCount,
//       select: {
//         id: true,
//         aggregate_id: true,
//         event_type: true,
//         event_version: true,
//         event_data: true,
//         metadata: true,
//         occurred_at: true,
//       },
//     });

//     return eventRecords.map((record: any) => ({
//       id: record.id,
//       aggregateId: record.aggregate_id,
//       eventType: record.event_type,
//       eventVersion: record.event_version,
//       eventData: record.event_data,
//       metadata: record.metadata as any,
//       occurredAt: record.occurred_at,
//     }));
//   }

//   async getEventsByType(event_type: string, fromPosition?: number, maxCount?: number): Promise<DomainEvent[]> {
//     const where: any = { event_type };
//     if (fromPosition !== undefined) {
//       where.position = { gt: fromPosition };
//     }

//     const eventRecords = await this.prisma.eventLog.findMany({
//       where,
//       orderBy: { position: 'asc' },
//       take: maxCount,
//       select: {
//         id: true,
//         aggregate_id: true,
//         event_type: true,
//         event_version: true,
//         event_data: true,
//         metadata: true,
//         occurred_at: true,
//         // Explicitly exclude position to avoid BigInt serialization issues
//       },
//     });

//     return eventRecords.map((record: any) => ({
//       id: record.id,
//       aggregateId: record.aggregate_id,
//       eventType: record.event_type,
//       eventVersion: record.event_version,
//       eventData: record.event_data,
//       metadata: record.metadata as any,
//       occurredAt: record.occurred_at,
//     }));
//   }

//   async getSnapshot(aggregateId: string): Promise<EventStream | null> {
//     const events = await this.getEvents(aggregateId);
//     if (events.length === 0) {
//       return null;
//     }

//     const lastEvent = events[events.length - 1];
//     return {
//       aggregateId,
//       events,
//       version: lastEvent.eventVersion,
//     };
//   }
// }
