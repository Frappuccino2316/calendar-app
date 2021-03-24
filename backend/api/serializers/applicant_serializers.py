from rest_framework import serializers
from api.models.serializers import UserSerializer
from api.models.Application_models import ApplicationToTeam

class ApplicantsSerializer(serializers.ModelSerializer):
    applicant = UserSerializer(many=False, read_only=True)
    
    class Meta:
        model = ApplicationToTeam
        fields = ('id', 'applicant', 'application_team')