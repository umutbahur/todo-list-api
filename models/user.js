module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    });

    User.associate = (models) => {
        User.hasMany(models.Todo, {
            foreingKey: 'userId',
            as: 'todos',
        });
    };
    
    return User;
};