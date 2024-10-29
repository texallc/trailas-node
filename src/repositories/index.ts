import { FindAttributeOptions } from "@sequelize/core";
import { PropsBulkCreate, PropsDeleteModel, PropsGetAllModel, PropsFindOneModel, PropsCreateModel, PropsUpdateModel, PropsIncrementModel, PropsFindByPrimaryKeyModel } from "../interfaces/repositories";
import { MakeNullishOptional } from "@sequelize/core/_non-semver-use-at-your-own-risk_/utils/types.js";
import sequelize from "../sequelize";
import TotalTablesModel from "../models/totalTable";

export const createModel = <T extends {}>({ model, data, transaction }: PropsCreateModel<T>) => model.create(data, { transaction });

export const incrementModel = ({ where, transaction, by }: PropsIncrementModel) => TotalTablesModel.increment("total", { where, by, transaction });

export const createIncrementModel = async <T extends {}>({ model, data, where, transaction }: Omit<PropsIncrementModel, "by"> & PropsCreateModel<T>) => {
  const t = transaction || await sequelize.startUnmanagedTransaction();

  try {
    const createModelPromise = createModel({ model, data, transaction: t });
    const incrementModelPromise = incrementModel({ where, transaction: t });

    const [newModel] = await Promise.all([createModelPromise, incrementModelPromise])
    return newModel;
  }
  catch (error) {
    t.rollback();
    throw error;
  }
}

export const updateModel = <T extends {}>({ model, data, where, transaction }: PropsUpdateModel<T>) => model.update(data, { where, transaction });

export const findOneModel = <T>({ model, where, include, attributes }: PropsFindOneModel<T>) => model.findOne({
  where,
  attributes: attributes as FindAttributeOptions<T>,
  include,
  limit: 1
});

export const findByPrimaryKeyModel = <T>({ model, primaryKey, include, attributes, transaction }: PropsFindByPrimaryKeyModel<T>) => model.findByPk(primaryKey, {
  attributes: attributes as FindAttributeOptions<T>,
  include,
  transaction
});

export const findAllModel = <T>({ model, where, include, attributes, order, limit, page }: PropsGetAllModel<T>) => model.findAll({
  where,
  attributes: attributes as FindAttributeOptions<T>,
  include,
  offset: typeof page === "undefined" ? page : (page - 1) * (limit || 5),
  order: order || [['id', 'DESC']],
  limit
});

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

export const bulkCreateIncrementModel = async <T extends {}>({ model, data, where, transaction }: Omit<PropsIncrementModel, "by"> & PropsBulkCreate<T>) => {
  try {
    const bulkCreatePromise = bulkCreate({ model, data, transaction });
    const incrementModelPromise = incrementModel({ where, transaction, by: data.length });

    const [newModels] = await Promise.all([bulkCreatePromise, incrementModelPromise])
    return newModels;
  }
  catch (error) {
    throw error;
  }
};

export const deleteModel = <T extends {}>({ model, where, transaction }: PropsDeleteModel<T>) => model.destroy({ where, transaction });