import { FindAttributeOptions } from "@sequelize/core";
import { PropsBulkCreate, PropsDeleteModel, PropsGetAllModel, PropsFindOneModel, PropsCreateModel, PropsUpdateModel, PropsFindByPrimaryKeyModel, PropsIncrementModel } from "../interfaces/repositories";
import { MakeNullishOptional } from "@sequelize/core/_non-semver-use-at-your-own-risk_/utils/types.js";

export const createModel = <T extends {}>({ model, data, transaction }: PropsCreateModel<T>) => model.create(data, { transaction });

export const updateModel = <T extends {}>({ model, data, where, transaction }: PropsUpdateModel<T>) => model.update(data, { where, transaction });

export const findOneModel = <T extends {}>({ model, where, include, attributes, transaction }: PropsFindOneModel<T>) => model.findOne({
  where,
  attributes: attributes as FindAttributeOptions<T>,
  include,
  limit: 1,
  transaction
});

export const findOrCreateModel = <T extends {}>({ model, data, where, transaction }: PropsCreateModel<T>) => model.findOrCreate({
  where,
  defaults: data,
  transaction
});

export const findByPrimaryKeyModel = <T extends {}>({ model, primaryKey, include, attributes, transaction }: PropsFindByPrimaryKeyModel<T>) => model.findByPk(primaryKey, {
  attributes: attributes as FindAttributeOptions<T>,
  include,
  transaction
});

export const findAllModel = <T extends {}>({ model, where, include, attributes, order, limit, page }: PropsGetAllModel<T>) => model.findAll({
  where,
  attributes: attributes as FindAttributeOptions<T>,
  include,
  offset: typeof page === "undefined" ? page : (page - 1) * (limit || 10),
  order: order || [['id', 'DESC']],
  limit: limit || 10
});

export const findAndCountModel = async <T extends {}>({ model, where, include, attributes, order, limit, page, distinct }: PropsGetAllModel<T>) => {
  try {
    const paginationModelPromise = model.findAll({
      attributes: attributes as FindAttributeOptions<T>,
      where,
      limit,
      offset: typeof page === "undefined" ? page : (page - 1) * (limit || 10),
      include,
      order: order || [['id', 'DESC']],
    });
    const totalModelPromise = model.count({ where, include, distinct });

    const [paginationModel, total] = await Promise.all([paginationModelPromise, totalModelPromise]);

    return {
      total,
      list: paginationModel.map(r => r.dataValues)
    };
  } catch (error) {
    throw error;
  }
};

export const bulkCreate = async <T extends {}>({ model, data, updateOnDuplicate, transaction }: PropsBulkCreate<T>) => {
  try {
    const result = await model.bulkCreate(
      data as unknown as MakeNullishOptional<T>[],
      {
        transaction,
        updateOnDuplicate,
        hooks: false,
        returning: false,
      }
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteModel = <T extends {}>({ model, where, transaction }: PropsDeleteModel<T>) => model.destroy({ where, transaction });

export const incrementModel = <T extends {}>({ model, where, transaction, by, key }: PropsIncrementModel<T>) => model.increment(key, { where, by, transaction });