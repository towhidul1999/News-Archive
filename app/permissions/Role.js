const Permission = require('./Permission');
const Role = require('./mongoose-models/Role');
const RolePermission = require('./mongoose-models/RolePermission');

class Role {

    static async create(data){
        await Role.createDataValidator(data);
        const role = new Role(data);
        return await role.save();
    }

    static async createDataValidator(data){
        if(!data.title) throw new Error('Role title is required');
        if(!data.alias) throw new Error('Role alias is required');
        if(!data.position_key) throw new Error('Role position key is required');
        if(!data.created_by) throw new Error('Role created by is required');
    }

    static async roleExists(role){
        return await Role.findOne({role: role});
    }

    static async assignPermissionWithRole(role, permission, createdBy){
        if(!this.roleExists(role)) throw new Error('Role does not exist');
        if(!Permission.exists(permission)) throw new Error('Permission does not exist');
        const rolePermission = new RolePermission({
            role: role,
            permission: permission,
            created_by: createdBy,
        });
        return await rolePermission.save();
    }

    static async assignPermissionsWithRole(role, permissions, createdBy){
        if(!this.roleExists(role)) throw new Error('Role does not exist');
        const rolePermissions = [];
        permissions.forEach(permission => {
            if(!Permission.exists(permission)) throw new Error(`Permission ${permission} does not exist`);
            rolePermissions.push({
                role: role,
                permission: permission,
                created_by: createdBy,
            });
        });
        return await RolePermission.insertMany(rolePermissions);
    }

    static async updatePositionKeys(dataArray){
        const bulkOps = dataArray.map(data => {
            return {
                updateOne: {
                    filter: { title: data.role },
                    update: { $set: { position_key: data.position_key } }
                }
            }
        });
        return await Role.bulkWrite(bulkOps);
    }
    
    static roleDetails(role){
        const role = this.roleExists(role);
        if(!role) throw new Error('Role does not exist');
        const permissions = RolePermission.find({role: role.title});
        return {
            role: role,
            permissions: permissions
        }
    }

    static async updateAlias(role, newTitle){
        const role = this.roleExists(role);
        if(!role) throw new Error('Role does not exist');
        role.title = newTitle;
        return await role.save();
    }

    static async updateDescription(role, newDescription){
        const role = this.roleExists(role);
        if(!role) throw new Error('Role does not exist');
        role.description = newDescription;
        return await role.save();
    }

    static async updatePermissions(role, permissions, createdBy){
        const role = this.roleExists(role);
        if(!role) throw new Error('Role does not exist');
        await RolePermission.deleteMany({role: role.role});
        return await this.assignPermissionsWithRole(role.role, permissions, createdBy);
    }

    static async __destroy(role){
        const role = this.roleExists(role);
        if(!role) throw new Error('Role does not exist');
        await RolePermission.deleteMany({role: role.role});
        return await role.delete();
    }

    static async roleHasPermission(role, permission){
        const role = this.roleExists(role);
        if(!role) throw new Error('Role does not exist');
        return await RolePermission.findOne({role: role.role, permission: permission});
    }





}