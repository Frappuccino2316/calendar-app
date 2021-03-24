from rest_framework import serializers
from api.models.application_models import ApplicationToTeam
from users.models import Users

class InvitationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationToTeam
        fields = ('id', 'applicant', 'application_team')
    
    def create(self, validated_data):
        invited_user = validated_data['applicant']
        team = validated_data['application_team']
        
        if invited_user.team_of_affiliation:
            raise serializers.ValidationError("Already belong to team")
        
        application = ApplicationToTeam(
            applicant = invited_user,
            application_team = team,
        )
        application.save()
        return application
