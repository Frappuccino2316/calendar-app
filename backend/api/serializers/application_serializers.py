from rest_framework import serializers
from api.models.application_models import ApplicationToTeam
from api.serializers.serializers import UserSerializer

class ApplicationToTeamSerializer(serializers.ModelSerializer):
    applicant = UserSerializer(many=False, read_only=True)
    
    class Meta:
        model = ApplicationToTeam
        fields = ('id', 'applicant', 'application_team')

class ApplicationToTeamCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationToTeam
        fields = ('id', 'application_team')
    
    def create(self, validated_data):
        user = self.context['request'].user
        
        if user.team_of_affiliation:
            raise serializers.ValidationError("Already belong to team")
        
        application = ApplicationToTeam(
            applicant = user,
            application_team = validated_data['application_team']
        )
        application.save()
        return application
