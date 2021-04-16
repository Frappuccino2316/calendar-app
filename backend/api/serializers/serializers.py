from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from api.models.team_models import Team
from api.models.task_models import Task
from users.models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'password', 'email', 'team_of_affiliation')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
    
    def validate_password(self,value):
        return make_password(value)

class TaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    
    class Meta:
        model = Task
        fields = (
            'id',
            'title',
            'team_in_charge',
            'status',
            'start_date',
            'end_date',
            'created_at',
            'updated_at'
        )
    
    def create(self, validated_data):
        user = self.context['request'].user
        team = Team.objects.get(id=user.team_of_affiliation.id)
        task = Task(
            title = validated_data['title'],
            team_in_charge = team
        )
        task.save()
        return task
        
class TeamSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    
    class Meta:
        model = Team
        fields = ('id', 'team_name', 'created_at', 'updated_at')

class MyselfSerializer(serializers.ModelSerializer):
    team_of_affiliation = TeamSerializer(many=False, read_only=True)
    
    class Meta:
        model = Users
        fields = ('id', 'username', 'email', 'team_of_affiliation')
    
class MyselfUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'email', 'team_of_affiliation')
    