import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './entities/transaction.entity';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthService } from 'src/auth/auth.service';

import { envs } from 'src/config';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly authService: AuthService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const { userId, transactionId } = createTransactionDto;
      const user = await this.authService.findOneBy(userId);
      const transaction = this.transactionRepository.create({
        user,
        transactionId,
      });
      await this.transactionRepository.save(transaction);
      return transaction;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async allTransactions(userId: string) {
    const getAllTransactions = await this.findAllIdTransactionsByUser(userId);
    const transactions = await Promise.all(
      getAllTransactions.map((transaction) =>
        this.generateTransactions(transaction),
      ),
    );
    return transactions;
  }

  async findAllIdTransactionsByUser(id: string) {
    const allTransactions = await this.transactionRepository.find({
      select: ['transactionId'],
      where: { user: { id } },
    });
    return allTransactions.map((transaction) => transaction.transactionId);
  }

  async generateTransactions(transaction: string) {
    const api_url = 'https://apipre.pagoplux.com/intv1';
    const url = `${api_url}/integrations/getTransactionByIdStateResource?idTransaction=${transaction}`;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${envs.pagoPluxUser}:${envs.pagoPluxPassword}`,
      ).toString('base64')}`,
    };

    try {
      const response = await fetch(url, {
        headers,
      });
      return response.json();
    } catch (error) {
      console.error(
        'Error generating payment link:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
