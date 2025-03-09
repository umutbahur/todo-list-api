module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    }); 

    Todo.associate = (models) => {
        Todo.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return Todo;
};