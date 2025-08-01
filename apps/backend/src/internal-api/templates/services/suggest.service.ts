import { BadGatewayException, Injectable } from '@nestjs/common';
import { SearchResult, Template } from '../../../interfaces/template.interface';
import { ProviderIndex } from '../index/provider.store';
import { SearchDto } from '../dto/search.dto';

@Injectable()
export class SuggestService {
  constructor(private store: ProviderIndex) {}

  async suggestTemplate(searchDto: SearchDto): Promise<{
    suggestions: {
      title: string;
      usageCount: number;
      category: string;
      slugUrl: string;
    }[];
  }> {
    try {
      const index = this.store.getIndexSuggestions();

      if (!index) {
        throw new BadGatewayException(
          'Index is not available, updating index...',
        );
      }

      const results = index.search(searchDto.name, {
        limit: 20,
        enrich: true,
      });

      const totalResults = (await results).length;

      if (totalResults === 0) {
        return { suggestions: [] };
      }

      const result = results[0].result.map((item: SearchResult) => {
        return {
          title: item.doc.title,
          usageCount: item.doc.usageCount,
          category: item.doc.categories,
          slugUrl: item.doc.slugUrl,
        };
      });

      return { suggestions: result };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
