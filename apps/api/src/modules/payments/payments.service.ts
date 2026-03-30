import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, Payment } from '../../generated/prisma';
import { EventsGateway } from '../events/events/events.gateway';
import { SourceLockEvent } from '@tavvio/types';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async getById(id: string): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) throw new NotFoundException(`Payment ${id} not found`);
    return payment as any;
  }

  // Backwards compat
  async findById(id: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { id } }) as any;
  }

  async handleSourceLock(event: SourceLockEvent): Promise<Payment | null> {
    this.logger.log(`Handling source lock: ${event.lockId} on ${event.chain}`);

    // Match hashlock to a pending payment. We use hashlock as the unique identifier
    // for this swap across chains before it's properly linked.
    const payment = await this.prisma.payment.findFirst({
      where: {
        hashlock: event.hashlock,
        status: PaymentStatus.PENDING,
      },
    });

    if (!payment) {
      this.logger.warn(
        `No pending payment found for hashlock: ${event.hashlock}`,
      );
      return null;
    }

    // Update payment with source lock info
    const expiresAt = new Date(event.timelock * 1000);
    const updatedPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        sourceLockId: event.lockId,
        sourceAddress: event.sender,
        status: PaymentStatus.SOURCE_LOCKED,
        expiresAt,
      },
    });

    if (this.eventsGateway.server) {
      this.eventsGateway.server
        .to(payment.id)
        .emit('payment.updated', updatedPayment);
    }

    return updatedPayment as any;
  }

  async updateStatus(
    id: string,
    status: PaymentStatus,
    extra: Partial<Payment> = {},
  ): Promise<Payment> {
    this.logger.log(`Updating payment ${id} status to ${status}`);

    const data: any = {
      status,
      ...extra,
    };

    if (status === PaymentStatus.COMPLETED) {
      data.completedAt = new Date();
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { id },
      data,
    });

    if (this.eventsGateway.server) {
      this.eventsGateway.server.to(id).emit('payment.updated', updatedPayment);
    }

    return updatedPayment as any;
  }

  async findByStellarLockId(stellarLockId: string): Promise<Payment | null> {
    return this.prisma.payment.findFirst({
      where: { stellarLockId },
    }) as any;
  }

  async findExpiredLocked(): Promise<Payment[]> {
    const now = new Date();
    return this.prisma.payment.findMany({
      where: {
        status: {
          in: [PaymentStatus.SOURCE_LOCKED, PaymentStatus.STELLAR_LOCKED],
        },
        OR: [
          { expiresAt: { lt: now } },
          // Heuristic if expiresAt is somehow missing
          {
            expiresAt: null,
            createdAt: { lt: new Date(now.getTime() - 2 * 3600 * 1000) },
          },
        ],
      },
    }) as any;
  }
}
