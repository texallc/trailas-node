import { FindAttributeOptions } from "@sequelize/core";
import { PropsBulkCreate, PropsDeleteModel, PropsGetAllModel, PropsFindOneModel, PropsCreateModel, PropsUpdateModel, PropsIncrementModel } from "../interfaces/repositories";
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

export const findAllModel = <T>({ model, where, include, attributes, order, limit, page }: PropsGetAllModel<T>) => model.findAll({
  where,
  attributes: attributes as FindAttributeOptions<T>,
  include,
  offset: typeof page === "undefined" ? page : (page - 1) * (limit || 5),
  order: order || [['id', 'DESC']],
  limit
});

export const bulkCreate = async <T extends {}>({ model, data, updateOnDuplicate, transaction }: PropsBulkCreate<T>) => {
  const t = transaction || await sequelize.startUnmanagedTransaction();

  try {
    const result = await model.bulkCreate(
      data as unknown as MakeNullishOptional<T>[],
      {
        transaction: t,
        updateOnDuplicate,
        hooks: false,
        returning: false,
      }
    );

    if (!transaction) await t.commit();

    return result;
  } catch (error) {
    if (!transaction) await t.rollback();
    throw error;
  }
};

export const deleteModel = <T extends {}>({ model, where, transaction }: PropsDeleteModel<T>) => model.destroy({ where, transaction });