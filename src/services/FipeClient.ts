import axios from 'axios';
import { renameKeys } from 'ramda-adjunct';
import { setupCache } from 'axios-cache-adapter';
import type Brand from '@/types/Brand';
import type Model from '@/types/Model';
import type Year from '@/types/Year';

const cache = setupCache({
  maxAge: 20 * 60 * 1000,
});

const baseUrl = Symbol('baseUrl');
const renameKeysResponse = (data: Array<any>) => data.map(renameKeys({
  codigo: 'id',
  nome: 'name',
}));

class FipeClient {
  [baseUrl] = 'https://parallelum.com.br/fipe/api/v1'

  axiosClient: ReturnType<typeof axios['create']>

  constructor() {
    this.axiosClient = axios.create({ adapter: cache.adapter });
  }

  getApiPath(url: string) {
    return `${this[baseUrl]}/${url}`;
  }

  async getBrands(): Promise<Array<Brand>> {
    const url = this.getApiPath('carros/marcas');

    const { data, status } = await this.axiosClient.get(url);

    if (status !== 200) {
      throw new Error('Status different of 200');
    }

    return renameKeysResponse(data) as Array<Brand>;
  }

  async getModels(brandId: string | number): Promise<Array<Model>> {
    const url = this.getApiPath(`carros/marcas/${brandId}/modelos`);

    const { data, status } = await this.axiosClient.get<{ modelos: any[] }>(url);

    if (status !== 200) {
      throw new Error('Status different of 200');
    }

    return renameKeysResponse(data.modelos) as Array<Model>;
  }

  async getYears(brandId: string | number, modelId: string | number): Promise<Array<Year>> {
    const url = this.getApiPath(`carros/marcas/${brandId}/modelos/${modelId}/anos`);

    const { data, status } = await this.axiosClient.get<any[]>(url);

    if (status !== 200) {
      throw new Error('Status different of 200');
    }

    return renameKeysResponse(data) as Array<Year>;
  }

  async getValueFromAuto(
    { brandId, modelId, yearId }: {
      brandId: string | number,
      modelId: string | number,
      yearId: string | number,
    },
  ): Promise<string> {
    const url = this.getApiPath(
      `carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`,
    );

    const { data, status } = await this.axiosClient.get<{ Valor: string }>(url);

    if (status !== 200) {
      throw new Error('Status different of 200');
    }

    return data.Valor;
  }
}

export default FipeClient;
