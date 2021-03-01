from django.db import models
from users.models import models

class ApplicationToTeam(models.Model):
    applicant = ForeignKey(Users, on_delete=models.CASCADE)
    application_team = ForeignKey(Team, on_delete=models.CASCADE)
