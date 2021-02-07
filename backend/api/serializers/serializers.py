from rest_framework import serializers
from api.models import Task, Team
# from django.contrib.auth.models import User
from users.models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

class TaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'team_in_charge', 'created_at', 'updated_at')
        
class TeamSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    
    class Meta:
        model = Team
        fields = ('id', 'team_name', 'created_at', 'updated_at')
        