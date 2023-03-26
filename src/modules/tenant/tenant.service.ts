import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from '../domain/schemas/tenant.schema';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name, 'admin1') private tenentModel: Model<Tenant>,
  ) {}

  async create(data: CreateTenantDto) {
    let tenantDetails = new this.tenentModel();
    tenantDetails.subdomain = data.subdomain;
    tenantDetails.databaseName = data.databaseName;

    await tenantDetails.save();

    return tenantDetails;
  }

  async findAll() {
    return await this.tenentModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: any) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
