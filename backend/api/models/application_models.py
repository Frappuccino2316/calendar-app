from django.db import models
from .team_models import Team
from users.models import Users

class ApplicationToTeam(models.Model):
    applicant = models.ForeignKey(Users, on_delete=models.CASCADE)
    application_team = models.ForeignKey(Team, on_delete=models.CASCADE)
