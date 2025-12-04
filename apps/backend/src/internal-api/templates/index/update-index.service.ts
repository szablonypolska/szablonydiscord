import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Document } from 'flexsearch';
import { PrismaService } from '@repo/shared';
import { Template, SearchResult } from '../../../interfaces/template.interface';
import { ProviderIndex } from './provider.store';

@Injectable()
export class UpdateIndexService {
  constructor(
    private prisma: PrismaService,
    private store: ProviderIndex,
  ) {}

  async onModuleInit() {
    this.updateIndex();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateIndex(): Promise<Document<SearchResult, true>> {
    const templates = await this.prisma.client.templates.findMany({});

    const index = new Document<SearchResult, true>({
      document: {
        id: 'id',
        field: ['title', 'description'],
        store: true,
      },
      tokenize: 'forward',
      cache: true,
    });

    const indexSuggestions = new Document<SearchResult, true>({
      document: {
        id: 'id',
        field: ['title'],
        store: true,
      },
      tokenize: 'forward',
      cache: true,
    });

    templates.forEach((template: Template) => {
      index.add(template);
      indexSuggestions.add(template);
    });

    this.store.setIndex(index);
    this.store.setIndexSuggestions(indexSuggestions);

    return this.store.getIndex();
  }
}
