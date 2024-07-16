import {
  DataTypes,
  Model,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from 'sequelize';

class DeviceInfo extends Model<
  InferAttributes<DeviceInfo>,
  InferCreationAttributes<DeviceInfo>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare baseOs: 'ios' | 'android' | 'windows' | 'web';
  declare version: string | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const InitializeDeviceInfoModel = (sequelize: Sequelize) => {
  DeviceInfo.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },

      version: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      baseOs: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'Device_Infos',
      sequelize, // passing the `sequelize` instance is required
    },
  );
};

export default DeviceInfo;
