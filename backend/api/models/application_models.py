from django.db import models
from users.models import models

class ApplicationToTeam(models.Model):
    applicant = models.ForeignKey(Users, on_delete=models.CASCADE)
    application_team = models.ForeignKey(Team, on_delete=models.CASCADE)
