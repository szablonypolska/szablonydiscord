import { BadGatewayException, Injectable } from '@nestjs/common';
import { SearchResult, Template } from '../../../interfaces/template.interface';
import { ProviderIndex } from '../index/provider.store';
import { SearchDto } from '../dto/search.dto';

@Injectable()
export class SearchService {
  constructor(private store: ProviderIndex) {}

  async searchTemplate(
    searchDto: SearchDto,
  ): Promise<{ templates: Template[]; type: string }> {
    try {
      const index = this.store.getIndex();

      if (!index) {
        throw new BadGatewayException(
          'Index is not available, updating index...',
        );
      }

      const results = index.search(searchDto.name, {
        limit: 50,
        enrich: true,
      });

      const result = results[0].result.map((item: SearchResult) => {
        return item.doc;
      });

      return { templates: result, type: 'search' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
