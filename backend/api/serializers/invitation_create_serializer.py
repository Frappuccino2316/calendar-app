from rest_framework import serializers
from api.models.application_models import ApplicationToTeam
from users.models import Users

class InvitationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationToTeam
        fields = ('id', 'applicant')
    
    def create(self, validated_data):
        team_user = self.context['request'].user
        invited_user = Users.objects.get(email=validated_data['email'])
        
        if invited_user.team_of_affiliation:
            raise serializers.ValidationError("Already belong to team")
        
        application = ApplicationToTeam(
            applicant = invited_user,
            application_team = team_user.team_of_affiliation
        )
        application.save()
        return application
