import { MakeNullishOptional } from "sequelize/types/utils";
import { PropsGetPaginationModel, PropsGetAllModel, PropsBulkCreate, PropsDeleteModel, PropsDataDistinctByProp } from "../interfaces/index";
import sequelize from "../sequelize";
import { FindAttributeOptions, Sequelize } from "sequelize";

export const getPaginationModel = async <T>({ model, where, page, limit, include, attributes, order, distinct, col }: PropsGetPaginationModel<T>) => {
  try {
    const paginationModel = await model.findAndCountAll({
      attributes: attributes as FindAttributeOptions,
      where,
      limit,
      offset: (page - 1) * limit,
      include,
      order: order || [['id', 'DESC']],
      distinct,
      col: col as string
    });

    return {
      total: paginationModel.count,
      list: paginationModel.rows.map(r => r.dataValues)
    };
  } catch (error) {
    throw error;
  }
};

export const getAllModel = <T>({ model, where, include, attributes, order, limit, page }: PropsGetAllModel<T>) => model.findAll({
  where,
  attributes: attributes as FindAttributeOptions,
  include,
  offset: typeof page === "undefined" ? page : (page - 1) * (limit || 5),
  order: order || [['id', 'DESC']],
  limit
});

export const bulkCreate = async <T extends object>({ model, data, updateOnDuplicate, transaction }: PropsBulkCreate<T>) => {
  const t = transaction || await sequelize.transaction();

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

export const getDataDistinctByProp = <T>({
  model,
  where,
  attribute
}: PropsDataDistinctByProp<T>
) => {
  const attributes: FindAttributeOptions = [
    [Sequelize.fn("DISTINCT", Sequelize.col(String(attribute))), String(attribute)],
  ];

  return getAllModel({
    model,
    attributes,
    where,
    order: [[String(attribute), "ASC"]],
  });
};