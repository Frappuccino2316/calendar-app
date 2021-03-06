from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from api.models.team_models import Team

class Users(AbstractUser):
    email = models.EmailField(_('email address'), null=False)
    team_of_affiliation = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)
    