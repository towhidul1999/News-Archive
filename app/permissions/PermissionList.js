exports.permissions = [
    {
        "permission": "SUPREME",
        "description": "Everything.",
        "kind": "SUPREME",
        "group": "SUPREME",
        "rules": {}
    },
    {
        "permission": "ROLE_CREATE",
        "description": "Create Role.",
        "kind": "CREATE",
        "group": "Role Management",
        "rules": {}
    },
    {
        "permission": "ROLE_UPDATE",
        "description": "Update Role Info & Permissions for the Role.",
        "kind": "UPSERT",
        "group": "Role Management",
        "rules": {}
    },
    {
        "permission": "ROLE_ASSIGN",
        "description": "Assign Role.",
        "kind": "UPSERT",
        "group": "Role Management",
        "rules": {}
    },
    {
        "permission": "ROLE_READ",
        "description": "Read Role Details.",
        "kind": "READ",
        "group": "Role Management",
        "rules": {}
    },
    {
        "permission": "USER_CREATE",
        "description": "Create a new user.",
        "kind": "CREATE",
        "group": "User Management",
        "rules": {
            "levelCheck": true
        }
    },
    {
        "permission": "USER_CREATE_WITH_ACTIVATION",
        "description": "Create a new user with activation.",
        "kind": "CREATE",
        "group": "User Management",
        "rules": {
            "powers": {
                "status": ["Active"]
            },
            "levelCheck": true
        }
    },
    {
        "permission": "USER_ACTIVATION",
        "description": "Activate a user.",
        "kind": "UPDATE",
        "group": "User Management",
        "rules": {
            "powers": {
                "status": ["Active", "Inactive"]
            },
            "levelCheck": true
        }
    },
    {
        "permission": "USER_READ_OTHERS",
        "description": "Read other user's data.",
        "kind": "READ",
        "group": "User Management",
        "rules": {
            "hidden": ["password", "email", "username"],
            "levelCheck": true
        }
    },
    {
        "permission": "USER_READ_OWN",
        "description": "Read own data.",
        "kind": "READ",
        "group": "User Management",
        "rules": {
            "hidden": ["password"],
            "own": true
        }
    },

];