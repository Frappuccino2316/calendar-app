from rest_framework import permissions

class ProfilePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'POST':
            return True
        if obj.id == request.user.id:
            return True
        return False
