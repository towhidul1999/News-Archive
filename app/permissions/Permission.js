const PermissionList = require('./PermissionList');
class Permission{
    static list(){
        return PermissionList.permissions;
    }
    static listGroupByKind(){
        const kinds = PermissionList.permissions.map(permission => permission.kind);
        const uniqueKinds = [...new Set(kinds)];
        let groupedPermissions = [];
        uniqueKinds.forEach(kind => {
            groupedPermissions.push({
                kind: kind,
                permissions: Permission.listByKind(kind)
            });
        });
        return groupedPermissions;
        
    }
    static listByGroup(group){
        return PermissionList.permissions.filter(permission => permission.group === group);
    }
    static listGroupByGroup(){
        const groups = PermissionList.permissions.map(permission => permission.group);
        const uniqueGroups = [...new Set(groups)];
        let groupedPermissions = [];
        uniqueGroups.forEach(group => {
            groupedPermissions.push({
                group: group,
                permissions: Permission.listByGroup(group)
            });
        });
        return groupedPermissions;
    }
    static listByKind(kind){
        return PermissionList.permissions.filter(permission => permission.kind === kind);
    }
    static details(permission){
        return PermissionList.permissions.find(permission => permission.permission === permission);
    }
    static exists(permission){
        return PermissionList.permissions.find(permission => permission.permission === permission) !== undefined;
    }
}

module.exports = Permission;