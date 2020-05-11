import {BaseEntity} from "./entity/BaseEntity";
import {EntityRepository, AbstractRepository} from "typeorm"
import {BaseModel} from "@99_base_model/BaseModel";
import {BaseUtils} from "@99_base_utils/BaseUtils";

@EntityRepository()
export abstract class BaseRepository<E extends BaseEntity> extends AbstractRepository<E> {


    protected async findById(id: number): Promise<E | undefined> {

        return this.repository.findOne(id);

    }

    protected async findByIds(id: number[]): Promise<E[]> {
        return this.repository.findByIds(id);
    }

    protected find(value?: any): Promise<E[]> {
        return this.repository.find(value);
    }

    protected findWithCondition(queryCondition: any): Promise<E[]> {

        if (!(queryCondition.select && queryCondition.select.length)) {
            delete queryCondition.select;
        }
        return this.repository.find(queryCondition);
    }

    protected createAndSave(entity: E) {
        return this.manager.save(entity);
    }

    public async deleteById(id: number) {
        const entity = await this.repository.findOne(id);
        return this.manager.remove(entity);
    }

    protected makeQueryCondition(): any {
        return {
            where: {},
            select: [],
            include: []
        }
    }

    protected mapBaseEntityToBaseModel<E extends BaseEntity, M extends BaseModel>(entity: E, model: M) {

        model.id = entity.id;
        model.createdAt = BaseUtils.dateAsYYYYMMDDHHMMSS(entity.createdAt);
        model.createdBy = entity.createdBy;
        model.updatedAt = BaseUtils.dateAsYYYYMMDDHHMMSS(entity.updatedAt);
        model.updatedBy = entity.updatedBy;
    }

    protected mapBaseModelToBaseEntity<M extends BaseModel, E extends BaseEntity>(model: M, entity: E) {

        entity.id = model.id;
        entity.createdBy = model.createdBy;
        entity.updatedBy = model.updatedBy;
    }
}